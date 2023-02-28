import { locales } from "~~/i18n/locale"
import { useLocaleStore } from "~~/store/locale"
import { RuntimeConfig } from '@nuxt/schema';
import { MicroCMSListResponse } from 'microcms-js-sdk/dist/cjs/types';
import { _fetch } from "~~/src/shared/utils/fetch";

// API, ACL


export const fetchBlogList = async ():Promise<MicroCMSListResponse<{id: string, title: string, updatedAt: string, category: string}>> => {
    const config:RuntimeConfig = useRuntimeConfig()
    const store = useLocaleStore()
    // FIXME: locale option in argument
    const endpoint = store.getLocale === locales.ja ?
        "https://jabelicwebpress.microcms.io/api/v1/blogs" :
        "https://jabelicwebpressen.microcms.io/api/v1/blogs"
    const options = {
        headers:{
            "X-MICROCMS-API-KEY":
            store.getLocale === locales.ja ? config.apikey : config.enApikey
        },
    }
    // FIXME: define fields types(union)
    const params = {
        fields: "id,title,main_image,updatedAt,author.name,category"
    }
    const res = await _fetch<MicroCMSListResponse<{id: string, title: string, updatedAt: string, category: string}>>({url: endpoint, params, options})
    return res
}