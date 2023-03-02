import { Locales, locales } from "~~/src/shared/i18n/locale"
import { useLocaleStore } from "~~/store/locale"
import { RuntimeConfig } from '@nuxt/schema';
import { _fetch } from "~/src/shared/utils/fetch";
import { Article } from "~/src/useCases/article";
import { RouteLocationNormalizedLoaded } from 'vue-router'

/**
 * 
 * @param isObject json形式でcontentsをfetchする場合はtrue, HTML形式ならfalse
 * @returns contents
 */
export const fetchBlogContent = async (id: string | string[], currentLocale: Locales, config: {apikey:string, enApikey:string, apiEndpoint: string, enApiEndpoint: string}, isObject?: boolean) => {
    const options = {
        query: {
            richEditorFormat: isObject ? 'object' : 'html'
        },
        headers:{
            "X-MICROCMS-API-KEY":
            currentLocale === locales.ja ? config.apikey : config.enApikey
        }
    }
    const endpoint = currentLocale === locales.ja ? config.apiEndpoint +`/${id}` : config.enApiEndpoint +`/${id}`
    const res = await _fetch<Article>({url: endpoint, options})
    return res
}