import React, { useState } from 'react';
import { 
  ArrowLeft, 
  Award, 
  ShieldCheck, 
  Smartphone, 
  Sparkles, 
  BookOpen, 
  RefreshCw, 
  Flag,
  Cloud,
  CheckCircle2,
  Lock
} from 'lucide-react';
import versionData from '../../../VERSION.json';
import { toast } from '../ui/Toast';
import { sound } from '../../core/sound';

interface AboutViewProps {
  onBack: () => void;
}

export const AboutView: React.FC<AboutViewProps> = ({ onBack }) => {
  const [checkingUpdate, setCheckingUpdate] = useState(false);

  const handleCheckUpdate = () => {
    sound.playClick();
    setCheckingUpdate(true);
    setTimeout(() => {
      setCheckingUpdate(false);
      toast.success(`LET Reviewer is up to date (${versionData.version} - build ${versionData.build})`);
    }, 1200);
  };

  return (
    <div className="w-full max-w-3xl mx-auto py-6 sm:py-8 px-4 sm:px-6 space-y-6 sm:space-y-8 animate-fadeIn">
      {/* Top Bar */}
      <div className="flex items-center justify-between">
        <button
          onClick={onBack}
          className="flex items-center gap-2 px-3.5 py-2 rounded-xl bg-zinc-900 hover:bg-zinc-800 text-zinc-300 border border-zinc-800 text-xs font-semibold transition active:scale-95 cursor-pointer"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Home</span>
        </button>

        <span className="text-xs font-mono text-zinc-500">v{versionData.version}</span>
      </div>

      <div className="space-y-6 sm:space-y-8">
        {/* Author Tribute Banner */}
        <div className="rounded-3xl bg-zinc-900 border border-zinc-800 p-6 sm:p-8 shadow-2xl relative overflow-hidden">
          <div className="flex flex-col sm:flex-row items-start gap-4">
            <div className="w-14 h-14 rounded-2xl bg-amber-400/20 border border-amber-400/40 flex items-center justify-center text-amber-400 shrink-0 shadow-lg shadow-amber-400/10">
              <Award className="w-7 h-7 stroke-[2.3]" />
            </div>
            <div>
              <div className="flex items-center gap-2 mb-1">
                <h2 className="text-xl sm:text-2xl font-black text-white">LET Reviewer</h2>
                <span className="text-[10px] font-mono px-2.5 py-0.5 rounded-full bg-amber-400/15 text-amber-300 border border-amber-400/30 font-bold">
                  BOARD EXAM PREP
                </span>
              </div>
              <p className="text-xs text-amber-400 font-semibold mb-3 flex items-center gap-1.5">
                <span>Built by Sir JC Dela Cruz for Future Filipino Teachers</span>
                <Flag className="w-3.5 h-3.5 text-amber-400 shrink-0" />
              </p>
              <p className="text-xs sm:text-sm text-zinc-300 leading-relaxed">
                "To all aspiring Licensed Professional Teachers (LPTs): This review platform was crafted with deep dedication to make high-quality, board exam-calibrated preparation accessible across the Philippines. Study faithfully, master the Table of Specifications, and wear your licensed teacher pin with pride!"
              </p>
            </div>
          </div>
        </div>

        {/* Board Exam Structure & Passing Criteria */}
        <div className="rounded-3xl bg-zinc-900/90 border border-zinc-800 p-6 sm:p-8">
          <h3 className="text-base font-bold text-white flex items-center gap-2 mb-3">
            <BookOpen className="w-4 h-4 text-amber-400" />
            <span>PRC Licensure Examination for Teachers (LET) Criteria</span>
          </h3>
          <p className="text-xs text-zinc-400 mb-4 leading-relaxed">
            Administered semi-annually by the Professional Regulation Commission (PRC) and the Board for Professional Teachers under Republic Act No. 7836.
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-4">
            <div className="p-4 rounded-2xl bg-zinc-950/70 border border-zinc-800">
              <h4 className="text-xs font-bold text-amber-400 mb-1">Secondary Education Track</h4>
              <ul className="text-xs text-zinc-300 space-y-1">
                <li>&bull; General Education (Free): <strong>20%</strong></li>
                <li>&bull; Professional Education (Free): <strong>40%</strong></li>
                <li>&bull; Majorship Specialization (₱99 Pro): <strong>40%</strong></li>
              </ul>
            </div>

            <div className="p-4 rounded-2xl bg-zinc-950/70 border border-zinc-800">
              <h4 className="text-xs font-bold text-emerald-400 mb-1">Official Passing Criteria</h4>
              <ul className="text-xs text-zinc-300 space-y-1">
                <li>&bull; General Weighted Average: <strong>&ge; 75%</strong></li>
                <li>&bull; Minimum threshold per component: <strong>&ge; 50%</strong></li>
                <li>&bull; 90%+ qualifies for the prestigious Top 10 National Topnotchers list!</li>
              </ul>
            </div>
          </div>
        </div>

        {/* 8 Study Modes Guide */}
        <div className="rounded-3xl bg-zinc-900/90 border border-zinc-800 p-6 sm:p-8">
          <h3 className="text-base font-bold text-white flex items-center gap-2 mb-3">
            <Sparkles className="w-4 h-4 text-amber-400" />
            <span>Guide to the 8 Study Modes</span>
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
            <div className="p-3.5 rounded-xl bg-zinc-950/60 border border-zinc-800/80">
              <strong className="text-amber-400 block mb-0.5">1. Practice Test</strong>
              <p className="text-zinc-400 leading-relaxed">Official PRC Scantron multiple choice (A/B/C/D) with instant rationalization.</p>
            </div>
            <div className="p-3.5 rounded-xl bg-zinc-950/60 border border-zinc-800/80">
              <strong className="text-rose-400 block mb-0.5">2. Fact or Bluff</strong>
              <p className="text-zinc-400 leading-relaxed">Fast binary trap detection to train your mind against deceptive distractors.</p>
            </div>
            <div className="p-3.5 rounded-xl bg-zinc-950/60 border border-zinc-800/80">
              <strong className="text-amber-300 block mb-0.5">3. Rapid-Fire</strong>
              <p className="text-zinc-400 leading-relaxed">Timed speed sprint challenging quick recall under exam time constraints.</p>
            </div>
            <div className="p-3.5 rounded-xl bg-zinc-950/60 border border-zinc-800/80">
              <strong className="text-indigo-400 block mb-0.5">4. Mix & Match</strong>
              <p className="text-zinc-400 leading-relaxed">Pair Column A keywords with Column B concepts in 5-pair learning sets.</p>
            </div>
            <div className="p-3.5 rounded-xl bg-zinc-950/60 border border-zinc-800/80">
              <strong className="text-teal-400 block mb-0.5">5. Complete Word</strong>
              <p className="text-zinc-400 leading-relaxed">Recall terms through masked letter blanks and definition clues.</p>
            </div>
            <div className="p-3.5 rounded-xl bg-zinc-950/60 border border-zinc-800/80">
              <strong className="text-emerald-400 block mb-0.5">6. Flashcards</strong>
              <p className="text-zinc-400 leading-relaxed">3D flip cards with Leitner-style active recall rating.</p>
            </div>
            <div className="p-3.5 rounded-xl bg-zinc-950/60 border border-zinc-800/80">
              <strong className="text-sky-400 block mb-0.5">7. Cheat Sheet</strong>
              <p className="text-zinc-400 leading-relaxed">Dense searchable table with one-click copy and text-to-speech audio.</p>
            </div>
            <div className="p-3.5 rounded-xl bg-zinc-950/60 border border-zinc-800/80">
              <strong className="text-purple-400 block mb-0.5">8. Mnemonics</strong>
              <p className="text-zinc-400 leading-relaxed">Memorable acronym shortcuts and active recall test cards.</p>
            </div>
          </div>
        </div>

        {/* Privacy Policy & Google Account Cloud Sync (Dedicated Section) */}
        <div className="rounded-3xl bg-zinc-900 border border-zinc-800 p-6 sm:p-8 shadow-xl">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 rounded-xl bg-emerald-400/20 text-emerald-400 flex items-center justify-center shrink-0">
              <ShieldCheck className="w-6 h-6 stroke-[2.2]" />
            </div>
            <div>
              <h3 className="text-base font-bold text-white">
                Privacy Policy & Google Account Cloud Sync
              </h3>
              <p className="text-xs text-zinc-400">
                Transparent data practices designed for Filipino board examinees.
              </p>
            </div>
          </div>

          <div className="space-y-3.5 text-xs text-zinc-300 leading-relaxed">
            <div className="p-4 rounded-2xl bg-zinc-950/70 border border-zinc-800">
              <h4 className="font-bold text-amber-300 mb-1 flex items-center gap-1.5">
                <Cloud className="w-4 h-4 text-amber-400" />
                <span>1. Google Account Database Sync</span>
              </h4>
              <p className="text-zinc-400">
                When you sign in with your Google account, your quiz scores, mastery stats, bookmarked items, and session history are securely saved in a private Firebase Firestore database record tied exclusively to your Gmail user ID. You can sign in across your phone, tablet, and laptop to continue reviewing seamlessly.
              </p>
            </div>

            <div className="p-4 rounded-2xl bg-zinc-950/70 border border-zinc-800">
              <h4 className="font-bold text-emerald-400 mb-1 flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                <span>2. Zero Advertisements & Zero Tracking</span>
              </h4>
              <p className="text-zinc-400">
                LET Reviewer contains no advertising SDKs, no behavioral trackers, and never sells your study history to third parties. Your review time is 100% focused on passing the board examination.
              </p>
            </div>

            <div className="p-4 rounded-2xl bg-zinc-950/70 border border-zinc-800">
              <h4 className="font-bold text-sky-400 mb-1 flex items-center gap-1.5">
                <Lock className="w-4 h-4 text-sky-400" />
                <span>3. Local Storage Privacy & User Control</span>
              </h4>
              <p className="text-zinc-400">
                If you choose not to log in with Google, all quiz progress and bookmarks remain strictly on your local device. You retain full control to clear your history, reset progress, or export your bookmarks at any time.
              </p>
            </div>
          </div>
        </div>

        {/* Mobile & Home Screen Guide */}
        <div className="rounded-3xl bg-zinc-900/90 border border-zinc-800 p-6 sm:p-8">
          <h3 className="text-base font-bold text-white flex items-center gap-2 mb-3">
            <Smartphone className="w-4 h-4 text-amber-400" />
            <span>Install to Home Screen (Mobile Web App)</span>
          </h3>
          <p className="text-xs text-zinc-400 mb-4 leading-relaxed">
            Install LET Reviewer as a lightweight web app on your phone for full-screen review anytime.
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs mb-2">
            <div className="p-4 rounded-2xl bg-zinc-950/70 border border-zinc-800">
              <strong className="text-white block mb-1">Android (Chrome)</strong>
              <p className="text-zinc-400 leading-relaxed">
                1. Tap the three dots (&vellip;) in Chrome.<br />
                2. Tap <strong>Install app</strong> or <strong>Add to Home screen</strong>.<br />
                3. The app icon will appear on your device's home screen.
              </p>
            </div>

            <div className="p-4 rounded-2xl bg-zinc-950/70 border border-zinc-800">
              <strong className="text-white block mb-1">iPhone / iPad (Safari)</strong>
              <p className="text-zinc-400 leading-relaxed">
                1. Open in Safari and tap the <strong>Share</strong> button.<br />
                2. Scroll down and tap <strong>Add to Home Screen</strong>.<br />
                3. Tap <strong>Add</strong> at top right.
              </p>
            </div>
          </div>
        </div>

        {/* Version Check Button */}
        <div className="rounded-3xl bg-zinc-900/60 border border-zinc-800 p-5 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="text-xs text-zinc-400">
            <span>Current Release: </span>
            <span className="font-mono text-zinc-200 font-bold">v{versionData.version}</span>
            <span> &bull; TOS 2026 Calibrated</span>
          </div>

          <button
            onClick={handleCheckUpdate}
            disabled={checkingUpdate}
            className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-zinc-800 hover:bg-zinc-700 text-zinc-300 text-xs font-semibold transition active:scale-95 cursor-pointer shrink-0"
          >
            <RefreshCw className={`w-3.5 h-3.5 ${checkingUpdate ? 'animate-spin' : ''}`} />
            <span>Check for Updates</span>
          </button>
        </div>
      </div>
    </div>
  );
};
