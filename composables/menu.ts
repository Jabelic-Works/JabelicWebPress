import { Ref } from "nuxt/dist/app/compat/capi"
import { Article } from '@/adapter/article';
import { StructuredMenuItem, TitleTag } from "~~/adapter/menu";
type TitleAndTag = {text: string, tag: TitleTag, id?: string}

export const useMenu = (contents: Ref<Article|null>) => {
    const menu = useState<{ isOpen: boolean }>('menu', () => ({
        isOpen: false
    }))
    const openMenu = ()=> menu.value.isOpen = true
    const closeMenu = ()=> menu.value.isOpen = false

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

    const formatTitleAndTagToStructuredMenuItem = (arg: TitleAndTag, _child?: any):StructuredMenuItem=>(
        {
            text: arg.text,
            tag: arg.tag,
            id: arg.id,
            child: _child ?? []
        }
    )

    const getStructuredMenu = (titleAndTags: TitleAndTag[])=>{
        let obj: StructuredMenuItem[] = []
        titleAndTags.forEach((it)=>{
            // H1を突っ込む
            if(it.tag==="H1"){
                obj.push(formatTitleAndTagToStructuredMenuItem(it))
            }
            // H2を突っ込む
            else if(it.tag==="H2"){
                if(obj.length===0){
                    obj.push(formatTitleAndTagToStructuredMenuItem({text: "", tag: "H1"})) // 空のH1
                    if(obj[0]?.child) obj[0].child.push(formatTitleAndTagToStructuredMenuItem(it))
                }else{
                    if(obj[obj.length-1].tag==="H1"){
                        obj[obj.length-1].child.push(formatTitleAndTagToStructuredMenuItem(it))
                    }
                }
            }
            // H3を突っ込む
            else if(it.tag==="H3"){
                if(obj.length===0){// H1さえも不在
                    obj.push(formatTitleAndTagToStructuredMenuItem({text: "", tag: "H1"})) // 空のH1
                    if(obj[0]?.child) obj[0].child.push(formatTitleAndTagToStructuredMenuItem({text: "", tag: "H2"})) // 空のH2
                    if(obj[1]?.child) obj[1].child.push(formatTitleAndTagToStructuredMenuItem(it))
                }else{
                    if(obj[obj.length-1].tag==="H1"){// topレベルにh1がいて
                        const h2s = obj[obj.length-1].child
                        if(h2s.length===0){ //h2不在
                            // 空のH2を突っ込む
                            h2s.push(formatTitleAndTagToStructuredMenuItem({text: "", tag: "H2"})) 
                            // 空のH2のchildにH3を突っ込む
                            h2s[0].child.push(formatTitleAndTagToStructuredMenuItem(it))
                        }
                        else{ //h2あり
                            h2s[h2s.length-1].child.push(formatTitleAndTagToStructuredMenuItem(it))
                        }
                    }
                }
            }
        })
        return obj
    }

    const structuredMenu = titleAndTags ? getStructuredMenu(titleAndTags) : undefined

    const menuContent = ref(["a", "b", "c"])

    return { menu ,openMenu, closeMenu, menuContent, structuredMenu}
}