import { fetchBlogList } from "~/src/infra/fetchBlogList"


export const useBlogList = async ()=> {
    const list = await fetchBlogList()
    console.debug("list::",list)
    return list
}