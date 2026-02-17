import 'server-only';
import type { Locale } from './config';
import type { Dictionary } from './types';

// We enumerate all dictionaries here for better type safety and to ensure they are available
const dictionaries: Record<Locale, () => Promise<Dictionary>> = {
  en: () => import('./dictionaries/en.json').then((module) => module.default as Dictionary),
  vi: () => import('./dictionaries/vi.json').then((module) => module.default as Dictionary),
};

import { i18n } from './config';

export const getDictionary = async (locale: Locale): Promise<Dictionary> => {
  const loader = dictionaries[locale] || dictionaries[i18n.defaultLocale];
  return loader();
};
