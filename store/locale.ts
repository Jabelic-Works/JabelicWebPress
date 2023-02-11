import { defineStore } from "pinia"
import { Locales } from "~~/model/locale"

export const useLocaleStore = defineStore('localeStore', {
    state: () => ({locale: 'en'}),
    getters: {
      getLocale: (state) => state.locale,
    },
    actions: {
      switchLang(arg: Locales) {
        this.locale = arg
      },
    },
  })