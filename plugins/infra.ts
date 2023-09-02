import { useBlogList } from '~~/src/interactors/blogList'
import { useFetchBlogContent } from '~~/src/interactors/blogContents'

interface IApi {
  getBlogContent: typeof useFetchBlogContent
  getBlogList: typeof useBlogList
}

declare module '#app' {
  interface NuxtApp {
    $api: IApi
  }
}

export default defineNuxtPlugin((): { provide: { api: IApi } } => {
  const modules: IApi = {
    getBlogContent: useFetchBlogContent,
    getBlogList: useBlogList
  }
  return {
    provide: { api: modules }
  }
})
