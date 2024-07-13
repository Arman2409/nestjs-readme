import chalk from "chalk";
import fs from "fs";

const getPackageInfo = () => {
    try {
        // Read package.json from current directory
        const packageData = JSON.parse(fs.readFileSync('./package.json', 'utf8'));
        return packageData;
    } catch (error) {
        console.error(chalk.red("Error reading package.json:", error));
        return { title: "", description: "" };
    }
};


export default getPackageInfo;