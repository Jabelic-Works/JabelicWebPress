import { locales } from "~~/i18n/locale"
import { useLocaleStore } from "~~/store/locale"
import { RuntimeConfig } from '@nuxt/schema';
import { MicroCMSListResponse } from 'microcms-js-sdk/dist/cjs/types';
import { _fetch } from "~/src/utils/fetch";

export const fetchBlogList = async () => {
    const config:RuntimeConfig = useRuntimeConfig()
    const store = useLocaleStore()
    const params = {
        fields: "id,title,main_image,updatedAt,author.name"
    }
    const endpoint = store.getLocale === locales.ja ?
        "https://jabelicwebpress.microcms.io/api/v1/blogs" :
        "https://jabelicwebpressen.microcms.io/api/v1/blogs"
    const options = {
        headers:{
                    "X-MICROCMS-API-KEY":
                    store.getLocale === locales.ja ? config.apikey : config.enApikey
                },
                params
    }
    const res = await _fetch(endpoint, options)
    return res
}