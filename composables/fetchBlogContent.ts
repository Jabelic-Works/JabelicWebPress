import { locales } from "~~/model/locale"
import { useLocaleStore } from "~~/store/locale"
import { RuntimeConfig } from '@nuxt/schema';
import { MicroCMSListResponse } from 'microcms-js-sdk/dist/cjs/types';
import { Article } from "~~/adapter/article";

export const useFetchBlogContent = async () => {
    const config:RuntimeConfig = useRuntimeConfig()
    const store = useLocaleStore()
    const route = useRoute()
    const { data: contents, pending, error, refresh } = await useFetch<Article>(
        store.getLocale === locales.ja ?
        "https://jabelicwebpress.microcms.io/api/v1/blogs"  +`/${route.params.id}` :
        "https://jabelicwebpressen.microcms.io/api/v1/blogs" +`/${route.params.id}`,
        {
        headers:{
            "X-MICROCMS-API-KEY":
            store.getLocale === locales.ja ? config.apikey : config.enApikey
        }
    })
    return contents
}