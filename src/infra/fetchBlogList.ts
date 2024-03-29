import { Locales, locales } from '~~/src/shared/i18n/locale'
import { MicroCMSListResponse } from 'microcms-js-sdk/dist/cjs/types'
import { _fetch } from '~~/src/shared/utils/fetch'
import { Category } from '~/src/entities/category'
// API, ACL

// FIXME: categoryは配列？
export const fetchBlogList = async (
  config: {
    apiKey: string
    enApiKey: string
    apiEndpoint: string
    enApiEndpoint: string
  },
  currentLocale: Locales
): Promise<MicroCMSListResponse<{
  id: string
  title: string
  updatedAt: string
  category: Category
}>> => {
  const endpoint = currentLocale === locales.ja ? config.apiEndpoint : config.enApiEndpoint
  const options = {
    headers: {
      'X-MICROCMS-API-KEY': currentLocale === locales.ja ? config.apiKey : config.enApiKey
    }
  }
  // FIXME: define types(union)
  const params = {
    fields: 'id,title,main_image,updatedAt,author.name,category'
  }
  const res = await _fetch<
    MicroCMSListResponse<{
      id: string
      title: string
      updatedAt: string
      category: Category
    }>
  >({ url: endpoint, params, options })
  return res
}
