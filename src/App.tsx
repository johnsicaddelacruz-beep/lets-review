/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect, useMemo, useCallback } from 'react';
import { Item, StudyModeId, Category, Difficulty, SessionStats, UserAccount } from './types';
import { DataLoader, checkProAccess } from './core/dataLoader';
import { Storage } from './core/storage';
import { sound } from './core/sound';
import { auth, CloudStorage, testFirebaseConnection } from './core/firebase';
import { onAuthStateChanged } from 'firebase/auth';
import { ToastContainer, toast } from './components/ui/Toast';
import { HUD } from './components/ui/HUD';
import { FinishModal } from './components/ui/FinishModal';
import { AccountModal } from './components/ui/AccountModal';
import { UpgradeModal } from './components/ui/UpgradeModal';
import { LockBadge } from './components/ui/LockBadge';
import confetti from 'canvas-confetti';

import { HomeView } from './components/views/HomeView';
import { SetupView } from './components/views/SetupView';
import { BookmarksView } from './components/views/BookmarksView';
import { AboutView } from './components/views/AboutView';

import { PracticeTestMode } from './components/modes/PracticeTestMode';
import { FactOrBluffMode } from './components/modes/FactOrBluffMode';
import { RapidFireMode } from './components/modes/RapidFireMode';
import { MixMatchMode } from './components/modes/MixMatchMode';
import { CompleteWordMode } from './components/modes/CompleteWordMode';
import { FlashcardsMode } from './components/modes/FlashcardsMode';
import { CheatSheetMode } from './components/modes/CheatSheetMode';
import { MnemonicsMode } from './components/modes/MnemonicsMode';
import { shuffle } from './core/utils';
import { 
  GraduationCap, 
  Flag, 
  Sparkles, 
  Sun, 
  Moon, 
  Home, 
  SlidersHorizontal, 
  BookmarkCheck, 
  Info, 
  Menu, 
  X,
  Cloud,
  CheckCircle2,
  Award
} from 'lucide-react';

type ViewState = 'home' | 'setup' | 'mode' | 'bookmarks' | 'about';

