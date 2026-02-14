import 'server-only';
import type { Locale } from './i18n-config';

// We enumerate all dictionaries here for better type safety and to ensure they are available
const dictionaries = {
    en: () => import('./dictionaries/en.json').then((module) => module.default),
    vi: () => import('./dictionaries/vi.json').then((module) => module.default),
};

export const getDictionary = async (locale: Locale) => dictionaries[locale]();
