import { fetchBlogContent } from '../infra/fetchBlogContents'
import { Article } from '~/src/useCases/article'
import { Locales } from '~/src/shared/i18n/locale'

/**
 *
 * @param isObject json形式でcontentsをfetchする場合はtrue, HTML形式ならfalse
 * @returns contents
 */
export const useFetchBlogContent = async (
  id: string | string[],
  currentLocale: Locales,
  config: {
    apiKey: string
    enApiKey: string
    apiEndpoint: string
    enApiEndpoint: string
  },
  isObject?: boolean
): Promise<Article> => {
  const content = await fetchBlogContent(id, currentLocale, config, isObject)
  return content
}
