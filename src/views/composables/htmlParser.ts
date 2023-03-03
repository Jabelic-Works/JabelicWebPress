import { Ref } from '@vue/runtime-dom'
import { ComputedRef } from 'nuxt/dist/app/compat/vue-demi'
import { Article } from '~/src/useCases/article'
import { getElementId, getInnerText, getStructuredMenu } from '~~/src/shared/utils/htmlParser'

export type TitleTag = 'H1' | 'H2' | 'H3' //| "H4"
export type TitleAndTag = { text: string; tag: TitleTag; id?: string }

export interface StructuredMenuItem {
  text: string
  tag: TitleTag
  id: string | undefined
  child: Array<StructuredMenuItem>
}

export const useHtmlParser = (
  contents: Ref<Article | null>
): {
  structuredMenu: ComputedRef<StructuredMenuItem[] | undefined>
} => {
  const getTitleAndTags = (
    detectTitles: RegExp,
    titleRegExp: RegExp,
    contents: string | undefined
  ): TitleAndTag[] | undefined => {
    const H1s = /(\<(h1)[^\>]*\>).*?(\<\/(h1)\>)/gi
    const H2s = /(\<(h2)[^\>]*\>).*?(\<\/(h2)\>)/gi
    return contents?.match(detectTitles)?.map((it): TitleAndTag => {
      const title = getInnerText(it)
      return {
        text: title?.length ? title : it,
        tag: it.match(H1s) ? 'H1' : it.match(H2s) ? 'H2' : 'H3',
        id: getElementId(it)
      }
    })
  }
  const titles = /\<(h1|h2|h3|h4)[^\>]*\>(.+?)\<\/(h1|h2|h3|h4)\>/gi
  const detectTitles = /\<(h1|h2|h3|h4).*?(h1|h2|h3|h4)\>/gi
  const titleAndTags = computed(() => getTitleAndTags(detectTitles, titles, contents.value?.content))

  const structuredMenu = computed(() => (titleAndTags.value ? getStructuredMenu(titleAndTags.value) : undefined))

  return { structuredMenu }
}
