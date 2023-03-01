import { locales } from "~~/src/shared/i18n/locale"
import { useLocaleStore } from "~~/store/locale"
import { RuntimeConfig } from '@nuxt/schema';
import { Article } from "~~/adapter/article";

/**
 * 
 * @param isObject json形式でcontentsをfetchする場合はtrue, HTML形式ならfalse
 * @returns contents
 */
export const useFetchBlogContent = async (isObject?: boolean) => {
    const config:RuntimeConfig = useRuntimeConfig()
    const store = useLocaleStore()
    const route = useRoute()
    const { data: contents, pending, error, refresh } = await useFetch<Article>(
        store.getLocale === locales.ja ?
        config.apiEndpoint +`/${route.params.id}` :
        config.enApiEndpoint +`/${route.params.id}`,
        {
            query: {
                richEditorFormat: isObject ? 'object' : 'html'
            },
            headers:{
                "X-MICROCMS-API-KEY":
                store.getLocale === locales.ja ? config.apikey : config.enApikey
            }
        })
    return contents
}