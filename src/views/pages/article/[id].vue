<script setup lang="ts">
  import { RuntimeConfig } from '@nuxt/schema'
  import { useMenu } from '~~/src/views/composables/menu'
  import { useTitleAndDescription } from '~/src/views/composables/titleAndDescription'
  import { useHtmlParser } from '~/src/views/composables/htmlParser'
  import MenuBar from '~/src/views/components/MenuBar.vue'
  import { useRootElementStore } from '~~/store/rootElement'
  import { Locales, locales } from '~~/src/shared/i18n/locale'
  const config: RuntimeConfig = useRuntimeConfig()
  const route = useRoute()

  const locale = computed<Locales>(() => (route.path.includes('ja') ? locales.ja : locales.en))
  const { $api } = useNuxtApp()
  const contents = await useLazyAsyncData(
    async () =>
      await $api.getBlogContent(route.params.id, locale.value, {
        apiKey: config.apiKey ?? config.public.apiKey,
        enApiKey: config.enApiKey ?? config.public.enApiKey,
        apiEndpoint: config.apiEndpoint ?? config.public.apiEndpoint,
        enApiEndpoint: config.enApiEndpoint ?? config.public.enApiEndpoint
      })
  )

  const { structuredMenu } = useHtmlParser(contents.data)
  const { width, height } = useWindowSize()
  const rootElementStore = useRootElementStore()
  const rootHeight = computed(() => `${rootElementStore.getHeight}px`)
  const { menu, transition, transitionTimeoutMs, openMenu, closeMenu, menuState } = useMenu(
    contents.data,
    computed(() => width.value)
  )

  /** extract title */
  const { extractTitle } = useTitleAndDescription()

  /** header */
  useHead({
    titleTemplate: `%s - ${contents.data.value?.title}`,
    bodyAttrs: {
      class: 'rtl'
    }
  })

  /** animation */
  const animationDuration = ref(`${transitionTimeoutMs / 1000}s` ?? '0.5s')
  const trans = ref(true)
  setTimeout(() => {
    trans.value = false
  }, 2500)
</script>

<template>
  <div class="transition" :class="{ 'anim-trans': trans }"></div>
  <div class="root" ref="el">
    <div v-if="menuState === 'large'" class="content">
      <div class="title">
        {{ extractTitle(contents.data.value?.title ?? '') }}
      </div>
      <div class="main">
        <!-- 本文 -->
        <div v-html="contents.data.value?.content" class="article"></div>
      </div>
    </div>
    <div v-else-if="menuState === 'medium'" class="content">
      <div class="title">
        {{ extractTitle(contents.data.value?.title ?? '') }}
      </div>
      <div class="main">
        <!-- 本文 -->
        <div v-html="contents.data.value?.content" class="article"></div>
      </div>
    </div>
    <div v-else-if="menuState === 'small'" class="content-small">
      <div class="blog-content-small">
        <div class="title">
          {{ extractTitle(contents.data.value?.title ?? '') }}
        </div>
        <div class="main">
          <!-- 折りたたみ状態のmenu -->
          <div @click.stop="openMenu" class="menu">
            <template v-if="!menu.isOpen">
              <div @click.stop="openMenu" class="menu-btn">
                <img src="@/assets/img/menu_open.svg" alt="menu" class="menu-btn-img" />
              </div>
            </template>
          </div>
          <!-- 本文 -->
          <div v-html="contents.data.value?.content" class="article"></div>
        </div>
      </div>
      <!-- <div v-show="menu.isOpen" class="folded-menu-bar"> -->
      <!-- overlay -->
      <div v-if="menu.isOpen" @click="closeMenu" class="shadow" :class="{ fadeout: transition }"></div>
      <!-- menu bar -->
      <MenuBar
        class="menu-bar"
        :menus="{ menu, transition, transitionTimeoutMs, openMenu, closeMenu }"
        :structured-menus="{ structuredMenu }"
        :height="height"
      />
      <!-- </div> -->
    </div>
    <div class="dummy-margin"></div>
  </div>
</template>

