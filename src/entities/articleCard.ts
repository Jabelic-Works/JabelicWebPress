export interface ArticleCard {
    title: string;
    description: string;
    tags: Array<{title: string}> | null;
    to: string;
    id: string|number
}
