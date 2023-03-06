<script setup lang="ts">
  import { titles } from '~~/src/shared/i18n/constant'
  import { useLocaleStore } from '~~/store/locale'
  import { useBlogList } from '~/src/interactors/blogList'
  import HomeContents from '~~/src/views/components/HomeContents.vue'
  import { RuntimeConfig } from '@nuxt/schema'
  import SelectLang from '~/src/views/components/Header/SelectLang.vue'
  import { useRootElementStore } from '~~/store/rootElement'

  useHead({
    titleTemplate: '%s',
    bodyAttrs: {
      class: 'rtl'
    }
  })
  const trans = ref(true)
  setTimeout(() => {
    trans.value = false
  }, 2500)
  const store = useLocaleStore()
  const _titles = computed(() => titles[store.getLocale])
  const config: RuntimeConfig = useRuntimeConfig()

  const contents = (await useLazyAsyncData(async () => await useBlogList(config, store.getLocale))).data
  watch(
    () => store.getLocale,
    async () => {
      contents.value = (await useLazyAsyncData(async () => await useBlogList(config, store.getLocale))).data.value
    }
  )
  /** i18n */
  const route = useRoute()
  const rootElementStore = useRootElementStore()
  const isShowLangSwitcher = computed(() => !route.path.includes('article') && rootElementStore.getWidth <= 480)
</script>

<template>
  <div class="transition" :class="{ 'anim-trans': trans }"></div>
  <div class="root">
    <div v-if="isShowLangSwitcher" class="lang-switch">
      <SelectLang />
    </div>
    <div class="sub-header">
      <h1>{{ _titles.subTitle }}</h1>
    </div>
    <HomeContents v-if="contents" :contents="contents" />
  </div>
</template>

<style scoped>
  .sub-header {
    padding-left: 3%;
    padding-top: 3%;
    padding-bottom: 3%;
  }
  h1 {
    /* font-size: 28px; */
    font-size: xx-large;
    transform: rotate(0.03deg);
    padding-top: 1%;
  }
  h3 {
    font-size: 20px;
    padding-top: 1%;
  }
  .lang-switch {
    text-align: end;
    margin-right: 3vw;
    margin-top: 3vw;
  }
  @media screen and (max-width: 800px) {
    h1 {
      font-size: 24px;
      padding-top: 3%;
    }
  }
  @media screen and (max-width: 600px) {
    h1 {
      font-size: 20px;
      padding-top: 3%;
    }
    h3 {
      font-size: 14px;
      padding-top: 3%;
    }
  }
</style>
