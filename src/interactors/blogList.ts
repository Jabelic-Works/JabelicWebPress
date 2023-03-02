import { fetchBlogList } from "~/src/infra/fetchBlogList"
import { ContentsCards } from '~/src/useCases/blogList';
import { useTitleAndDescription } from "../views/composables/titleAndDescription";


export const useBlogList = async (): Promise<ContentsCards['contents']> => {
    const { extractTitle, extractDescription } = useTitleAndDescription()
    const list = await fetchBlogList()
    return list.contents.map((it) =>({
        id: it.id,
        title: extractTitle(it.title),
        updatedAt: it.updatedAt,
        description: extractDescription(it.title),
        tags: [{title: it.category.name}]
    }))
}