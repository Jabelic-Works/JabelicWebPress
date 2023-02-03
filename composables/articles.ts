
export const useArticle = ()=>{
    type Article = {
        title:string;
        description: string;
        tags: Array<string> | null,
        to: string
    }
    const articles = ref<Array<Article>>([
        {
            title: "たいとる",
            description: "せつめい",
            tags: null,
            to: '/article/1'
        },
        {
            title: "たいとる2",
            description: "せつめいせつめいせつめいせつめいせつめいせつめいせつめいせつめいせつめいせつめいせつめいせつめいせつめいせつめいせつめいせつめいせつめいせつめい",
            tags: null,
            to: '/article/2'
        }
    ])
    return {articles}
}