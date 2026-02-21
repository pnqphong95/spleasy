import { cn } from '@/lib/utils';

/**
 * A curated set of highly distinct, premium gradients following the system color palette.
 * Colors are ordered to maximize contrast between adjacent indices.
 */
const AVATAR_GRADIENTS = [
  'from-emerald-500 to-teal-700', // Deep Emerald
  'from-rose-500 to-orange-600', // Sunset Orange/Red
  'from-indigo-600 to-violet-800', // Royal Purple
  'from-amber-400 to-yellow-600', // Golden Sunlight
  'from-cyan-400 to-blue-600', // Ocean Blue
  'from-fuchsia-500 to-purple-700', // Electric Magenta
  'from-orange-500 to-red-700', // Fire Burn
  'from-lime-400 to-emerald-600', // Fresh Lime
  'from-sky-500 to-indigo-700', // Deep Sky
  'from-pink-400 to-rose-600', // Soft Rose
  'from-violet-400 to-fuchsia-600', // Lavender Dream
  'from-teal-400 to-emerald-700', // Sea Foam
  'from-blue-500 to-indigo-800', // Midnight Blue
  'from-yellow-400 to-orange-500', // Citrus burst
];

/**
 * Deterministically generates a hash from a string.
 * Uses a simple polynomial rolling hash for better distribution than charCodeSum.
 */
function hashString(str: string): number {
  let hash = 0;
  for (let i = 0; i < str.length; i++) {
    hash = (hash << 5) - hash + str.charCodeAt(i);
    hash |= 0; // Convert to 32bit integer
  }
  return Math.abs(hash);
}

/**
 * Deterministically generates a gradient background class based on a string (name or id).
 * This ensures the same user always gets the same color across the application.
 */
export function getAvatarGradient(seed: string): string {
  if (!seed) return 'bg-zinc-700';

  const hash = hashString(seed);
  const index = hash % AVATAR_GRADIENTS.length;

  return `bg-gradient-to-br ${AVATAR_GRADIENTS[index]}`;
}

/**
 * Returns a complete style string for an avatar, including text color and shadow.
 */
export function getAvatarStyle(seed: string): string {
  return cn('text-white shadow-md ring-1 ring-white/20', getAvatarGradient(seed));
}
