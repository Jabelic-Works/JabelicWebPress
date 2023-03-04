import { Ref } from '@vue/runtime-dom'
import { ComputedRef } from 'nuxt/dist/app/compat/vue-demi'
import { Article } from '~/src/useCases/article'
import {
  getHtmlBlocksRegExp,
  getStructuredMenu,
  getTitleAndTags,
  StructuredMenuItem
} from '~~/src/shared/utils/htmlParser'

/**
 *
 * @param contents ブログのコンテンツ(HTML文書全体)
 * @returns
 */
export const useHtmlParser = (
  contents: Ref<Article | null>
): {
  structuredMenu: ComputedRef<StructuredMenuItem[] | undefined>
} => {
  const tags = ['h1', 'h2', 'h3']
  const detectTitles = getHtmlBlocksRegExp(tags)
  const titleAndTags = computed(() => getTitleAndTags(detectTitles, contents.value?.content))
  const structuredMenu = computed(() => (titleAndTags.value ? getStructuredMenu(titleAndTags.value) : undefined))
  return { structuredMenu }
}
