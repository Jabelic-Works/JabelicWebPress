import { fetchBlogList } from "~/src/infra/fetchBlogList"
import { ContentsCards } from '~/src/useCases/blogList';
import { useTitleAndDescription } from "../views/composables/titleAndDescription";
import { RouteLocationNormalizedLoaded } from 'vue-router'
import { Locales } from "~/src/shared/i18n/locale";

export const useBlogList = async (config: {apikey:string, enApikey:string, apiEndpoint: string, enApiEndpoint: string}, currentLocale: Locales): Promise<ContentsCards['contents']> => {
    const { extractTitle, extractDescription } = useTitleAndDescription()
    const list = await fetchBlogList(config, currentLocale)
    return list.contents.map((it) =>({
        id: it.id,
        title: extractTitle(it.title),
        updatedAt: it.updatedAt,
        description: extractDescription(it.title),
        tags: [{title: it.category.name}]
    }))
}