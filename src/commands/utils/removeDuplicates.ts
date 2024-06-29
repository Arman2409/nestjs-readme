const removeDuplicates = (arr: any) => arr.filter(
    (
        item: any,
        index: number
    ) => arr.indexOf(item) === index
);

export default removeDuplicates;