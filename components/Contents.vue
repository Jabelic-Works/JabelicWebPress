<script setup lang="ts">
import { RuntimeConfig } from '@nuxt/schema';
import { MicroCMSListResponse } from 'microcms-js-sdk/dist/cjs/types';
import { locales } from '~~/model/locale';
import { useLocaleStore } from '~~/store/locale';


const config:RuntimeConfig = useRuntimeConfig()

const store = useLocaleStore()

const contents = await useFetchBlogList()

watch(()=>store.getLocale, async (arg)=>{
    const _contents = await useFetchBlogList()
    contents.value = _contents.value
    console.debug(arg)
})
</script>

<template>
    <div class="root">
        <template v-if="contents">
            <div v-for="article in contents.contents" class="article">
                <ArticleCard
                    :jp-title="article.title"
                    :en-title="article.title"
                    :id="article.id"
                    :description="article.content"
                    :tags="null"
                    :to="`article/${article.id}`"
                />
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