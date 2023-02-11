import { locales } from "~~/model/locale"
import { useLocaleStore } from "~~/store/locale"
import { RuntimeConfig } from '@nuxt/schema';
import { MicroCMSListResponse } from 'microcms-js-sdk/dist/cjs/types';

export const useFetchBlogList = async () => {
    const config:RuntimeConfig = useRuntimeConfig()
    const store = useLocaleStore()
    const params = {
        fields: "id,title,main_image,updatedAt,author.name"
    }
    const { data: contents, pending, error, refresh } = await useFetch<MicroCMSListResponse<any>>(
        store.getLocale === locales.ja ?
        "https://jabelicwebpress.microcms.io/api/v1/blogs" :
        "https://jabelicwebpressen.microcms.io/api/v1/blogs",
        {
        headers:{
            "X-MICROCMS-API-KEY":
            store.getLocale === locales.ja ? config.apikey : config.enApikey
        },
        params
    })
    return contents
}