export const locales = {
    en: 'en',
    ja: 'ja'
} as const
export type Locales = typeof locales[keyof typeof locales]