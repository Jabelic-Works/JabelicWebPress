import { createClient, MicroCMSListResponse } from 'microcms-js-sdk';
// import { RuntimeConfig } from '@nuxt/schema';

export const useArticle = async (apiKey: string)=>{
    type Article = {
        title:string;
        description: string;
        tags: Array<string> | null,
        to: string
    }
    const getArticleList = async () => {
        try {
            console.debug(apiKey)
            if(!apiKey) return
            const { data, pending, error, refresh } = await useFetch("https://jabelicwebpress.microcms.io/api/v1/blogs", {
                headers:{
                    "X-MICROCMS-API-KEY": apiKey
                }
            })
            return data
            // const client = createClient({ serviceDomain: 'jabelicwebpress', apiKey });
            // const articleList = await client.getList({ endpoint: 'blogs'})
            // return articleList
        } catch (error) {
            console.error(error)
        }
    }

    const articles = ref<Array<Article>>([
        {
            title: "たいとる",
            description: "せつめい",
            tags: ["DevOps", "TypeScript", "Julia"],
            to: '/article/1'
        },
        {
            title: "たいとる2",
            description: "せつめいせつめいせつめいせつめいせつめいせつめいせつめいせつめいせつめいせつめいせつめいせつめいせつめいせつめいせつめいせつめいせつめいせつめい",
            tags: null,
            to: '/article/2'
        }
    ])
    return { articles, getArticleList}
}