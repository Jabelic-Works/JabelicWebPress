import { useBlogList } from '~~/src/interactors/blogList'
import { useFetchBlogContent } from '~~/src/interactors/fetchBlogContents'

export default defineNuxtPlugin((nuxtApp) => {
  return {
    provide: {
      getBlogContent: useFetchBlogContent,
      getBlogList: useBlogList
    }
  }
})
