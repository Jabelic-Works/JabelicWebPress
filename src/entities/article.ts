export interface Article {
    title: string;
    description: string;
    tags: Array<string> | null;
    to: string;
    id: string|number
}
