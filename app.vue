<script setup lang="ts">
import Header  from '~/src/shared/components/Header/Header.vue'
import { APP_NAME }from '~~/src/shared/app/global'
</script>
<template>
  <div>
    <Html lang="ja">
      <Head>
        <Title>{{ APP_NAME }}</Title>
        <Meta name="description" content="Jabelic Web Press" />
      </Head>
    </Html>
    <Header/>
    <NuxtPage/>
  </div>
</template>
