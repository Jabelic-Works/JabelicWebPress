import { Tag } from "~/src/entities/tag"

export interface ContentsCards {
    contents: Array<{
        title: string
        id: string | number 
        description: string
        tags: Array<Tag>|null
        updatedAt: string
    }>
}