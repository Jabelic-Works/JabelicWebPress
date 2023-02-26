import { locales } from "~~/i18n/locale"
import { useLocaleStore } from "~~/store/locale"
import { RuntimeConfig } from '@nuxt/schema';
import { MicroCMSListResponse } from 'microcms-js-sdk/dist/cjs/types';
import { _fetch } from "~~/src/shared/utils/fetch";

// API, ACL


export const fetchBlogList = async ():Promise<MicroCMSListResponse<any>> => {
    const config:RuntimeConfig = useRuntimeConfig()
    const store = useLocaleStore()
    // FIXME: define fields types(union)
    const params = {
        fields: "id,title,main_image,updatedAt,author.name"
    }
    // FIXME: locale option in argument
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
    const res = await _fetch<MicroCMSListResponse<any>>(endpoint, options)
    return res
}