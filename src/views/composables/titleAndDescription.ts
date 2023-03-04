export const useTitleAndDescription = () => {
  const extractTitle = (arg: string) => {
    return arg.split(';')[0]
  }
  const extractDescription = (arg: string) => {
    const contents = arg.split(';')
    return contents.length > 1 ? contents[1] : ''
  }
  return { extractTitle, extractDescription }
}
