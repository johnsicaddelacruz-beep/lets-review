import React, { useState } from 'react';
import { 
  X, 
  Check, 
  Sparkles, 
  ShieldCheck, 
  Cloud,
  ExternalLink,
  CreditCard
} from 'lucide-react';
import { sound } from '../../core/sound';

interface UpgradeModalProps {
  isOpen: boolean;
  onClose: () => void;
  onUpgradeSuccess: (reference: string) => Promise<void> | void;
  userEmail?: string;
}

const XENDIT_PAYMENT_URL = 'https://checkout-staging.xendit.co/od/tara-lets-pro';

export const UpgradeModal: React.FC<UpgradeModalProps> = ({
  isOpen,
  onClose,
  userEmail,
}) => {
  const [isRedirecting, setIsRedirecting] = useState(false);

  if (!isOpen) return null;

  const handleXenditCheckout = () => {
    sound.playClick();
    setIsRedirecting(true);
    const liveLink = 
      (import.meta as any).env?.VITE_XENDIT_PAYMENT_LINK || 
      XENDIT_PAYMENT_URL;

    // Redirect to Xendit hosted checkout
    window.location.href = liveLink;
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-zinc-950/85 backdrop-blur-md animate-fadeIn">
      <div className="relative w-full max-w-lg max-h-[92vh] overflow-y-auto rounded-3xl bg-zinc-900 border border-amber-400/50 shadow-2xl p-6 sm:p-8 text-zinc-100">
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
              Unlock Majorship English
            </h2>
          </div>
        </div>

        {/* Price Tag */}
        <div className="flex items-baseline justify-between mb-5 p-4 rounded-2xl bg-zinc-950 border border-zinc-800">
          <div>
            <span className="text-3xl sm:text-4xl font-black text-amber-400 font-mono">₱99</span>
            <span className="text-xs text-zinc-400 ml-2 font-medium">One-Time Lifetime Fee</span>
          </div>
          <span className="text-[10px] font-mono uppercase tracking-wider text-emerald-400 bg-emerald-500/10 px-2.5 py-1 rounded-full border border-emerald-500/20 font-bold">
            No Monthly Fees
          </span>
        </div>

        {/* Pro Inclusions */}
        <div className="mb-6 space-y-2.5">
          <div className="text-xs font-bold uppercase tracking-wider text-amber-400 font-mono">
            Everything Included in Pro:
          </div>

          <div className="space-y-2 text-xs">
            <div className="flex items-start gap-2.5 p-3 rounded-2xl bg-zinc-950/70 border border-zinc-800">
              <Check className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
              <div>
                <span className="font-bold text-white block">Full Majorship English Question Bank</span>
                <span className="text-zinc-400 text-[11px] leading-relaxed">
                  Structure of English, Syntax, Morphology, Linguistics, Literary Terms & PRC Board items
                </span>
              </div>
            </div>

            <div className="flex items-start gap-2.5 p-3 rounded-2xl bg-zinc-950/70 border border-zinc-800">
              <ShieldCheck className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
              <div>
                <span className="font-bold text-white block">All 8 Study Modes Unlocked</span>
                <span className="text-zinc-400 text-[11px] leading-relaxed">
                  Practice tests with rationalizations, rapid-fire sprints, complete word, flashcards & cheat sheet
                </span>
              </div>
            </div>

            <div className="flex items-start gap-2.5 p-3 rounded-2xl bg-zinc-950/70 border border-zinc-800">
              <Cloud className="w-4 h-4 text-sky-400 shrink-0 mt-0.5" />
              <div>
                <span className="font-bold text-white block">Google Cloud Database Backup</span>
                <span className="text-zinc-400 text-[11px] leading-relaxed">
                  {userEmail 
                    ? `Linked to Gmail: ${userEmail}. Progress and Pro license stay backed up in cloud.`
                    : 'Sign in with Gmail anytime to sync your Pro license across phone, tablet, and PC.'}
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* ONLY PAYMENT OPTION: XENDIT CHECKOUT */}
        <div className="space-y-3">
          <button
            onClick={handleXenditCheckout}
            disabled={isRedirecting}
            className="w-full flex flex-col items-center justify-center py-4 px-6 rounded-2xl bg-gradient-to-r from-amber-400 via-amber-300 to-amber-500 hover:from-amber-300 hover:to-amber-400 text-zinc-950 shadow-xl shadow-amber-400/20 transition active:scale-95 cursor-pointer disabled:opacity-50"
          >
            <div className="flex items-center gap-2 font-black text-base tracking-wide">
              <Sparkles className="w-5 h-5 fill-zinc-950" />
              <span>{isRedirecting ? 'Redirecting to Xendit...' : '99 Pesos Majorship Reviewer'}</span>
              <ExternalLink className="w-4 h-4" />
            </div>
            <span className="text-[11px] font-bold text-zinc-900/80 mt-0.5">
              Secure Checkout via GCash • Maya • ShopeePay • GrabPay • Card
            </span>
          </button>

          <button
            onClick={onClose}
            className="w-full py-2.5 text-xs text-zinc-400 hover:text-zinc-200 transition cursor-pointer font-medium text-center"
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};
