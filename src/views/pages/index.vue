<script setup lang="ts">
  import { titles } from '~~/src/shared/i18n/constant'
  import HomeContents from '~~/src/views/components/HomeContents.vue'
  import { RuntimeConfig } from '@nuxt/schema'
  import SelectLang from '~/src/views/components/Header/SelectLang.vue'
  import { useRootElementStore } from '~~/store/rootElement'
  import { locales, Locales } from '~~/src/shared/i18n/locale'

  const config: RuntimeConfig = useRuntimeConfig()
  const { $api } = useNuxtApp()
  useHead({
    titleTemplate: '%s',
    bodyAttrs: {
      class: 'rtl'
    }
  })
  const trans = shallowRef(true)
  setTimeout(() => {
    trans.value = false
  }, 2500)

  /** i18n */
  const route = useRoute()
  const rootElementStore = useRootElementStore()
  const isShowLangSwitcher = computed(() => !route.path.includes('article') && rootElementStore.getWidth <= 600)
  const locale = computed<Locales>(() => (route.path.includes('ja') ? locales.ja : locales.en))
  const titleInTheLang = computed(() => titles[locale.value])

  const { data: contents, error } = await useLazyAsyncData(
    async () =>
      await $api.getBlogList(
        {
          apiKey: config.apiKey ?? config.public.apiKey,
          enApiKey: config.enApiKey ?? config.public.enApiKey,
          apiEndpoint: config.apiEndpoint ?? config.public.apiEndpoint,
          enApiEndpoint: config.enApiEndpoint ?? config.public.enApiEndpoint
        },
        locale.value
      )
  )
</script>

<template>
  <div class="transition" :class="{ 'anim-trans': trans }"></div>
  <div class="root">
    <div v-if="isShowLangSwitcher" class="lang-switch">
      <SelectLang />
    </div>
    <div class="sub-header">
      <h1>
        {{ titleInTheLang.subTitle }}
      </h1>
    </div>
    <p v-if="error">{{ error }}</p>
    <HomeContents :contents="contents" :lang="locale" />
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
