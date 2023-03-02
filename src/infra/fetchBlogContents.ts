import { locales } from "~~/src/shared/i18n/locale"
import { useLocaleStore } from "~~/store/locale"
import { RuntimeConfig } from '@nuxt/schema';
import { _fetch } from "~/src/shared/utils/fetch";
import { Article } from "~/src/useCases/article";

/**
 * 
 * @param isObject json形式でcontentsをfetchする場合はtrue, HTML形式ならfalse
 * @returns contents
 */
export const fetchBlogContent = async (isObject?: boolean) => {
    const config:RuntimeConfig = useRuntimeConfig()
    const store = useLocaleStore()
    const route = useRoute()

    const options = {
        query: {
            richEditorFormat: isObject ? 'object' : 'html'
        },
        headers:{
            "X-MICROCMS-API-KEY":
            store.getLocale === locales.ja ? config.apikey : config.enApikey
        }
    }
    const endpoint = store.getLocale === locales.ja ?
    config.apiEndpoint +`/${route.params.id}` :
    config.enApiEndpoint +`/${route.params.id}`

    const res = await _fetch<Article>({url: endpoint, options})
    return res
}