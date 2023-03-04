export const locales = {
  en: 'en',
  ja: 'ja',
  default: 'ja'
} as const
export type Locales = (typeof locales)[keyof typeof locales]
