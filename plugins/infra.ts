import { useBlogList } from '~~/src/interactors/blogList'
import { useFetchBlogContent } from '~~/src/interactors/blogContents'

export default defineNuxtPlugin((_) => {
  return {
    provide: {
      getBlogContent: useFetchBlogContent,
      getBlogList: useBlogList
    }
  }
})
