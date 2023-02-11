import { defineStore } from "pinia"
import { locales, Locales } from "~~/model/locale"

export const useLocaleStore = defineStore('localeStore', {
    state: (): {locale: Locales} => ({locale: locales.default}),
    getters: {
      getLocale: (state) => state.locale,
    },
    actions: {
      switchLang(arg: Locales) {
        this.locale = arg
      },
    },
  })