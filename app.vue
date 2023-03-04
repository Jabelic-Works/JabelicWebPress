<script setup lang="ts">
  import Header from '~/src/views/components/Header/Header.vue'
  import { APP_NAME } from '~~/src/shared/app/global'
  import { useElementSize } from '@vueuse/core'
  import { useRootElementStore } from './store/rootElement'
  const el = ref(null)
  const { height: elHeight } = useElementSize(el)
  const store = useRootElementStore()
  watch(elHeight, (arg) => {
    store.setHeight(arg)
  })
</script>
<template>
  <div ref="el">
    <Html lang="ja">
      <Head>
        <Title>{{ APP_NAME }}</Title>
        <Meta name="description" content="Jabelic Web Press" />
      </Head>
    </Html>
    <Header />
    <NuxtPage />
  </div>
</template>
