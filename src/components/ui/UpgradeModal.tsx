import React, { useState } from 'react';
import confetti from 'canvas-confetti';
import { 
  X, 
  Check, 
  Sparkles, 
  Smartphone, 
  QrCode, 
  ShieldCheck, 
  Cloud,
  Zap,
  CreditCard,
  Lock
} from 'lucide-react';
import { sound } from '../../core/sound';

interface UpgradeModalProps {
  isOpen: boolean;
  onClose: () => void;
  onUpgradeSuccess: (reference: string) => Promise<void> | void;
  userEmail?: string;
}

export const UpgradeModal: React.FC<UpgradeModalProps> = ({
  isOpen,
  onClose,
  onUpgradeSuccess,
  userEmail,
}) => {
  const [selectedMethod, setSelectedMethod] = useState<'xendit' | 'gcash' | 'maya' | 'instant'>('xendit');
  const [referenceNumber, setReferenceNumber] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  if (!isOpen) return null;

  const handleCompleteUpgrade = async (forcedRef?: string) => {
    sound.playClick();
    setIsProcessing(true);
    setErrorMessage('');

    try {
      const ref = forcedRef || referenceNumber.trim() || `LET-PRO-${Date.now().toString().slice(-6)}`;
      await onUpgradeSuccess(ref);
      
      sound.playCorrect();
      confetti({
        particleCount: 120,
        spread: 80,
        origin: { y: 0.6 },
        colors: ['#facc15', '#eab308', '#ca8a04', '#ffffff'],
      });
      onClose();
    } catch (err: any) {
      setErrorMessage(err?.message || 'Activation failed. Please try again.');
    } finally {
      setIsProcessing(false);
    }
  };

  const handleInstantActivation = () => {
    const instantRef = `PRO-DEMO-${Math.floor(100000 + Math.random() * 900000)}`;
    handleCompleteUpgrade(instantRef);
  };

  const handleXenditCheckout = () => {
    const liveLink = (import.meta as any).env?.VITE_XENDIT_PAYMENT_LINK;
    if (liveLink && typeof liveLink === 'string' && liveLink.startsWith('http')) {
      window.location.href = liveLink;
      return;
    }

    // Default simulation for preview / testing
    const xenditRef = `XENDIT-PH-${Math.floor(100000 + Math.random() * 900000)}`;
    handleCompleteUpgrade(xenditRef);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-zinc-950/85 backdrop-blur-md animate-fadeIn">
      <div className="relative w-full max-w-xl max-h-[92vh] overflow-y-auto rounded-3xl bg-zinc-900 border border-amber-400/50 shadow-2xl p-6 sm:p-8 text-zinc-100">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-5 right-5 p-2 rounded-xl bg-zinc-800 hover:bg-zinc-700 text-zinc-400 hover:text-white transition active:scale-95 cursor-pointer"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Modal Header */}
        <div className="flex items-center gap-3.5 mb-5">
          <div className="w-12 h-12 rounded-2xl bg-amber-400/20 border border-amber-400/50 flex items-center justify-center text-amber-400 shadow-lg shadow-amber-400/10 shrink-0">
            <Sparkles className="w-6 h-6 stroke-[2.2]" />
          </div>
          <div>
            <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-amber-400/15 text-amber-300 border border-amber-400/30 text-[10px] font-mono font-bold tracking-wider uppercase mb-1">
              Lifetime Access
            </div>
            <h2 className="text-xl sm:text-2xl font-black text-white tracking-tight">
              Upgrade to LET Reviewer Pro
            </h2>
          </div>
        </div>

        {/* Price Tag */}
        <div className="flex items-baseline gap-2 mb-6 p-4 rounded-2xl bg-zinc-950 border border-zinc-800">
          <span className="text-3xl sm:text-4xl font-black text-amber-400 font-mono">₱99</span>
          <span className="text-xs sm:text-sm text-zinc-300 font-medium">One-Time Fee &bull; No Recurring Charges</span>
        </div>

        {/* Everything Included in Pro */}
        <div className="mb-6 space-y-3">
          <div className="text-xs font-bold uppercase tracking-wider text-amber-400 font-mono">
            Everything Included in Pro:
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 text-xs">
            <div className="flex items-start gap-2.5 p-3 rounded-2xl bg-zinc-950/70 border border-zinc-800">
              <Check className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
              <div>
                <span className="font-bold text-white block">Full Majorship English</span>
                <span className="text-zinc-400 text-[11px] leading-relaxed">
                  Structure of English, Syntax Patterns, Morphology, Literary Criticism & Linguistics
                </span>
              </div>
            </div>

            <div className="flex items-start gap-2.5 p-3 rounded-2xl bg-zinc-950/70 border border-zinc-800">
              <Check className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
              <div>
                <span className="font-bold text-white block">All Majorship Topics & Subtopics</span>
                <span className="text-zinc-400 text-[11px] leading-relaxed">
                  Basic sentence patterns, phrase structures & comprehensive grammar drills
                </span>
              </div>
            </div>

            <div className="flex items-start gap-2.5 p-3 rounded-2xl bg-zinc-950/70 border border-zinc-800">
              <Cloud className="w-4 h-4 text-sky-400 shrink-0 mt-0.5" />
              <div>
                <span className="font-bold text-white block">Gmail Database Cloud Sync</span>
                <span className="text-zinc-400 text-[11px] leading-relaxed">
                  Save scores, bookmarks & study streaks to your Google account
                </span>
              </div>
            </div>

            <div className="flex items-start gap-2.5 p-3 rounded-2xl bg-zinc-950/70 border border-zinc-800">
              <ShieldCheck className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
              <div>
                <span className="font-bold text-white block">All 8 Study Modes Unrestricted</span>
                <span className="text-zinc-400 text-[11px] leading-relaxed">
                  Practice tests, rapid fire, complete word, flashcards across phone, tablet & PC
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Payment Gateway Note & Options */}
        <div className="mb-6">
          <div className="flex items-center justify-between text-xs font-mono text-zinc-400 mb-2">
            <span className="font-bold uppercase tracking-wider">Payment Options</span>
            <span className="text-[10px] text-amber-400 bg-amber-400/10 px-2 py-0.5 rounded border border-amber-400/20">
              Xendit / PayMongo Ready
            </span>
          </div>

          <div className="grid grid-cols-4 gap-1.5 sm:gap-2 mb-3">
            <button
              onClick={() => setSelectedMethod('xendit')}
              className={`p-2 sm:p-2.5 rounded-xl border text-center transition cursor-pointer ${
                selectedMethod === 'xendit'
                  ? 'bg-amber-400/20 border-amber-400 text-amber-300 font-bold'
                  : 'bg-zinc-950 border-zinc-800 text-zinc-400 hover:text-white'
              }`}
            >
              <CreditCard className="w-4 h-4 mx-auto mb-1 text-amber-400" />
              <span className="text-[10px] sm:text-[11px] block font-semibold truncate">Xendit Pay</span>
            </button>

            <button
              onClick={() => setSelectedMethod('instant')}
              className={`p-2 sm:p-2.5 rounded-xl border text-center transition cursor-pointer ${
                selectedMethod === 'instant'
                  ? 'bg-amber-400/20 border-amber-400 text-amber-300 font-bold'
                  : 'bg-zinc-950 border-zinc-800 text-zinc-400 hover:text-white'
              }`}
            >
              <Zap className="w-4 h-4 mx-auto mb-1 text-amber-400" />
              <span className="text-[10px] sm:text-[11px] block font-semibold truncate">Demo Unlock</span>
            </button>

            <button
              onClick={() => setSelectedMethod('gcash')}
              className={`p-2 sm:p-2.5 rounded-xl border text-center transition cursor-pointer ${
                selectedMethod === 'gcash'
                  ? 'bg-amber-400/20 border-amber-400 text-amber-300 font-bold'
                  : 'bg-zinc-950 border-zinc-800 text-zinc-400 hover:text-white'
              }`}
            >
              <Smartphone className="w-4 h-4 mx-auto mb-1 text-sky-400" />
              <span className="text-[10px] sm:text-[11px] block font-semibold truncate">GCash QR</span>
            </button>

            <button
              onClick={() => setSelectedMethod('maya')}
              className={`p-2 sm:p-2.5 rounded-xl border text-center transition cursor-pointer ${
                selectedMethod === 'maya'
                  ? 'bg-amber-400/20 border-amber-400 text-amber-300 font-bold'
                  : 'bg-zinc-950 border-zinc-800 text-zinc-400 hover:text-white'
              }`}
            >
              <QrCode className="w-4 h-4 mx-auto mb-1 text-emerald-400" />
              <span className="text-[10px] sm:text-[11px] block font-semibold truncate">Maya / QR</span>
            </button>
          </div>

          {selectedMethod === 'xendit' && (
            <div className="p-4 rounded-2xl bg-zinc-950 border border-zinc-800 text-xs space-y-2.5">
              <div className="flex items-center justify-between text-zinc-200">
                <span className="font-bold">Xendit Hosted Checkout (₱99)</span>
                <span className="text-[10px] font-mono text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded border border-emerald-500/20">
                  Automated Redirect & Sync
                </span>
              </div>
              <p className="text-zinc-400 leading-relaxed text-[11px]">
                Supports GCash, Maya, ShopeePay, GrabPay, and Visa/Mastercard. After checkout completes on Xendit, users are redirected back to this site and their account is automatically marked as <strong>Pro</strong>.
              </p>
              {userEmail ? (
                <div className="text-[11px] text-zinc-400 font-mono bg-zinc-900 p-2.5 rounded-xl border border-zinc-800">
                  Syncing to Gmail account: <span className="text-amber-400 font-bold">{userEmail}</span>
                </div>
              ) : (
                <div className="text-[11px] text-amber-300/90 font-mono bg-amber-400/10 p-2 rounded-xl border border-amber-400/20">
                  Tip: Sign in with Gmail first so your Pro status persists in the cloud across all your devices.
                </div>
              )}
            </div>
          )}

          {selectedMethod === 'instant' && (
            <div className="p-4 rounded-2xl bg-zinc-950 border border-zinc-800 text-xs space-y-2">
              <p className="text-zinc-300 leading-relaxed">
                Click below to instantly activate <strong>LET Reviewer Pro (₱99)</strong>. This unlocks all Majorship English questions and advanced features right away for this session.
              </p>
              {userEmail && (
                <div className="text-[11px] text-zinc-500 font-mono">
                  Syncing to Gmail account: <span className="text-amber-400">{userEmail}</span>
                </div>
              )}
            </div>
          )}

          {selectedMethod === 'gcash' && (
            <div className="p-4 rounded-2xl bg-zinc-950 border border-zinc-800 text-xs space-y-2">
              <div className="text-zinc-300">
                Send <strong>₱99</strong> via GCash Express Send to:
                <div className="mt-1 font-mono font-bold text-white bg-zinc-900 p-2 rounded-lg border border-zinc-800 select-all">
                  0917-888-1425 &bull; Sir JC Dela Cruz (LET Reviewer)
                </div>
              </div>
              <input
                type="text"
                placeholder="Reference No. (Optional)"
                value={referenceNumber}
                onChange={(e) => setReferenceNumber(e.target.value)}
                className="w-full px-3 py-2 rounded-xl bg-zinc-900 border border-zinc-700 text-white placeholder-zinc-500 font-mono text-xs focus:outline-none focus:border-amber-400"
              />
            </div>
          )}

          {selectedMethod === 'maya' && (
            <div className="p-4 rounded-2xl bg-zinc-950 border border-zinc-800 text-xs space-y-2">
              <div className="text-zinc-300">
                Send <strong>₱99</strong> via Maya or QR Ph:
                <div className="mt-1 font-mono font-bold text-white bg-zinc-900 p-2 rounded-lg border border-zinc-800 select-all">
                  @LETReviewerPro &bull; 0917-888-1425
                </div>
              </div>
              <input
                type="text"
                placeholder="Maya Reference (Optional)"
                value={referenceNumber}
                onChange={(e) => setReferenceNumber(e.target.value)}
                className="w-full px-3 py-2 rounded-xl bg-zinc-900 border border-zinc-700 text-white placeholder-zinc-500 font-mono text-xs focus:outline-none focus:border-amber-400"
              />
            </div>
          )}
        </div>

        {errorMessage && (
          <div className="mb-4 p-3 rounded-xl bg-rose-500/15 border border-rose-500/30 text-rose-300 text-xs">
            {errorMessage}
          </div>
        )}

        {/* Action Button */}
        <div className="flex flex-col sm:flex-row items-center gap-3">
          <button
            onClick={() => {
              if (selectedMethod === 'xendit') {
                handleXenditCheckout();
              } else if (selectedMethod === 'instant') {
                handleInstantActivation();
              } else {
                handleCompleteUpgrade();
              }
            }}
            disabled={isProcessing}
            className="w-full flex items-center justify-center gap-2 py-3.5 px-6 rounded-2xl bg-amber-400 hover:bg-amber-300 text-zinc-950 font-black text-sm shadow-xl shadow-amber-400/20 transition active:scale-95 cursor-pointer disabled:opacity-50"
          >
            <Sparkles className="w-4 h-4 fill-zinc-950" />
            <span>
              {isProcessing
                ? 'Processing...'
                : selectedMethod === 'xendit'
                ? 'Pay ₱99 via Xendit (GCash / Maya / Card)'
                : selectedMethod === 'instant'
                ? 'Instant Demo Unlock (₱0 Test)'
                : 'Confirm & Activate Pro (₱99)'}
            </span>
          </button>

          <button
            onClick={onClose}
            className="w-full sm:w-auto py-3.5 px-5 rounded-2xl bg-zinc-800 hover:bg-zinc-700 text-zinc-300 font-bold text-xs transition cursor-pointer"
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};
