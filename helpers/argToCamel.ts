const argToCamel = (
    str: string
):string => {
    const camelCase = str
    .toLowerCase()
    .replace(/-([a-z])/g, (match, letter) => letter.toUpperCase())
    .slice(1)
    return camelCase.slice(0, 1).toLowerCase() + camelCase.slice(1)
}
export default argToCamel;