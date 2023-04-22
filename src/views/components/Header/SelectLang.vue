<script setup lang="ts">
  import { locales, Locales } from '~~/src/shared/i18n/locale'
  import { switchLangLabels } from '~~/src/shared/i18n/constant'
  // import { useLocaleStore } from '~~/store/locale'

  /** i18n */
  // const store = useLocaleStore()
  const router = useRouter()
  const route = useRoute()
  // const initLocale = ref(route.path.includes('/en/') ? locales.en : locales.ja)
  const locale = ref<Locales>(route.path.includes('en') ? locales.en : locales.ja)

  watch(locale, async (arg) => {
    console.debug(arg)
    switch (arg) {
      /** To English */
      case locales.en:
        if (route.path.includes('ja')) {
          await router.replace(route.path.replace('ja', 'en'))
        } else {
          await router.replace('en/' + route.path)
        }
        break
      /** To Japanese */
      case locales.ja:
        if (route.path.includes('en')) {
          await router.replace(route.path.replace('en', 'ja'))
        } else {
          await router.replace('ja/' + route.path)
        }
        break
      default:
        const _n: never = arg
        console.error(`${_n} is not a valid`)
        break
    }
  })
  const isShowLangSwitcher = computed(() => !route.path.includes('article'))
</script>
<template>
  <form class="switch-form">
    <label for="locale-select">language: </label>
    <select id="locale-select" v-model.lazy="locale">
      <option value="en">{{ switchLangLabels.en }}</option>
      <option value="ja">{{ switchLangLabels.ja }}</option>
    </select>
  </form>
</template>
