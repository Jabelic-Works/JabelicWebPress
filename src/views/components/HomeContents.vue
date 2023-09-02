<script setup lang="ts">
  import ArticleCard from '~/src/views/components/ArticleCard.vue'
  import { ContentsCards } from '~/src/useCases/blogList'
  import { Locales } from '~~/src/shared/i18n/locale'

  type Props = {
    contents: ContentsCards['contents'] | null
    lang: Locales
  }

  // https://github.com/vuejs/core/issues/4294
  const props = withDefaults(defineProps<Props>(), {
    contents: (): ContentsCards['contents'] => [
      {
        title: 'title',
        id: '1',
        description: 'description',
        tags: null,
        updatedAt: ''
      }
    ]
  })
</script>

<template>
  <div class="root">
    <template v-if="props.contents">
      <div v-for="article in props.contents" class="article">
        <ArticleCard
          :contents="{
            title: article.title,
            id: article.id,
            description: article.description,
            tags: article.tags,
            to: `/${lang}/article/${article.id}`
          }"
          :path="$route.path"
        />
      </div>
    </template>
  </div>
</template>

<style scoped>
  .article {
    margin-left: 3%;
    margin-right: 3%;
    margin-top: 3%;
  }
</style>
