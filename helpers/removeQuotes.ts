const removeQuotes = (str: string) => {
   return str ? str.slice(1, -1) : "";
}

export default removeQuotes;