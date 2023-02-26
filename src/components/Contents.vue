<script setup lang="ts">
import { useLocaleStore } from '~~/store/locale';
import ArticleCard from '~/src/components/ArticleCard.vue'

const contents = await useFetchBlogList()

const store = useLocaleStore()
watch(()=>store.getLocale, async (arg)=>{
    const _contents = await useFetchBlogList()
    contents.value = _contents.value
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