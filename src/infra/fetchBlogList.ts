import { locales } from "~~/src/shared/i18n/locale"
import { useLocaleStore } from "~~/store/locale"
import { RuntimeConfig } from '@nuxt/schema';
import { MicroCMSListResponse } from 'microcms-js-sdk/dist/cjs/types';
import { _fetch } from "~~/src/shared/utils/fetch";

// API, ACL
type Category = {
    createdAt: string,
    id: string,
    name: string,
    publishedAt: string,
    revisedAt: string,
    updatedAt: string
}
// FIXME: categoryは配列？
export const fetchBlogList = async ():Promise<MicroCMSListResponse<{id: string, title: string, updatedAt: string, category: Category}>> => {
    const config:RuntimeConfig = useRuntimeConfig()
    const store = useLocaleStore()
    // FIXME: locale option in argument
    const endpoint = store.getLocale === locales.ja ?
        config.apiEndpoint:
        config.enApiEndpoint
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
    const res = await _fetch<MicroCMSListResponse<{id: string, title: string, updatedAt: string, category: Category}>>({url: endpoint, params, options})
    return res
}