<script setup lang="ts">
import { RuntimeConfig } from '@nuxt/schema';

type Article = {
  id: string,
  createdAt: string,
  updatedAt: string,
  publishedAt: string,
  revisedAt: string,
  title: string,
  content: string,
  eyecatch: string,
  category: string
}

const config:RuntimeConfig = useRuntimeConfig()
const article = ref();
const route = useRoute()
const { data: contents, pending, error, refresh } = await useFetch<Article>("https://jabelicwebpress.microcms.io/api/v1/blogs"+`/${route.params.id}`, {
    headers:{
        "X-MICROCMS-API-KEY": config.apikey
    },
})
article.value = contents.value

</script>

<template>
    <div class="root">
        <div v-html="contents?.content" class="content"></div>
        <div class="dummy-margin"></div>
    </div>
    
</template>

<style scoped>
.root{
    margin: 5vw;
}
.content{
    margin-bottom: 5vh;
}
/** ダミー要素 */
.dummy-margin{
    height: 1px;
}
/* NOTE: v-htmlにstyleを当てるには/deep/セレクタで指定しなければならない */
.root /deep/ h1{
    font-size: 32px;
    margin: 2vh;
}
.root /deep/ h2{
    font-size: 26px;
    margin-top: 1vh;
}
/** コードブロック */
.root /deep/ pre{
    margin-top: 1em;
    background-color: rgba(20, 20, 20, 0.9);
    overflow-x: scroll;
    padding: 1vh;
}
/** コード */
.root /deep/ code{
    background-color: rgba(20, 20, 20, 0.9);
    /* overflow-x: scroll;
    padding: 1rem; */
}
.root /deep/ pre /deep/ code{
    font-size: 16px;
    padding: 0rem;
    background-color: rgba(20, 20, 20, 0);
}
.root /deep/ p{
    font-size: 14px;
    margin-top: 1em;
}
.root /deep/ ul{
    font-size: 14px;
    margin-top: 1em;
}
.root /deep/ li{
    font-size: 14px;
    margin-top: 1em;
}
.root /deep/ a{
    font-size: 14px;
    margin-top: 1em;
    color: yellow;
}
.root /deep/ a:hover{
    color: rgba(30, 255, 0, 0.9);
}
.root /deep/ img{
    width: 50%;
    display: block;
    margin: auto;
    margin-top: 1em;
}
</style>