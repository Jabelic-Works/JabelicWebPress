<script setup lang="ts">
  import { titles } from '~~/src/shared/i18n/constant'
  import { locales, Locales } from '~~/src/shared/i18n/locale'
  import { useLocaleStore } from '~~/store/locale'
  import SelectLang from '~/src/views/components/Header/SelectLang.vue'
  import { useRootElementStore } from '~~/store/rootElement'
  const router = useRouter()

  const rootElementStore = useRootElementStore()
  /** 右上メニュー */
  type Contents = Array<{ title: string; link: string; target: '_blank' | null }>
  const contents = computed<Contents>(() =>
    rootElementStore.getWidth < 600
      ? [
          { title: 'Home', link: '/', target: null },
          { title: 'Profile', link: '/profile', target: null }
        ]
      : [
          { title: 'Home', link: '/', target: null },
          { title: 'Profile', link: '/profile', target: null },
          { title: 'GitHub', link: 'https://github.com/jabelic', target: '_blank' }
        ]
  )

  /** カラー */
  const appConfig = useAppConfig()
  const mainDarkColor = ref(appConfig.theme.colors.mainDark)

  /** 戻るボタン */
  const backTo = () => router.push('/')

  /** i18n */
  const route = useRoute()
  const isShowLangSwitcher = computed(() => !route.path.includes('article') && rootElementStore.getWidth > 480)

  const headerHeight = ref('5vh')
  const mobileheaderHeight = ref('5vh')
</script>

<template>
  <div class="header-root">
    <span class="left">
      <NuxtLink class="header-title" @click="($event) => backTo()">
        {{ titles.ja.title }}
      </NuxtLink>
      <div v-if="isShowLangSwitcher" class="lang-switch">
        <SelectLang />
      </div>
    </span>
    <div class="right">
      <NuxtLink
        v-for="content in contents"
        class="content set-item-center"
        :to="content.link"
        :target="content.target"
        rel="noopener"
      >
        <span class="title">{{ content.title }}</span>
      </NuxtLink>
    </div>
  </div>
</template>

<style scoped>
  .header-root {
    display: grid;
    grid-template-columns: repeat(10, 1fr);
    grid-template-rows: v-bind(headerHeight) 1fr;
    height: v-bind(headerHeight);
    background-color: v-bind(mainDarkColor);
  }
  .left {
    grid-column-start: 1;
    grid-column-end: 7;
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    place-items: center;
  }

  .lang-switch {
    display: grid;
    place-items: center;
  }

  .header-title {
    font-size: 18px;
    height: v-bind(headerHeight);
    text-decoration: none;
    display: grid;
    place-items: center;
    color: aliceblue;
    transition: 0.5s;
  }
  .header-title:hover {
    text-decoration: underline;
  }
  .header-title:active {
    color: rgba(30, 255, 0, 0.9);
  }

  .right {
    grid-column-start: 7;
    grid-column-end: 11;
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    place-items: center;
  }

  .content {
    display: grid;
    place-items: center;
    font-size: 14px;
    height: v-bind(headerHeight);
    text-decoration: none;
    color: aliceblue;
    transition: 0.5s;
  }
  .content:hover {
    text-decoration: underline;
  }
  .content:active {
    text-decoration: underline;
    color: rgba(30, 255, 0, 0.9);
  }
  .set-item-center {
    /** アイテムを中央にそろえる */
    display: grid;
    place-items: center;
  }
  @media screen and (max-width: 900px) {
    .left {
      grid-column-start: 0;
      grid-column-end: 8;
      grid-template-columns: repeat(10, 1fr);
    }
    .header-title {
      font-size: 16px;
      grid-column-start: 1;
      grid-column-end: 4;
    }
    .lang-switch {
      font-size: 16px;
      grid-column-start: 4;
      grid-column-end: 7;
    }
    .right {
      grid-column-start: 8;
      grid-column-end: 11;
      grid-template-columns: repeat(3, 1fr);
    }
  }
  @media screen and (max-width: 800px) {
    .left {
      grid-column-start: 0;
      grid-column-end: 7;
      grid-template-columns: repeat(10, 1fr);
    }
    .header-title {
      font-size: 16px;
      grid-column-start: 0;
      grid-column-end: 5;
    }
    .lang-switch {
      font-size: 16px;
      grid-column-start: 5;
      grid-column-end: 9;
    }
    .right {
      grid-column-start: 7;
      grid-column-end: 11;
      grid-template-columns: repeat(3, 1fr);
    }
  }
  @media screen and (max-width: 700px) {
    .header-root {
      grid-template-columns: repeat(10, 1fr);
      grid-template-rows: v-bind(mobileheaderHeight) 1fr;
      height: v-bind(mobileheaderHeight);
    }
    .left {
      height: v-bind(mobileheaderHeight);
      grid-template-rows: v-bind(mobileheaderHeight) 1fr;
      grid-column-start: 0;
      grid-column-end: 8;
      grid-template-columns: repeat(10, 1fr);
    }
    .header-title {
      font-size: 14px;
      grid-column-start: 0;
      grid-column-end: 5;
    }
    .lang-switch {
      font-size: 14px;
      grid-column-start: 5;
      grid-column-end: 9;
    }
    .right {
      height: v-bind(mobileheaderHeight);
      grid-template-rows: v-bind(mobileheaderHeight) 1fr;
      grid-column-start: 8;
      grid-column-end: 11;
      grid-template-columns: repeat(3, 1fr);
    }
  }
  @media screen and (max-width: 600px) {
    .header-root {
      display: grid;
      grid-template-columns: repeat(10, 1fr);
      grid-template-rows: v-bind(mobileheaderHeight) 1fr;
      height: v-bind(mobileheaderHeight);
      background-color: v-bind(mainDarkColor);
    }
    .left {
      height: v-bind(mobileheaderHeight);
      grid-column-start: 0;
      grid-column-end: 8;
      grid-template-columns: repeat(10, 1fr);
      grid-template-rows: v-bind(mobileheaderHeight) 1fr;
    }
    .header-title {
      font-size: 14px;
      min-width: 30vw;
      grid-column-start: 0;
      grid-column-end: 5;
    }
    .lang-switch {
      font-size: 10px;
      min-width: 30vw;
      grid-column-start: 5;
      grid-column-end: 9;
    }
    .right {
      height: v-bind(mobileheaderHeight);
      grid-column-start: 8;
      grid-column-end: 11;
      justify-content: end;
      grid-template-columns: repeat(2, 1fr);
      grid-template-rows: v-bind(mobileheaderHeight) 1fr;
    }
    .content {
      font-size: 14px;
      height: v-bind(mobileheaderHeight);
      grid-template-rows: v-bind(mobileheaderHeight) 1fr;
      text-decoration: none;
      color: aliceblue;
      transition: 0.5s;
    }
    .content:hover {
      background-color: rgba(193, 193, 193, 0.2);
    }
    .content:active {
      background-color: rgba(193, 193, 193, 0.5);
    }
  }
  @media screen and (max-width: 480px) {
    .header-title {
      font-size: 12px;
    }
  }
</style>
