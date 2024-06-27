const truncateString = (
    str?: string,
    length: number = 10,
    dots: boolean = true): string => {
    if (!str) return "";
    str = str.trim();
    // return the string itself if it doesn't exceed the given size
    if (str.length < length) return str;
    return str.slice(0, length) + (dots ? "..." : "");
};

export default truncateString;