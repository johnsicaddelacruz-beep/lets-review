import React, { useState } from 'react';
import { usePWAInstall } from '../../hooks/usePWAInstall';
import { Download, Smartphone, X } from 'lucide-react';

export const PWAInstallButton: React.FC = () => {
  const { isInstallable, isInstalled, isIOS, install } = usePWAInstall();
  const [showIOSGuide, setShowIOSGuide] = useState(false);

  if (isInstalled) {
    return null;
  }

  if (isInstallable) {
    return (
      <button
        onClick={install}
        className="flex items-center gap-2 rounded-xl bg-amber-400 hover:bg-amber-300 text-zinc-950 px-3.5 py-1.5 text-xs font-bold shadow-md hover:shadow-amber-400/20 transition active:scale-95 cursor-pointer"
        title="Install LET Reviewer to Home Screen"
      >
        <Download className="w-3.5 h-3.5 stroke-[2.5]" />
        <span>Install App</span>
      </button>
    );
  }

  if (isIOS) {
    return (
      <>
        <button
          onClick={() => setShowIOSGuide(true)}
          className="flex items-center gap-1.5 rounded-xl border border-amber-400/30 bg-amber-400/10 hover:bg-amber-400/20 text-amber-300 px-3 py-1.5 text-xs font-semibold transition active:scale-95 cursor-pointer"
          title="Add to Home Screen on iOS"
        >
          <Smartphone className="w-3.5 h-3.5" />
          <span>Install iOS</span>
        </button>

        {showIOSGuide && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm p-4 animate-in fade-in duration-200">
            <div className="w-full max-w-sm rounded-2xl bg-zinc-900 border border-zinc-800 p-6 shadow-2xl relative text-zinc-100">
              <button
                onClick={() => setShowIOSGuide(false)}
                className="absolute top-4 right-4 p-1.5 text-zinc-400 hover:text-white rounded-lg hover:bg-zinc-800"
              >
                <X className="w-4 h-4" />
              </button>
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-xl bg-amber-400/20 border border-amber-400/40 flex items-center justify-center text-amber-400">
                  <Smartphone className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-base font-bold text-white">Install on iPhone / iPad</h3>
                  <p className="text-xs text-zinc-400">Study offline on your home screen</p>
                </div>
              </div>
              <div className="space-y-3 text-sm text-zinc-300 bg-zinc-950/60 p-4 rounded-xl border border-zinc-800/80 mb-5">
                <div className="flex items-start gap-2.5">
                  <span className="flex items-center justify-center w-5 h-5 rounded-full bg-amber-400/20 text-amber-400 text-xs font-bold shrink-0 mt-0.5">1</span>
                  <p className="text-xs leading-relaxed">
                    Tap the <strong className="text-white">Share</strong> button (box with upward arrow) in the Safari toolbar.
                  </p>
                </div>
                <div className="flex items-start gap-2.5">
                  <span className="flex items-center justify-center w-5 h-5 rounded-full bg-amber-400/20 text-amber-400 text-xs font-bold shrink-0 mt-0.5">2</span>
                  <p className="text-xs leading-relaxed">
                    Scroll down and tap <strong className="text-white">Add to Home Screen</strong>.
                  </p>
                </div>
                <div className="flex items-start gap-2.5">
                  <span className="flex items-center justify-center w-5 h-5 rounded-full bg-amber-400/20 text-amber-400 text-xs font-bold shrink-0 mt-0.5">3</span>
                  <p className="text-xs leading-relaxed">
                    Tap <strong className="text-white">Add</strong> at the top right. Done! Now works completely offline.
                  </p>
                </div>
              </div>
              <button
                onClick={() => setShowIOSGuide(false)}
                className="w-full rounded-xl bg-amber-400 text-zinc-950 py-2.5 text-xs font-bold hover:bg-amber-300 transition"
              >
                Got It, Thanks!
              </button>
            </div>
          </div>
        )}
      </>
    );
  }

  return null;
};
