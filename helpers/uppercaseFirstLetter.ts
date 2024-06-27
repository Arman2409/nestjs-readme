const uppercaseFirstLetter = (str: string): string => {
    if(!str) {
        console.error("Non string value received");
        return "";
    }
    return `${str[0].toUpperCase()}${str.slice(1)}`;
}

export default uppercaseFirstLetter;