<style scoped>
  .root {
    /** font kerning */
    letter-spacing: 0.05rem;
  }
  .title {
    height: 6vh;
    font-size: 1.8rem;
    padding-left: 2rem;
    display: grid;
    place-items: center start;
    white-space: pre;
    overflow-x: scroll;
  }

  .menu-btn {
    display: grid;
    place-content: center;
    transition: 0.5s;
  }

  .menu-btn-img {
    height: 5vh;
    place-content: center;
  }
  .menu:hover {
    background-color: rgba(36, 89, 65, 0.9);
  }
  .menu:active {
    background-color: rgba(36, 89, 65, 0.8);
  }

  .article {
    padding: 2vw;
    margin: 2vw;
    margin-left: 7vw;
  }
  /** ダミー要素 */
  .dummy-margin {
    height: 1px;
  }
  /* NOTE: v-htmlにstyleを当てるには:deep(セレクタで指定しなければならない */
  .root :deep(h1) {
    font-size: 32px;
    margin-top: 2vh;
    margin-bottom: 2vh;
  }
  .root :deep(h2) {
    font-size: 26px;
    margin-top: 1vh;
    margin-bottom: 1vh;
  }
  .root :deep(h3) {
    font-size: 22px;
    margin-top: 1vh;
    margin-bottom: 1vh;
  }
  /** コードブロック */
  .root :deep(pre) {
    margin-top: 1em;
    background-color: rgba(20, 20, 20, 0.9);
    overflow-x: scroll;
    padding: 1vh;
  }
  /** コード */
  .root :deep(code) {
    background-color: rgba(20, 20, 20, 0.9);
    /* overflow-x: scroll;
    padding: 1rem; */
  }
  .root :deep(pre) :deep(code) {
    font-size: 16px;
    padding: 0rem;
    background-color: rgba(20, 20, 20, 0);
  }
  .root :deep(p) {
    font-size: 14px;
    margin-top: 1em;
  }
  .root :deep(ul) {
    font-size: 14px;
    margin-top: 1em;
  }
  .root :deep(li) {
    font-size: 14px;
    margin-top: 1em;
    margin-left: 3em;
  }
  .root :deep(a) {
    font-size: 14px;
    margin-top: 1em;
    transition: 0.5s;
    color: white;
  }
  .root :deep(a:hover) {
    color: yellow;
  }
  .root :deep(a:active) {
    color: rgba(30, 255, 0, 0.9);
  }
  .root :deep(img) {
    width: 50%;
    display: block;
    margin: auto;
    margin-top: 1em;
  }

  @media screen and (max-width: 600px) {
    .title {
      background-color: #245941;
      height: 3rem;
      font-size: 1rem;
      padding-left: 1rem;
      place-items: center start;
      white-space: pre;
      overflow-x: scroll;
    }

    .main {
      display: flex;
    }
    .main :deep(.menu) {
      width: 20%;
      background-color: rgba(36, 89, 65, 1);
      /* align-self: start;
      height: 100vh; */
      position: sticky;
      top: 0px;
    }
    .folded-menu-bar {
      display: flex;
      position: fixed;
      /* position: absolute; */
      top: 0px;
      z-index: 9;
      width: 100%;
      height: 100%;
      /* overflow: auto; */
      /* position: sticky; */
    }
    .menu-bar {
      /* position: sticky; */
      /* position: fixed; */
      align-self: start;
      /* width: 300px; */
      width: 60%;
      min-height: v-bind(rootHeight);
      background-color: #245941;
      top: 0px;
      left: 0px;
      z-index: 9;
      overflow: auto;
    }
    .shadow {
      position: fixed;
      /* position: sticky; */
      left: 0;
      top: 0;
      width: 100%;
      min-height: v-bind(rootHeight);
      background: rgba(100, 100, 100, 0.8);
      animation: fadein v-bind(animationDuration) ease 0s 1 forwards;
    }
    @keyframes fadein {
      0% {
        opacity: 0;
      }
      100% {
        opacity: 1;
      }
    }
    /** 背景要素(白い影)をfadeoutさせる */
    .shadow.fadeout {
      animation: fadeout v-bind(animationDuration) ease 0s 1 forwards;
      height: 120%;
    }
    @keyframes fadeout {
      0% {
        opacity: 1;
      }
      100% {
        opacity: 0;
      }
    }
    .main :deep(.article) {
      /* grid-column-start: 2;
      grid-column-end: 16; */
      padding: 2vw;
      margin: 2vw;
      /* margin-left: 7vw;f */
    }
    .menu-btn {
      place-content: center;
    }
    .menu-btn-img {
      /* height: 10vh; */
      display: grid;
      place-content: start center;
    }
    .article {
      padding: 3vw;
      margin: 3vw;
    }
    .root :deep(h1) {
      font-size: 26px;
      margin-top: 2vh;
      margin-bottom: 2vh;
    }
    .root :deep(h2) {
      font-size: 22px;
      margin-top: 2vh;
      margin-bottom: 2vh;
    }
    .root :deep(h3) {
      font-size: 18px;
      margin-top: 1vh;
      margin-bottom: 1vh;
    }
    /** コードブロック */
    .root :deep(pre) {
      margin-top: 1em;
      background-color: rgba(20, 20, 20, 0.9);
      overflow-x: scroll;
      padding: 1vh;
    }
    /** コード */
    .root :deep(code) {
      background-color: rgba(20, 20, 20, 0.9);
      /* overflow-x: scroll;
        padding: 1rem; */
    }
    .root :deep(pre) :deep(code) {
      font-size: 12px;
      padding: 0rem;
      background-color: rgba(20, 20, 20, 0);
    }
    .root :deep(p) {
      font-size: 10px;
      margin-top: 1em;
    }
    .root :deep(ul) {
      font-size: 10px;
      margin-top: 1em;
    }
    .root :deep(li) {
      font-size: 10px;
      margin-top: 1em;
      margin-left: 3em;
    }
    .root :deep(a) {
      font-size: 10px;
      margin-top: 1em;
      color: yellow;
      transition: 0.5s;
    }
    .root :deep(img) {
      width: 90%;
      display: block;
      margin: auto;
      margin-top: 1em;
    }
  }
  img {
    margin: 0px;
  }
</style>
