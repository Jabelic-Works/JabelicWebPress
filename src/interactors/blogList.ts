import { fetchBlogList } from "~/src/infra/fetchBlogList"
import { ContentsCards } from '~/src/useCases/blogList';

const extractTitle = (arg:string)=>{
    return arg.split(';')[0]
}
const extractDescription = (arg:string)=>{
    const contents = arg.split(';')
    return contents.length > 1 ? contents[1] : ''
}

export const useBlogList = async (): Promise<ContentsCards['contents']> => {
    const list = await fetchBlogList()
    return list.contents.map((it) =>({
        id: it.id,
        title: extractTitle(it.title),
        updatedAt: it.updatedAt,
        description: extractDescription(it.title),
        tag: [it.category]
    }))
}