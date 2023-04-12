export type TitleTag = 'H1' | 'H2' | 'H3' //| "H4"
export type TitleAndTag = { text: string; tag: TitleTag; id?: string }

export interface StructuredMenuItem {
  text: string
  tag: TitleTag
  id: string | undefined
  child: Array<StructuredMenuItem>
}

export const formatTitleAndTagToStructuredMenuItem = (arg: TitleAndTag, _child?: any): StructuredMenuItem => ({
  text: arg.text,
  tag: arg.tag,
  id: arg.id,
  child: _child ?? []
})

// in-source test suites
if (import.meta.vitest) {
  const { it, expect } = import.meta.vitest
  it('formatTitleAndTagToStructuredMenuItem', () => {
    expect(formatTitleAndTagToStructuredMenuItem({ text: 'hoge', tag: 'H1', id: 'thisIsId' }, [])).toStrictEqual({
      text: 'hoge',
      tag: 'H1',
      id: 'thisIsId',
      child: []
    })
  })
}

export const getInnerText = (arg: string) => {
  if (!arg.includes('<') || !arg.includes('>')) return ''
  const begin = arg.split('').findIndex((it: string, index: number) => it === '>')
  const end =
    arg.length -
    arg
      .split('')
      .reverse()
      .findIndex((it: string, index: number) => it === '<')
  if ([begin, end].includes(0)) return ''
  return arg.slice(begin + 1, end - 1)
}

// in-source test suites
if (import.meta.vitest) {
  const { it, expect } = import.meta.vitest
  it('getInnerText', () => {
    expect(getInnerText('hoge')).toBe('')
    expect(getInnerText('<h1>これはタイトルです</h1>')).toBe('これはタイトルです')
    expect(getInnerText('<h2>これはタイトルです</h2>')).toBe('これはタイトルです')
  })
}

export const getElementId = (arg: string) => {
  const ids = /id=["'](.*)["']/gi
  const matches = arg.match(ids)
  if (matches && matches[0]) return matches[0].slice(4, -1)
}

// in-source test suites
if (import.meta.vitest) {
  const { it, expect } = import.meta.vitest
  it('getElementId', () => {
    expect(getElementId('<div id="123"></div>')).toBe('123')
    expect(getElementId("<div id='123'>")).toBe('123')
    expect(getElementId('<div class="id"></div>')).toBe(undefined)
  })
}

/**
 * 引数で渡されたtagを検知するRegExpを返す. ['h1', 'h2']であればその両方を検知するRegExpとなる。
 * @param {Array<string>} tags - tagのリスト。
 * @return {RegExp} /<(h1|h2|...).*?(h1|h2|...)>/gi
 */
export const getHtmlBlocksRegExp = (tags: Array<string>): RegExp => {
  const tagsUnion = tags.join('|')
  // prettier-ignore
  return new RegExp(`<(${tagsUnion}).*?(${tagsUnion})>`, 'gi')
}

// in-source test suites
if (import.meta.vitest) {
  const { it, expect } = import.meta.vitest
  it('getHtmlBlocksRegExp', () => {
    expect(getHtmlBlocksRegExp(['h1'])).toStrictEqual(/<(h1).*?(h1)>/gi)
    expect(getHtmlBlocksRegExp(['h1', 'h2'])).toStrictEqual(/<(h1|h2).*?(h1|h2)>/gi)
  })
}

/**
 * @param detectTitles
 * @param contents
 * @returns detectTitlesにmatchするelement全体の情報を返す。
 */
export const getTitleAndTags = (detectTitles: RegExp, contents: string | undefined): TitleAndTag[] | undefined => {
  const H1s = /(\<(h1)[^\>]*\>).*?(\<\/(h1)\>)/gi
  const H2s = /(\<(h2)[^\>]*\>).*?(\<\/(h2)\>)/gi
  return contents?.match(detectTitles)?.map((it): TitleAndTag => {
    // NOTE: it := <h1 id="hogeid">huga</h1> など.
    const title = getInnerText(it)
    return {
      text: title?.length ? title : it,
      tag: it.match(H1s) ? 'H1' : it.match(H2s) ? 'H2' : 'H3',
      id: getElementId(it)
    }
  })
}
// in-source test suites
if (import.meta.vitest) {
  const { it, expect } = import.meta.vitest
  it('getTitleAndTags', () => {
    expect(
      getTitleAndTags(
        /<(h1|h2).*?(h1|h2)>/gi,
        '<div><h1 id="thisIsH1">hogehuga</h1><h2 id="thisIsH2">piyopiyo</h2></div>'
      )
    ).toStrictEqual([
      { text: 'hogehuga', tag: 'H1', id: 'thisIsH1' },
      { text: 'piyopiyo', tag: 'H2', id: 'thisIsH2' }
    ])
    expect(getTitleAndTags(/<(h1|h2).*?(h1|h2)>/gi, '<div><h1></h1></div>')).toStrictEqual([
      { text: '<h1></h1>', tag: 'H1', id: undefined }
    ])
  })
}

export const getStructuredMenu = (titleAndTags: TitleAndTag[]) => {
  const obj: StructuredMenuItem[] = []
  titleAndTags.forEach((it) => {
    // H1を突っ込む
    if (it.tag === 'H1') {
      obj.push(formatTitleAndTagToStructuredMenuItem(it))
    }
    // H2を突っ込む
    else if (it.tag === 'H2') {
      if (obj.length === 0) {
        obj.push(formatTitleAndTagToStructuredMenuItem({ text: '', tag: 'H1' })) // 空のH1
        if (obj[0]?.child) obj[0].child.push(formatTitleAndTagToStructuredMenuItem(it))
      } else {
        if (obj[obj.length - 1].tag === 'H1') {
          obj[obj.length - 1].child.push(formatTitleAndTagToStructuredMenuItem(it))
        }
      }
    }
    // H3を突っ込む
    else if (it.tag === 'H3') {
      if (obj.length === 0) {
        // H1さえも不在
        obj.push(formatTitleAndTagToStructuredMenuItem({ text: '', tag: 'H1' })) // 空のH1
        if (obj[0]?.child) obj[0].child.push(formatTitleAndTagToStructuredMenuItem({ text: '', tag: 'H2' })) // 空のH2
        if (obj[1]?.child) obj[1].child.push(formatTitleAndTagToStructuredMenuItem(it))
      } else {
        if (obj[obj.length - 1].tag === 'H1') {
          // topレベルにh1がいて
          const h2s = obj[obj.length - 1].child
          if (h2s.length === 0) {
            //h2不在
            // 空のH2を突っ込む
            h2s.push(formatTitleAndTagToStructuredMenuItem({ text: '', tag: 'H2' }))
            // 空のH2のchildにH3を突っ込む
            h2s[0].child.push(formatTitleAndTagToStructuredMenuItem(it))
          } else {
            //h2あり
            h2s[h2s.length - 1].child.push(formatTitleAndTagToStructuredMenuItem(it))
          }
        }
      }
    }
  })
  return obj
}
