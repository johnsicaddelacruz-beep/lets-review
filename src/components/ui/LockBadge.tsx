import React from 'react';
import { Lock, Sparkles } from 'lucide-react';

interface LockBadgeProps {
  isPro: boolean;
  size?: 'sm' | 'md';
  label?: string;
  className?: string;
  onClick?: (e: React.MouseEvent) => void;
}

export const LockBadge: React.FC<LockBadgeProps> = ({
  isPro,
  size = 'sm',
  label = 'PRO',
  className = '',
  onClick,
}) => {
  if (isPro) {
    return null;
  }

  const isSmall = size === 'sm';

  return (
    <span
      onClick={onClick}
      className={`inline-flex items-center gap-1 font-mono font-bold uppercase rounded-md bg-amber-400/15 text-amber-400 border border-amber-400/40 shadow-xs tracking-wider transition hover:bg-amber-400/25 ${
        isSmall ? 'text-[9px] px-1.5 py-0.5' : 'text-[11px] px-2 py-1'
      } ${onClick ? 'cursor-pointer hover:scale-105 active:scale-95' : ''} ${className}`}
      title="Locked in Free Version • Upgrade to Pro (₱99) to unlock"
    >
      <Lock className={isSmall ? 'w-2.5 h-2.5' : 'w-3 h-3'} />
      <span>{label}</span>
    </span>
  );
};
