<script setup lang="ts">
import { RuntimeConfig } from '@nuxt/schema';
import { MicroCMSListResponse } from 'microcms-js-sdk/dist/cjs/types';

const config:RuntimeConfig = useRuntimeConfig()
const articleList = ref();

const params = {
    fields: "id,title,main_image,updatedAt,author.name"
}
const { data: contents, pending, error, refresh } = await useFetch<MicroCMSListResponse<any>>("https://jabelicwebpress.microcms.io/api/v1/blogs", {
    headers:{
        "X-MICROCMS-API-KEY": config.apikey
    },
    params
})
articleList.value = contents.value
</script>
<template>
    <div class="root">
        <template v-if="articleList">
            <div v-for="article in articleList.contents" class="article">
                <ArticleCard
                :jp-title="article.title"
                :en-title="article.title"
                :id="article.id"
                :description="article.content"
                :tags="null"
                :to="`article/${article.id}`"/>
            </div>
        </template>
    </div>
</template>
<style scoped>
.article{
    margin-left: 3%;
    margin-right: 3%;
    margin-top: 3%;
}
</style>