export type TitleTag = "H1" | "H2" | "H3" | "H4"
export interface StructuredMenuItem {
    text: string;
    tag: TitleTag;
    id: string|undefined;
    child: Array<StructuredMenuItem>
}