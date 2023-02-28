
export interface ContentsCards {
    contents: Array<{
        title: string
        id: string | number 
        description: string
        tag: Array<string>
        updatedAt: string
    }>
}