export default function App() {
  const allItems = useMemo(() => DataLoader.getAllItems(), []);

  const [currentView, setCurrentView] = useState<ViewState>('home');
  const [activeMode, setActiveMode] = useState<StudyModeId>('practiceTest');
  const [activeItems, setActiveItems] = useState<Item[]>([]);
  const [setupPresetCategory, setSetupPresetCategory] = useState<Category | undefined>();
  const [setupPresetMode, setSetupPresetMode] = useState<StudyModeId | undefined>();

  // Mobile menu state
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // Modals state
  const [isAccountModalOpen, setIsAccountModalOpen] = useState(false);
  const [isUpgradeModalOpen, setIsUpgradeModalOpen] = useState(false);

  // User & Subscription state
  const [currentUser, setCurrentUser] = useState<UserAccount | null>(null);
  const [isPro, setIsPro] = useState(() => Storage.getProStatus().isPro);
  const [lastSyncedAt, setLastSyncedAt] = useState<string | null>(null);

  // Session State
  const [hudIndex, setHudIndex] = useState(0);
  const [hudScore, setHudScore] = useState(0);
  const [hudStreak, setHudStreak] = useState(0);
  const [hudTimeRemaining, setHudTimeRemaining] = useState<number | undefined>();
  const [hudTimeElapsed, setHudTimeElapsed] = useState<number>(0);
  const [soundEnabled, setSoundEnabled] = useState(sound.enabled);
  const [finishStats, setFinishStats] = useState<SessionStats | null>(null);

  // Theme & Stats
  const [isDarkMode, setIsDarkMode] = useState(true);
  const [userStats, setUserStats] = useState(() => Storage.getStats());

  /**
   * Parses URL query parameters (like invoice_id, ref, and status) to detect successful Xendit payments.
   * If verified, immediately sets localStorage pro status to true, updates currentUser state, and triggers a success notification.
   */
  const handlePaymentReturn = useCallback(async () => {
    try {
      const urlParams = new URLSearchParams(window.location.search);
      const rawStatus = urlParams.get('status') || urlParams.get('xendit_status') || urlParams.get('payment_status');
      const rawInvoiceId = urlParams.get('invoice_id') || urlParams.get('id') || urlParams.get('external_id') || urlParams.get('ref') || urlParams.get('reference');
      const isExplicitPro = urlParams.get('pro') === 'true' || urlParams.get('paid') === 'true';

      if (!rawStatus && !rawInvoiceId && !isExplicitPro) return;

      const normalizedStatus = (rawStatus || '').trim().toUpperCase();

      // Check for failed status
      if (['FAILED', 'CANCELLED', 'EXPIRED', 'REJECTED'].includes(normalizedStatus)) {
        toast.error('Payment was cancelled or expired. Please try again.');
        const cleanUrl = window.location.pathname;
        window.history.replaceState({}, document.title, cleanUrl);
        return;
      }

      // Check for success status or invoice return
      const isSuccess = 
        isExplicitPro ||
        ['PAID', 'SETTLED', 'COMPLETED', 'SUCCESS', 'TRUE', '1'].includes(normalizedStatus) ||
        (Boolean(rawInvoiceId) && !normalizedStatus);

      if (isSuccess) {
        // Sanitize reference to prevent XSS / control characters
        const sanitizedRef = (rawInvoiceId || '').replace(/[^a-zA-Z0-9_\-\.]/g, '').slice(0, 64);
        const reference = sanitizedRef || `XENDIT-${Date.now().toString().slice(-6)}`;

        // 1. Immediately set the local storage pro status to true
        Storage.setProStatus(true, reference);
        setIsPro(true);

        // 2. Update currentUser state
        setCurrentUser((prev) => {
          if (!prev) return null;
          return {
            ...prev,
            tier: 'pro',
            isPro: true,
            paymentReference: reference,
            purchasedAt: new Date().toISOString(),
          };
        });

        // Sync with Firestore if user is currently logged in
        if (auth.currentUser) {
          try {
            await CloudStorage.upgradeToPro(auth.currentUser.uid, reference);
          } catch (err) {
            console.error('Failed to sync payment status to cloud:', err);
          }
        }

        // Clean query parameters from URL bar without page reload
        const cleanUrl = window.location.pathname;
        window.history.replaceState({}, document.title, cleanUrl);

        // 3. Trigger a success notification to the user
        sound.playCorrect();
        confetti({
          particleCount: 140,
          spread: 80,
          origin: { y: 0.6 },
          colors: ['#facc15', '#eab308', '#ca8a04', '#ffffff'],
        });
        toast.success(`🎉 Payment Verified via Xendit (${reference})! Lifetime Pro Unlocked.`);
      }
    } catch (e) {
      console.warn('Could not parse payment return parameters:', e);
    }
  }, []);

  // Initialize Firebase connection and auth listener
  useEffect(() => {
    testFirebaseConnection();
    handlePaymentReturn();

    const unsubscribe = onAuthStateChanged(auth, async (fbUser) => {
      if (fbUser) {
        try {
          const profile = await CloudStorage.getOrCreateProfile(fbUser);
          const localPro = Storage.getProStatus().isPro;
          const userIsPro = profile.isPro || localPro;

          setCurrentUser({
            ...profile,
            isPro: userIsPro,
          });

          if (userIsPro) {
            setIsPro(true);
            Storage.setProStatus(true, profile.paymentReference);
            // If local is pro but cloud hasn't recorded it yet, sync to Firestore
            if (!profile.isPro) {
              await CloudStorage.upgradeToPro(fbUser.uid, Storage.getProStatus().paymentReference || 'Xendit Pro');
            }
          }

          // Fetch user progress from Firestore and merge with local progress
          const cloudStats = await CloudStorage.getUserProgress(fbUser.uid);
          const localStats = Storage.getStats();

          if (cloudStats) {
            const merged = Storage.mergeStats(localStats, cloudStats);
            Storage.saveStats(merged);
            setUserStats(merged);
            // Sync merged state back to cloud
            await CloudStorage.saveUserProgress(fbUser.uid, merged);
          } else {
            // First time cloud sync for this user
            await CloudStorage.saveUserProgress(fbUser.uid, localStats);
          }

          setLastSyncedAt(new Date().toISOString());
        } catch (err) {
          console.error('Error handling auth state:', err);
        }
      } else {
        setCurrentUser(null);
        // Fall back to local pro status
        setIsPro(Storage.getProStatus().isPro);
      }
    });

    return () => unsubscribe();
  }, []);

  // Theme effect
  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.remove('light-theme');
      document.body.classList.remove('light-theme');
    } else {
      document.documentElement.classList.add('light-theme');
      document.body.classList.add('light-theme');
    }
  }, [isDarkMode]);

  // Session timer ticker
  useEffect(() => {
    if (currentView !== 'mode' || finishStats) return;
    const interval = setInterval(() => {
      setHudTimeElapsed((prev) => prev + 1);
    }, 1000);
    return () => clearInterval(interval);
  }, [currentView, finishStats]);

  const handleToggleTheme = () => {
    sound.playClick();
    setIsDarkMode(!isDarkMode);
  };

  const handleToggleSound = () => {
    const next = sound.toggle();
    setSoundEnabled(next);
  };

  // Google Login & Account handlers
  const handleSignInWithGoogle = async () => {
    try {
      const fbUser = await CloudStorage.signInWithGoogle();
      toast.success(`Welcome, ${fbUser.displayName || 'Reviewee'}! Database linked to your Gmail.`);
    } catch (err: any) {
      console.error(err);
      toast.error('Google Sign-in was cancelled or encountered an error.');
      throw err;
    }
  };

  const handleSignOut = async () => {
    try {
      await CloudStorage.signOut();
      setCurrentUser(null);
      Storage.clearProStatus();
      setIsPro(false);
      toast.info('Signed out from Google. Switched to Free tier.');
    } catch (err) {
      console.error(err);
    }
  };

  const handleResetPro = () => {
    sound.playClick();
    Storage.clearProStatus();
    setIsPro(false);
    if (currentUser) {
      setCurrentUser((prev) => (prev ? { ...prev, isPro: false, tier: 'free' } : null));
    }
    toast.info('Device reset to Free tier. Majorship English is now locked.');
  };

  const handleSyncNow = async () => {
    if (!currentUser) {
      setIsAccountModalOpen(true);
      return;
    }

    try {
      const currentStats = Storage.getStats();
      await CloudStorage.saveUserProgress(currentUser.uid, currentStats);
      setLastSyncedAt(new Date().toISOString());
      toast.success('Study progress synced to your Gmail database.');
    } catch (err) {
      console.error(err);
      toast.error('Failed to sync to cloud database.');
      throw err;
    }
  };

  const handleUpgradeSuccess = async (reference: string) => {
    setIsPro(true);
    Storage.setProStatus(true, reference);

    if (currentUser) {
      try {
        await CloudStorage.upgradeToPro(currentUser.uid, reference);
        setCurrentUser((prev) => prev ? { ...prev, isPro: true, tier: 'pro', paymentReference: reference } : null);
      } catch (err) {
        console.error('Failed to sync pro status to Firestore:', err);
      }
    }

    toast.success('LET Reviewer Pro activated! Majorship English topics are now unlocked.');
  };

  const handleOpenSetup = (presetCat?: Category, presetMode?: StudyModeId) => {
    sound.playClick();
    if (presetCat && !checkProAccess(presetCat, undefined, undefined, isPro)) {
      setIsUpgradeModalOpen(true);
      return;
    }
    setSetupPresetCategory(presetCat);
    setSetupPresetMode(presetMode);
    setCurrentView('setup');
    setIsMobileMenuOpen(false);
  };

  const handleStartSession = (config: {
    mode: StudyModeId;
    category: Category | 'all';
    topic: string | 'all';
    subtopic: string | 'all';
    difficulty: Difficulty | 'all';
    itemCount: number;
  }) => {
    // Validate selection using checkProAccess
    const catToCheck = config.category !== 'all' ? config.category : undefined;
    const topToCheck = config.topic !== 'all' ? config.topic : undefined;
    const subToCheck = config.subtopic !== 'all' ? config.subtopic : undefined;

    const hasAccess = checkProAccess(catToCheck, topToCheck, subToCheck, isPro);

    if (!hasAccess) {
      setIsUpgradeModalOpen(true);
      return;
    }

    setActiveMode(config.mode);

    let filtered = DataLoader.filterItems({
      category: config.category,
      topic: config.topic,
      subtopic: config.subtopic,
      difficulty: config.difficulty,
    });

    if (!isPro && config.category === 'all') {
      filtered = filtered.filter((i) => checkProAccess(i.category, i.topic, i.subtopic, isPro));
    }

    if (filtered.length === 0) {
      filtered = !isPro ? allItems.filter((i) => checkProAccess(i.category, i.topic, i.subtopic, isPro)) : allItems;
    }

    const shuffled = shuffle(filtered).slice(0, config.itemCount);
    setActiveItems(shuffled);
    setCurrentView('mode');
    resetHUD();
  };

  const handleStartWithCustomItems = (itemsToUse: Item[], mode: StudyModeId) => {
    // If all items are locked pro items, prompt upgrade immediately
    if (!isPro && itemsToUse.length > 0 && itemsToUse.every((item) => !checkProAccess(item.category, item.topic, item.subtopic, isPro))) {
      setIsUpgradeModalOpen(true);
      return;
    }

    const accessibleItems = !isPro
      ? itemsToUse.filter((item) => checkProAccess(item.category, item.topic, item.subtopic, isPro))
      : itemsToUse;

    if (accessibleItems.length === 0) {
      setIsUpgradeModalOpen(true);
      return;
    }

    setActiveMode(mode);
    setActiveItems(accessibleItems);
    setCurrentView('mode');
    resetHUD();
  };

  const handleStartRandomSprint = () => {
    sound.playClick();
    const available = allItems.filter((item) => checkProAccess(item.category, item.topic, item.subtopic, isPro));
    if (available.length === 0) {
      setIsUpgradeModalOpen(true);
      return;
    }
    const sprintItems = shuffle(available).slice(0, 20);
    setActiveMode('practiceTest');
    setActiveItems(sprintItems);
    setCurrentView('mode');
    resetHUD();
    toast.success('⚡ Quick Sprint Started: 20 Randomized Questions!');
  };

  const resetHUD = () => {
    setHudIndex(0);
    setHudScore(0);
    setHudStreak(0);
    setHudTimeElapsed(0);
    setHudTimeRemaining(undefined);
    setFinishStats(null);
  };

  const handleHUDUpdate = useCallback((data: {
    currentIndex: number;
    score: number;
    streak: number;
    timeRemaining?: number;
  }) => {
    setHudIndex((prev) => (prev !== data.currentIndex ? data.currentIndex : prev));
    setHudScore((prev) => (prev !== data.score ? data.score : prev));
    setHudStreak((prev) => (prev !== data.streak ? data.streak : prev));
    if (data.timeRemaining !== undefined) {
      setHudTimeRemaining((prev) => (prev !== data.timeRemaining ? data.timeRemaining : prev));
    }
  }, []);

  const handleSessionFinish = useCallback((stats: SessionStats) => {
    setFinishStats(stats);
    Storage.recordSession(stats.modeId, stats.totalQuestions, stats.correctCount, stats.maxStreak);
    const updatedStats = Storage.getStats();
    setUserStats(updatedStats);

    // Auto sync to cloud database on session completion if signed in
    if (currentUser) {
      CloudStorage.saveUserProgress(currentUser.uid, updatedStats)
        .then(() => setLastSyncedAt(new Date().toISOString()))
        .catch((err) => console.warn('Background sync failed:', err));
    }
  }, [currentUser]);

  const handleRestartSession = () => {
    sound.playClick();
    setFinishStats(null);
    resetHUD();
    setActiveItems((prev) => shuffle(prev));
  };

  const handleReviewMissedOnly = () => {
    if (!finishStats) return;
    sound.playClick();
    const missed = finishStats.records.filter((r) => !r.isCorrect).map((r) => r.item);
    if (missed.length > 0) {
      setActiveItems(missed);
      resetHUD();
    }
  };

  const handleExitSession = () => {
    sound.playClick();
    setCurrentView('home');
    resetHUD();
  };

  // Active question for bookmarking in HUD
  const currentItemInHUD = activeItems[hudIndex];
  const isCurrentBookmarked = currentItemInHUD ? Storage.isBookmarked(currentItemInHUD.term) : false;

  const handleToggleHUDCurrentBookmark = () => {
    if (!currentItemInHUD) return;
    sound.playClick();
    const isNow = Storage.toggleBookmark(currentItemInHUD.term);
    const updatedStats = Storage.getStats();
    setUserStats(updatedStats);

    if (currentUser) {
      CloudStorage.saveUserProgress(currentUser.uid, updatedStats)
        .then(() => setLastSyncedAt(new Date().toISOString()))
        .catch((err) => console.warn('Background sync bookmark failed:', err));
    }

    toast.info(isNow ? `Bookmarked "${currentItemInHUD.term}"` : `Removed "${currentItemInHUD.term}" from bookmarks`);
  };

  const getModeTitle = (id: StudyModeId): string => {
    switch (id) {
      case 'practiceTest': return 'Practice Test';
      case 'factOrBluff': return 'Fact or Bluff';
      case 'rapidFire': return 'Rapid-Fire Sprint';
      case 'mixMatch': return 'Mix & Match';
      case 'completeWord': return 'Complete Word';
      case 'flashcards': return 'Flashcards';
      case 'cheatSheet': return 'Cheat Sheet';
      case 'mnemonics': return 'Mnemonics';
    }
  };

  return (
    <div className="min-h-screen flex flex-col justify-between selection:bg-amber-400 selection:text-zinc-950 bg-zinc-950 text-zinc-100">
      {/* Toast notifications */}
      <ToastContainer />

      {/* Account Modal */}
      <AccountModal
        isOpen={isAccountModalOpen}
        onClose={() => setIsAccountModalOpen(false)}
        currentUser={currentUser}
        userStats={userStats}
        isPro={isPro}
        onResetPro={handleResetPro}
        onSignInWithGoogle={handleSignInWithGoogle}
        onSignOut={handleSignOut}
        onOpenUpgrade={() => setIsUpgradeModalOpen(true)}
        onSyncNow={handleSyncNow}
        lastSyncedAt={lastSyncedAt}
      />

      {/* Pro Upgrade Modal (₱99 One-Time) */}
      <UpgradeModal
        isOpen={isUpgradeModalOpen}
        onClose={() => setIsUpgradeModalOpen(false)}
        onUpgradeSuccess={handleUpgradeSuccess}
        userEmail={currentUser?.email}
      />

      {/* ========================================================
          PERSISTENT APP HEADER & NAVIGATION BAR
          ======================================================== */}
      {currentView !== 'mode' && (
        <header className="sticky top-0 z-40 w-full backdrop-blur-xl bg-zinc-950/85 border-b border-zinc-800/80 transition-colors">
          <div className="max-w-5xl mx-auto px-4 sm:px-6 h-16 sm:h-20 flex items-center justify-between gap-4">
            {/* Brand Logo & Name */}
            <button
              onClick={() => {
                sound.playClick();
                setCurrentView('home');
              }}
              className="flex items-center gap-3 text-left cursor-pointer group focus:outline-none"
            >
              <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-xl bg-amber-400/20 border border-amber-400/50 flex items-center justify-center text-amber-400 shadow-md shadow-amber-400/10 group-hover:scale-105 transition-transform shrink-0">
                <GraduationCap className="w-5 h-5 stroke-[2.3]" />
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <span className="text-base sm:text-lg font-black text-white tracking-tight group-hover:text-amber-400 transition">
                    LET Reviewer
                  </span>
                  <span className="px-1.5 py-0.5 rounded-full bg-amber-400/15 border border-amber-400/30 text-amber-400 text-[10px] font-mono font-bold">
                    TOS
                  </span>
                </div>
              </div>
            </button>

            {/* Desktop Navigation Links */}
            <nav className="hidden md:flex items-center gap-1 bg-zinc-900/80 p-1.5 rounded-2xl border border-zinc-800/80">
              <button
                onClick={() => {
                  sound.playClick();
                  setCurrentView('home');
                }}
                className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl text-xs font-semibold transition cursor-pointer ${
                  currentView === 'home'
                    ? 'bg-amber-400 text-zinc-950 shadow-sm'
                    : 'text-zinc-300 hover:text-white hover:bg-zinc-800'
                }`}
              >
                <Home className="w-3.5 h-3.5" />
                <span>Home</span>
              </button>

              <button
                onClick={() => handleOpenSetup()}
                className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl text-xs font-semibold transition cursor-pointer ${
                  currentView === 'setup'
                    ? 'bg-amber-400 text-zinc-950 shadow-sm'
                    : 'text-zinc-300 hover:text-white hover:bg-zinc-800'
                }`}
              >
                <SlidersHorizontal className="w-3.5 h-3.5" />
                <span>Custom Session</span>
              </button>

              <button
                onClick={() => {
                  sound.playClick();
                  setCurrentView('bookmarks');
                }}
                className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl text-xs font-semibold transition cursor-pointer ${
                  currentView === 'bookmarks'
                    ? 'bg-amber-400 text-zinc-950 shadow-sm'
                    : 'text-zinc-300 hover:text-white hover:bg-zinc-800'
                }`}
              >
                <BookmarkCheck className="w-3.5 h-3.5" />
                <span>Saved ({userStats.bookmarkedTerms.length})</span>
              </button>

              <button
                onClick={() => {
                  sound.playClick();
                  setCurrentView('about');
                }}
                className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl text-xs font-semibold transition cursor-pointer ${
                  currentView === 'about'
                    ? 'bg-amber-400 text-zinc-950 shadow-sm'
                    : 'text-zinc-300 hover:text-white hover:bg-zinc-800'
                }`}
              >
                <Info className="w-3.5 h-3.5" />
                <span>Guide</span>
              </button>
            </nav>

            {/* Right Action Icons & Profile */}
            <div className="flex items-center gap-2">
              {!isPro && (
                <button
                  onClick={() => setIsUpgradeModalOpen(true)}
                  className="hidden sm:flex items-center gap-1.5 px-3 py-2 rounded-xl bg-gradient-to-r from-amber-400 to-amber-300 hover:from-amber-300 hover:to-amber-200 text-zinc-950 font-black text-xs shadow-md shadow-amber-400/20 transition active:scale-95 cursor-pointer"
                >
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>Pro (₱99)</span>
                </button>
              )}

              {/* Gmail Account Button */}
              <button
                onClick={() => setIsAccountModalOpen(true)}
                className="flex items-center gap-2 px-3 py-2 rounded-xl bg-zinc-900 hover:bg-zinc-800 border border-zinc-800 text-xs font-semibold text-zinc-200 transition active:scale-95 cursor-pointer shadow-sm"
                title="Google Account & Cloud Database Sync"
              >
                {currentUser?.photoURL ? (
                  <img
                    src={currentUser.photoURL}
                    alt={currentUser.displayName}
                    className="w-5 h-5 rounded-full object-cover border border-amber-400/40"
                  />
                ) : currentUser ? (
                  <div className="w-5 h-5 rounded-full bg-amber-400 text-zinc-950 font-bold text-[10px] flex items-center justify-center">
                    {currentUser.displayName ? currentUser.displayName[0].toUpperCase() : 'U'}
                  </div>
                ) : (
                  <Cloud className="w-4 h-4 text-amber-400" />
                )}

                <span className="hidden sm:inline font-medium text-xs">
                  {currentUser ? currentUser.displayName.split(' ')[0] : 'Gmail Sync'}
                </span>

                {isPro ? (
                  <span className="px-1.5 py-0.5 rounded bg-amber-400/20 text-amber-400 text-[9px] font-mono font-bold">
                    PRO
                  </span>
                ) : (
                  <span className="px-1.5 py-0.5 rounded bg-zinc-800 text-zinc-400 text-[9px] font-mono">
                    FREE
                  </span>
                )}
              </button>

              {/* Theme Toggle */}
              <button
                onClick={handleToggleTheme}
                className="p-2.5 rounded-xl bg-zinc-900 hover:bg-zinc-800 border border-zinc-800 text-zinc-300 hover:text-white transition active:scale-95 cursor-pointer"
                title={isDarkMode ? 'Switch to Light Theme' : 'Switch to Dark Theme'}
              >
                {isDarkMode ? <Sun className="w-4 h-4 text-amber-400" /> : <Moon className="w-4 h-4 text-indigo-400" />}
              </button>

              {/* Mobile Hamburger Toggle */}
              <button
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="p-2.5 rounded-xl bg-zinc-900 hover:bg-zinc-800 border border-zinc-800 text-zinc-300 hover:text-white transition md:hidden cursor-pointer"
              >
                {isMobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
              </button>
            </div>
          </div>

          {/* Mobile Navigation Drawer */}
          {isMobileMenuOpen && (
            <div className="md:hidden border-t border-zinc-800/80 bg-zinc-950/95 backdrop-blur-xl px-4 py-3 space-y-2 animate-fadeIn">
              <button
                onClick={() => {
                  sound.playClick();
                  setCurrentView('home');
                  setIsMobileMenuOpen(false);
                }}
                className={`w-full flex items-center gap-2.5 px-4 py-2.5 rounded-xl text-xs font-semibold transition ${
                  currentView === 'home' ? 'bg-amber-400 text-zinc-950 font-bold' : 'text-zinc-300 hover:bg-zinc-900'
                }`}
              >
                <Home className="w-4 h-4" />
                <span>Home Dashboard</span>
              </button>

              <button
                onClick={() => handleOpenSetup()}
                className={`w-full flex items-center gap-2.5 px-4 py-2.5 rounded-xl text-xs font-semibold transition ${
                  currentView === 'setup' ? 'bg-amber-400 text-zinc-950 font-bold' : 'text-zinc-300 hover:bg-zinc-900'
                }`}
              >
                <SlidersHorizontal className="w-4 h-4" />
                <span>Launch Custom Session</span>
              </button>

              <button
                onClick={() => {
                  sound.playClick();
                  setCurrentView('bookmarks');
                  setIsMobileMenuOpen(false);
                }}
                className={`w-full flex items-center gap-2.5 px-4 py-2.5 rounded-xl text-xs font-semibold transition ${
                  currentView === 'bookmarks' ? 'bg-amber-400 text-zinc-950 font-bold' : 'text-zinc-300 hover:bg-zinc-900'
                }`}
              >
                <BookmarkCheck className="w-4 h-4" />
                <span>Saved Bookmarks ({userStats.bookmarkedTerms.length})</span>
              </button>

              <button
                onClick={() => {
                  sound.playClick();
                  setCurrentView('about');
                  setIsMobileMenuOpen(false);
                }}
                className={`w-full flex items-center gap-2.5 px-4 py-2.5 rounded-xl text-xs font-semibold transition ${
                  currentView === 'about' ? 'bg-amber-400 text-zinc-950 font-bold' : 'text-zinc-300 hover:bg-zinc-900'
                }`}
              >
                <Info className="w-4 h-4" />
                <span>Exam Guide & Specifications</span>
              </button>

              {!isPro && (
                <button
                  onClick={() => {
                    setIsUpgradeModalOpen(true);
                    setIsMobileMenuOpen(false);
                  }}
                  className="w-full flex items-center justify-center gap-2 py-2.5 px-4 rounded-xl bg-amber-400 text-zinc-950 font-black text-xs shadow-md mt-2"
                >
                  <Sparkles className="w-4 h-4" />
                  <span>Upgrade to LET Pro (₱99)</span>
                </button>
              )}
            </div>
          )}
        </header>
      )}

      {/* Main App Content View */}
      <main className="flex-1 w-full">
        {currentView === 'home' && (
          <HomeView
            allItems={allItems}
            onOpenSetup={handleOpenSetup}
            onStartRandomSprint={handleStartRandomSprint}
            onStartWithItems={handleStartWithCustomItems}
            onOpenBookmarks={() => setCurrentView('bookmarks')}
            onOpenAbout={() => setCurrentView('about')}
            totalItemsCount={allItems.length}
            masteredCount={userStats.masteredTerms.length}
            streakRecord={userStats.streakRecord}
            bookmarkedCount={userStats.bookmarkedTerms.length}
            currentUser={currentUser}
            isPro={isPro}
            onOpenAccount={() => setIsAccountModalOpen(true)}
            onOpenUpgrade={() => setIsUpgradeModalOpen(true)}
          />
        )}

        {currentView === 'setup' && (
          <SetupView
            initialCategory={setupPresetCategory}
            initialMode={setupPresetMode}
            onBack={() => setCurrentView('home')}
            onStartSession={handleStartSession}
            isPro={isPro}
            onOpenUpgrade={() => setIsUpgradeModalOpen(true)}
          />
        )}

        {currentView === 'bookmarks' && (
          <BookmarksView
            items={allItems}
            onBack={() => setCurrentView('home')}
            onStartWithItems={handleStartWithCustomItems}
            isPro={isPro}
            onOpenUpgrade={() => setIsUpgradeModalOpen(true)}
          />
        )}

        {currentView === 'about' && (
          <AboutView onBack={() => setCurrentView('home')} />
        )}

        {currentView === 'mode' && (
          <div className="w-full">
            <HUD
              modeId={activeMode}
              modeTitle={getModeTitle(activeMode)}
              categoryName={activeItems[0]?.category}
              currentIndex={hudIndex}
              totalItems={activeItems.length}
              score={hudScore}
              streak={hudStreak}
              timeRemaining={hudTimeRemaining}
              timeElapsed={hudTimeElapsed}
              soundEnabled={soundEnabled}
              onToggleSound={handleToggleSound}
              onExit={handleExitSession}
              isBookmarked={isCurrentBookmarked}
              onToggleBookmark={currentItemInHUD ? handleToggleHUDCurrentBookmark : undefined}
            />

            <div className="pb-12">
              {activeMode === 'practiceTest' && (
                <PracticeTestMode
                  items={activeItems}
                  allItems={allItems}
                  onFinish={handleSessionFinish}
                  onUpdateHUD={handleHUDUpdate}
                />
              )}

              {activeMode === 'factOrBluff' && (
                <FactOrBluffMode
                  items={activeItems}
                  allItems={allItems}
                  onFinish={handleSessionFinish}
                  onUpdateHUD={handleHUDUpdate}
                />
              )}

              {activeMode === 'rapidFire' && (
                <RapidFireMode
                  items={activeItems}
                  allItems={allItems}
                  onFinish={handleSessionFinish}
                  onUpdateHUD={handleHUDUpdate}
                />
              )}

              {activeMode === 'mixMatch' && (
                <MixMatchMode
                  items={activeItems}
                  onFinish={handleSessionFinish}
                  onUpdateHUD={handleHUDUpdate}
                />
              )}

              {activeMode === 'completeWord' && (
                <CompleteWordMode
                  items={activeItems}
                  onFinish={handleSessionFinish}
                  onUpdateHUD={handleHUDUpdate}
                />
              )}

              {activeMode === 'flashcards' && (
                <FlashcardsMode
                  items={activeItems}
                  onFinish={handleSessionFinish}
                  onUpdateHUD={handleHUDUpdate}
                />
              )}

              {activeMode === 'cheatSheet' && (
                <CheatSheetMode
                  items={activeItems}
                  isPro={isPro}
                  onOpenUpgrade={() => setIsUpgradeModalOpen(true)}
                />
              )}

              {activeMode === 'mnemonics' && (
                <MnemonicsMode items={activeItems} />
              )}
            </div>
          </div>
        )}
      </main>

      {/* Session Finish Modal */}
      {finishStats && (
        <FinishModal
          stats={finishStats}
          onRestart={handleRestartSession}
          onReviewMissed={handleReviewMissedOnly}
          onHome={handleExitSession}
          onChangeMode={() => handleOpenSetup()}
        />
      )}

      {/* ========================================================
          ENHANCED BEAUTIFUL FOOTER
          ======================================================== */}
      {currentView !== 'mode' && (
        <footer className="w-full border-t border-zinc-800/80 bg-zinc-950/90 text-zinc-400 font-sans mt-12 transition-colors">
          <div className="max-w-5xl mx-auto px-4 sm:px-6 py-8 sm:py-10">
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 sm:gap-8 mb-8">
              {/* Brand Tribute */}
              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <div className="w-7 h-7 rounded-lg bg-amber-400/20 text-amber-400 flex items-center justify-center font-bold text-xs">
                    <GraduationCap className="w-4 h-4" />
                  </div>
                  <span className="text-white font-black text-sm tracking-tight">LET Reviewer</span>
                </div>
                <p className="text-xs text-zinc-400 leading-relaxed">
                  Dedicated to all aspiring Licensed Professional Teachers (LPTs). Built with passion by Sir JC Dela Cruz.
                </p>
                <div className="inline-flex items-center gap-1.5 text-[11px] text-amber-400 font-medium">
                  <Flag className="w-3.5 h-3.5" />
                  <span>Para sa Kinabukasan ng Kabataang Pilipino</span>
                </div>
              </div>

              {/* Subject Structure */}
              <div className="space-y-2">
                <span className="text-xs font-mono font-bold uppercase tracking-wider text-zinc-300 block">
                  LET Subject Coverage
                </span>
                <ul className="text-xs text-zinc-400 space-y-1.5">
                  <li
                    onClick={() => handleOpenSetup('General Education')}
                    className="flex items-center gap-1.5 cursor-pointer hover:text-emerald-400 transition"
                  >
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                    <span>General Education (100% Free &bull; 30 Qs)</span>
                  </li>
                  <li
                    onClick={() => handleOpenSetup('Professional Education')}
                    className="flex items-center gap-1.5 cursor-pointer hover:text-emerald-400 transition"
                  >
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                    <span>Professional Education (100% Free &bull; 39 Qs)</span>
                  </li>
                  <li
                    onClick={() => {
                      if (!isPro) {
                        setIsUpgradeModalOpen(true);
                      } else {
                        handleOpenSetup('Majorship English');
                      }
                    }}
                    className="flex items-center gap-1.5 cursor-pointer hover:text-amber-400 transition group"
                  >
                    <Sparkles className="w-3.5 h-3.5 text-amber-400 shrink-0" />
                    <span>Majorship English (₱99 Lifetime &bull; 41 Qs)</span>
                    <LockBadge isPro={isPro} label="PRO" size="sm" />
                  </li>
                </ul>
              </div>

              {/* Quick Navigation & Cloud Status */}
              <div className="space-y-2">
                <span className="text-xs font-mono font-bold uppercase tracking-wider text-zinc-300 block">
                  Quick Access
                </span>
                <div className="flex flex-wrap gap-x-4 gap-y-2 text-xs">
                  <button
                    onClick={() => {
                      sound.playClick();
                      setCurrentView('home');
                    }}
                    className="hover:text-amber-400 transition cursor-pointer"
                  >
                    Home
                  </button>
                  <button
                    onClick={() => handleOpenSetup()}
                    className="hover:text-amber-400 transition cursor-pointer"
                  >
                    Custom Session
                  </button>
                  <button
                    onClick={() => {
                      sound.playClick();
                      setCurrentView('bookmarks');
                    }}
                    className="hover:text-amber-400 transition cursor-pointer"
                  >
                    Saved ({userStats.bookmarkedTerms.length})
                  </button>
                  <button
                    onClick={() => {
                      sound.playClick();
                      setCurrentView('about');
                    }}
                    className="hover:text-amber-400 transition cursor-pointer"
                  >
                    Privacy & Guide
                  </button>
                </div>
                <div className="pt-2">
                  <button
                    onClick={() => setIsAccountModalOpen(true)}
                    className="inline-flex items-center gap-1.5 text-xs text-amber-300 hover:text-amber-200 transition cursor-pointer bg-zinc-900 px-3 py-1.5 rounded-xl border border-zinc-800"
                  >
                    <Cloud className="w-3.5 h-3.5 text-amber-400" />
                    <span>
                      {currentUser ? `Synced: ${currentUser.email?.split('@')[0]}` : 'Sign in with Gmail to Sync'}
                    </span>
                  </button>
                </div>
              </div>
            </div>

            {/* Bottom Copyright & Version */}
            <div className="pt-6 border-t border-zinc-800/80 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-zinc-500 font-mono">
              <div>
                &copy; {new Date().getFullYear()} LET Reviewer &bull; Philippine Licensure Examination
              </div>
              <div className="flex items-center gap-3">
                <span className="text-amber-400/80">TOS 2026 Calibrated</span>
                <span>&bull;</span>
                <span>v1.2.0</span>
              </div>
            </div>
          </div>
        </footer>
      )}
    </div>
  );
}
