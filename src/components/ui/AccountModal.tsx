import React, { useState } from 'react';
import { 
  X, 
  Sparkles, 
  LogOut, 
  Cloud, 
  CheckCircle2, 
  Lock, 
  Unlock, 
  RotateCw, 
  ShieldCheck, 
  Mail, 
  User, 
  Award
} from 'lucide-react';
import { UserAccount, UserStats } from '../../types';
import { CloudStorage } from '../../core/firebase';
import { sound } from '../../core/sound';

interface AccountModalProps {
  isOpen: boolean;
  onClose: () => void;
  currentUser: UserAccount | null;
  userStats: UserStats;
  isPro?: boolean;
  onResetPro?: () => void;
  onSignInWithGoogle: () => Promise<void>;
  onSignOut: () => Promise<void>;
  onOpenUpgrade: () => void;
  onSyncNow: () => Promise<void>;
  lastSyncedAt?: string | null;
}

export const AccountModal: React.FC<AccountModalProps> = ({
  isOpen,
  onClose,
  currentUser,
  userStats,
  isPro,
  onResetPro,
  onSignInWithGoogle,
  onSignOut,
  onOpenUpgrade,
  onSyncNow,
  lastSyncedAt,
}) => {
  const [isSigningIn, setIsSigningIn] = useState(false);
  const [isSyncing, setIsSyncing] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  if (!isOpen) return null;

  const handleSignIn = async () => {
    sound.playClick();
    setIsSigningIn(true);
    setErrorMsg('');
    try {
      await onSignInWithGoogle();
      sound.playCorrect();
    } catch (err: any) {
      console.error(err);
      setErrorMsg(err?.message || 'Failed to sign in with Google. Please try again.');
    } finally {
      setIsSigningIn(false);
    }
  };

  const handleSignOut = async () => {
    sound.playClick();
    await onSignOut();
    onClose();
  };

  const handleSync = async () => {
    sound.playClick();
    setIsSyncing(true);
    try {
      await onSyncNow();
      sound.playCorrect();
    } catch (err: any) {
      setErrorMsg('Cloud sync failed.');
    } finally {
      setIsSyncing(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-zinc-950/85 backdrop-blur-md animate-fadeIn">
      <div className="relative w-full max-w-md rounded-3xl bg-zinc-900 border border-zinc-800 shadow-2xl p-6 sm:p-7 text-zinc-100">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-5 right-5 p-2 rounded-xl bg-zinc-800 hover:bg-zinc-700 text-zinc-400 hover:text-white transition active:scale-95 cursor-pointer"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Modal Header */}
        <div className="flex items-center gap-3 mb-6">
          <div className="w-11 h-11 rounded-2xl bg-amber-400/20 border border-amber-400/40 flex items-center justify-center text-amber-400 shadow-lg shadow-amber-400/10">
            <User className="w-5 h-5" />
          </div>
          <div>
            <h2 className="text-xl font-black text-white tracking-tight">
              Account & Cloud Database
            </h2>
            <p className="text-xs text-zinc-400">
              Synced with your Gmail profile
            </p>
          </div>
        </div>

        {errorMsg && (
          <div className="mb-4 p-3 rounded-xl bg-rose-500/10 border border-rose-500/30 text-rose-300 text-xs">
            {errorMsg}
          </div>
        )}

        {/* Not Signed In State */}
        {!currentUser ? (
          <div className="space-y-4">
            <div className="p-4 rounded-2xl bg-zinc-950 border border-zinc-800 text-xs text-zinc-300 leading-relaxed space-y-2">
              <p className="font-bold text-white flex items-center gap-1.5">
                <Cloud className="w-4 h-4 text-sky-400" />
                <span>Save Your Study Database Online</span>
              </p>
              <p className="text-zinc-400">
                Sign in with your Google / Gmail account to save your review history, bookmarked terms, quiz streaks, and Pro license safely across all your devices.
              </p>
            </div>

            <button
              onClick={handleSignIn}
              disabled={isSigningIn}
              className="w-full flex items-center justify-center gap-3 py-3 px-4 rounded-2xl bg-white hover:bg-zinc-100 text-zinc-900 font-bold text-sm shadow-lg transition active:scale-95 cursor-pointer disabled:opacity-60"
            >
              <svg className="w-5 h-5" viewBox="0 0 24 24">
                <path
                  fill="#4285F4"
                  d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                />
                <path
                  fill="#34A853"
                  d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                />
                <path
                  fill="#FBBC05"
                  d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"
                />
                <path
                  fill="#EA4335"
                  d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"
                />
              </svg>
              <span>{isSigningIn ? 'Connecting with Google...' : 'Sign in with Google'}</span>
            </button>

            {isPro && onResetPro && (
              <div className="pt-1">
                <button
                  onClick={() => {
                    onResetPro();
                    onClose();
                  }}
                  className="w-full py-2.5 px-3 rounded-xl bg-zinc-950 hover:bg-zinc-800 border border-zinc-800 text-[11px] font-semibold text-zinc-400 hover:text-amber-400 transition cursor-pointer flex items-center justify-center gap-1.5"
                >
                  <Lock className="w-3.5 h-3.5" />
                  <span>Revert Device to Free Tier (Reset Demo Pro)</span>
                </button>
              </div>
            )}
          </div>
        ) : (
          /* Signed In State */
          <div className="space-y-4">
            {/* User Profile Card */}
            <div className="p-4 rounded-2xl bg-zinc-950 border border-zinc-800 flex items-center gap-3.5">
              {currentUser.photoURL ? (
                <img
                  src={currentUser.photoURL}
                  alt={currentUser.displayName}
                  className="w-12 h-12 rounded-full border-2 border-amber-400/40 object-cover"
                />
              ) : (
                <div className="w-12 h-12 rounded-full bg-amber-400 text-zinc-950 font-black text-lg flex items-center justify-center">
                  {currentUser.displayName ? currentUser.displayName[0].toUpperCase() : 'U'}
                </div>
              )}

              <div className="flex-1 min-w-0">
                <div className="font-bold text-white text-sm truncate">
                  {currentUser.displayName}
                </div>
                <div className="text-xs text-zinc-400 truncate flex items-center gap-1 font-mono">
                  <Mail className="w-3 h-3 text-zinc-500" />
                  <span>{currentUser.email}</span>
                </div>
              </div>

              {/* Plan Badge */}
              {currentUser.isPro ? (
                <span className="px-2.5 py-1 rounded-full bg-amber-400/15 border border-amber-400 text-amber-400 text-[10px] font-mono font-bold uppercase tracking-wider flex items-center gap-1 shrink-0">
                  <Unlock className="w-2.5 h-2.5" /> Pro Lifetime
                </span>
              ) : (
                <span className="px-2.5 py-1 rounded-full bg-zinc-800 border border-zinc-700 text-zinc-300 text-[10px] font-mono font-bold uppercase tracking-wider flex items-center gap-1 shrink-0">
                  <Lock className="w-2.5 h-2.5" /> Free Tier
                </span>
              )}
            </div>

            {/* Cloud Database Sync Status */}
            <div className="p-3.5 rounded-2xl bg-zinc-950/80 border border-zinc-800 text-xs">
              <div className="flex items-center justify-between mb-2">
                <span className="text-zinc-400 flex items-center gap-1.5 font-semibold">
                  <Cloud className="w-3.5 h-3.5 text-sky-400" />
                  <span>Cloud Database Sync</span>
                </span>
                <span className="text-[10px] text-emerald-400 font-mono flex items-center gap-1">
                  <CheckCircle2 className="w-3 h-3" /> Online
                </span>
              </div>
              <div className="text-[11px] text-zinc-400 mb-3">
                Saved to your Gmail account: {userStats.totalAnswered} questions solved &bull; {userStats.masteredTerms.length} terms mastered &bull; {userStats.bookmarkedTerms.length} saved
              </div>
              <div className="flex items-center justify-between pt-1 border-t border-zinc-900">
                <span className="text-[10px] text-zinc-500 font-mono">
                  {lastSyncedAt ? `Last synced: ${new Date(lastSyncedAt).toLocaleTimeString()}` : 'Auto-sync active'}
                </span>
                <button
                  onClick={handleSync}
                  disabled={isSyncing}
                  className="flex items-center gap-1 text-[11px] font-bold text-amber-400 hover:text-amber-300 transition cursor-pointer"
                >
                  <RotateCw className={`w-3 h-3 ${isSyncing ? 'animate-spin' : ''}`} />
                  <span>{isSyncing ? 'Syncing...' : 'Sync Now'}</span>
                </button>
              </div>
            </div>

            {/* Upgrade Banner if Free */}
            {!currentUser.isPro && (
              <div className="p-4 rounded-2xl bg-gradient-to-br from-amber-400/10 via-zinc-900 to-zinc-950 border border-amber-400/30">
                <div className="flex items-center justify-between mb-1.5">
                  <span className="text-xs font-bold text-white flex items-center gap-1.5">
                    <Sparkles className="w-3.5 h-3.5 text-amber-400" />
                    <span>Unlock Intermediate & Advanced</span>
                  </span>
                  <span className="text-xs font-mono font-extrabold text-amber-400">₱99</span>
                </div>
                <p className="text-[11px] text-zinc-400 mb-3">
                  You are on the Free version (Easy topics only). Upgrade to unlock all topics & subtopics permanently!
                </p>
                <button
                  onClick={() => {
                    onClose();
                    onOpenUpgrade();
                  }}
                  className="w-full py-2.5 px-4 rounded-xl bg-amber-400 hover:bg-amber-300 text-zinc-950 font-black text-xs shadow-md transition active:scale-95 cursor-pointer"
                >
                  Upgrade to Pro (₱99 Lifetime)
                </button>
              </div>
            )}

            {/* Sign Out */}
            <button
              onClick={handleSignOut}
              className="w-full flex items-center justify-center gap-2 py-2.5 px-4 rounded-xl bg-zinc-950 hover:bg-zinc-800 text-zinc-400 hover:text-rose-400 border border-zinc-800 text-xs font-bold transition active:scale-95 cursor-pointer"
            >
              <LogOut className="w-3.5 h-3.5" />
              <span>Sign Out from Google</span>
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
