<script setup lang="ts">
const { articles } = useArticle()

</script>
<template>
    <div class="root">
        <div v-for="article in articles" class="article">
            <ArticleCard
                :jp-title="article.title" :description="article.description"
                :tags="article.tags" :to="article.to"/>
        </div>
    </div>
</template>
<style>
.article{
    margin-left: 3%;
    margin-right: 3%;
    margin-top: 3%;
}
</style>