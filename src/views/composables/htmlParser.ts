import { Ref } from "@vue/runtime-dom";
import { Article } from "~/src/useCases/article";
import { getStructuredMenu } from "~~/src/shared/utils/htmlParser";


export type TitleTag = "H1" | "H2" | "H3" //| "H4"
export type TitleAndTag = {text: string, tag: TitleTag, id?: string}

export interface StructuredMenuItem {
    text: string;
    tag: TitleTag;
    id: string|undefined;
    child: Array<StructuredMenuItem>
}


export const useHtmlParser = (contents: Ref<Article|null>): {
    structuredMenu : StructuredMenuItem[]|undefined
}=> {
    const getTitle = (arg: string)=>{
        let begin = 0;
        let end = 0;
        for(let i = 0;i < arg.length; i++){
            if(arg[i] === ">" && begin===0) begin = i
        }
        for(let i = arg.length - 1; i > 0; i--){
            if(arg[i] === "<" && end===0) end = i
        }
        return arg.slice(begin+1, end)
    }
    const getId = (arg: string)=>{
        const ids = /id="(.*)"/gi
        const matches = arg.match(ids);
        if(matches && matches[0]) return matches[0].slice(4, -1)
    }
    const getTitleAndTags = (detectTitles: RegExp, titleRegExp: RegExp, contents: string|undefined):TitleAndTag[] | undefined =>{
        const H1s = /(\<(h1)[^\>]*\>).*?(\<\/(h1)\>)/gi
        const H2s = /(\<(h2)[^\>]*\>).*?(\<\/(h2)\>)/gi
        return contents?.match(detectTitles)?.map((it): TitleAndTag => {
            const title = getTitle(it)
            return {
                text: title?.length ? title : it,
                tag: it.match(H1s) ? "H1" : it.match(H2s) ? "H2" : "H3",
                id: getId(it)
            }
        })
    }
    const titles = /\<(h1|h2|h3|h4)[^\>]*\>(.+?)\<\/(h1|h2|h3|h4)\>/gi
    const detectTitles = /\<(h1|h2|h3|h4).*?(h1|h2|h3|h4)\>/ig
    const titleAndTags = getTitleAndTags(detectTitles, titles, contents.value?.content)

    const structuredMenu = titleAndTags ? getStructuredMenu(titleAndTags) : undefined

    return { structuredMenu }
}