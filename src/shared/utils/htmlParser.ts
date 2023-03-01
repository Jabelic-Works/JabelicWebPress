import { StructuredMenuItem, TitleAndTag } from "~~/src/shared/composables/htmlParser"

export const formatTitleAndTagToStructuredMenuItem = (arg: TitleAndTag, _child?: any):StructuredMenuItem=>(
    {
        text: arg.text,
        tag: arg.tag,
        id: arg.id,
        child: _child ?? []
    }
)
export const getStructuredMenu = (titleAndTags: TitleAndTag[])=>{
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