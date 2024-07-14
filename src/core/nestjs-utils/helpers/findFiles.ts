import chalk from 'chalk';

import fs from 'fs';
import path from "path";

const findFiles = (
    dir: string,
    ext: string = '.ts',
    fileList: string[] = []
): string[] => {
    try {
        const files = fs.readdirSync(dir);

        files.forEach(file => {
            const filePath = path.join(dir, file);
            if (fs.statSync(filePath).isDirectory()) {
                findFiles(filePath, ext, fileList);
            } else if (filePath.endsWith(ext)) {
                fileList.push(filePath);
            }
        });
        return fileList;
    } catch (err) {
        console.error(chalk.red("Failed to extract files:", err));
        return [];
    }
}

export default findFiles;