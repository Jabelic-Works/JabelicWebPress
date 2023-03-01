import { Category } from "./category";

export interface Article{
    id: string,
    createdAt: string,
    updatedAt: string,
    publishedAt: string,
    revisedAt: string,
    title: string,
    content: string,
    eyecatch: string|null,
    category: Category
}