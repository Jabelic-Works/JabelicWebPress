import { fetchBlogContent } from "../infra/fetchBlogContents";
import { Article } from "~/src/useCases/article";

/**
 * 
 * @param isObject json形式でcontentsをfetchする場合はtrue, HTML形式ならfalse
 * @returns contents
 */
export const useFetchBlogContent = async (isObject?: boolean):Promise<Article> => {
    const content = await fetchBlogContent(isObject=false)
    return content
}