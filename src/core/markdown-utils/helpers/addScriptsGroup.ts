import fs from "fs";

import hasScript from "./utils/hasScript";
import type { Script } from "../../../../types/core";

const addScriptsGroup = (
    groupName: string,
    scripts: Script[]) => {

    try {
        const packageJsonData = fs.readFileSync("./package.json", 'utf-8');
        const packageJson = JSON.parse(packageJsonData);
        let groupContent = `
## ${groupName}

\`\`\`bash`;
        scripts.forEach(({tag, command, isDefault}: Script) => {
            if (hasScript(packageJson, command) || isDefault) {
                if (tag) {
                    groupContent += `\n # ${tag}`;
                }
                groupContent += `\n npm run ${command}`;
            }
        })
        groupContent += `\n\`\`\``
        return groupContent;
    } catch (error) {
        console.error('Error reading package.json:', error);
    }

}

export default addScriptsGroup;