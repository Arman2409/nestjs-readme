const removeQuotes = (
   str: string
):string => {
   return str ? str.slice(1, -1) : "";
}

export default removeQuotes;