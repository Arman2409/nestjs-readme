const getNewReadmePath = (
    readmePath: string
): string => {
    const timestamp = new Date().toISOString().replace(/[-:]/g, '').replace('T', '_').split('.')[0];
    return readmePath.slice(0, -3) + `_${timestamp}.md`;
}

export default getNewReadmePath;