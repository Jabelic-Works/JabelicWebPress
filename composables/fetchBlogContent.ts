import { locales } from "~~/i18n/locale"
import { useLocaleStore } from "~~/store/locale"
import { RuntimeConfig } from '@nuxt/schema';
import { MicroCMSListResponse } from 'microcms-js-sdk/dist/cjs/types';
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
        "https://jabelicwebpress.microcms.io/api/v1/blogs"  +`/${route.params.id}` :
        "https://jabelicwebpressen.microcms.io/api/v1/blogs" +`/${route.params.id}`,
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