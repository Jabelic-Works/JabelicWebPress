type Options = {
  method?: 'GET' | 'POST' | 'UPDATE'
  headers?: {
    [key in string]: string
  }
  params?: {
    [key in string]: string
  }
  body?: string
}

export const _fetch = async <T>({
  url,
  params,
  options
}: {
  url: string
  params?: { [key in string]: string }
  options?: Options
}): Promise<T> => {
  const queryParameter = params ? (url += `?${(Object.keys(params)[0] = params[Object.keys(params)[0]])}`) : ''
  const res = await fetch(url, options).then<T>((res) => res.json())
  return res
}
