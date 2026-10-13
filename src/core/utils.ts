export function shuffle<T>(array: T[]): T[] {
  const result = [...array];
  for (let i = result.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [result[i], result[j]] = [result[j], result[i]];
  }
  return result;
}

export function formatTime(seconds: number): string {
  const mins = Math.floor(seconds / 60);
  const secs = seconds % 60;
  return `${mins}:${secs < 10 ? '0' : ''}${secs}`;
}

export function calculateGrade(score: number, total: number): {
  percentage: number;
  label: string;
  badge: string;
  passed: boolean;
  color: string;
} {
  if (total === 0) {
    return { percentage: 0, label: 'No attempts', badge: 'NONE', passed: false, color: 'text-zinc-400' };
  }
  const percentage = Math.round((score / total) * 100);

  if (percentage >= 90) {
    return {
      percentage,
      label: 'Board Exam Topnotcher',
      badge: 'TOPNOTCHER',
      passed: true,
      color: 'text-amber-400',
    };
  } else if (percentage >= 75) {
    return {
      percentage,
      label: 'Passed — Future LPT',
      badge: 'PASSED',
      passed: true,
      color: 'text-emerald-400',
    };
  } else if (percentage >= 60) {
    return {
      percentage,
      label: 'Good Effort — Keep Reviewing',
      badge: 'CONDITIONAL',
      passed: false,
      color: 'text-orange-400',
    };
  } else {
    return {
      percentage,
      label: 'Needs More Practice',
      badge: 'RE-TAKE',
      passed: false,
      color: 'text-rose-400',
    };
  }
}
