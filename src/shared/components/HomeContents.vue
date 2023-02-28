<script setup lang="ts">
import ArticleCard from '~/src/shared/components/ArticleCard.vue'
import { ContentsCards } from '~/src/useCases/blogList';

type Props = {
    contents: ContentsCards['contents']
}

// https://github.com/vuejs/core/issues/4294
const props = withDefaults(defineProps<Props>(), {
    contents: (): ContentsCards['contents']=>[{
        title: 'title',
        id: '1',
        description: 'description',
        tag: ['a', 'b'],
        updatedAt: ''
    }]
});


</script>

<template>
    <div class="root">
        <template v-if="props.contents">
            <div v-for="article in props.contents" class="article">
                <ArticleCard
                    :title="article.title"
                    :id="article.id ?? 'id'"
                    :description="article.description"
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