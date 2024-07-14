import chalk from "chalk";
import fs from "fs";

import hasScript from "./utils/hasScript";
import titleStyles from "../../../../styles/text";
import type { Script } from "../../../../types/core";


const addScriptsGroup = (
    groupName: string,
    scripts: Script[],
    packageJson: JSON) => {
    try {
        let foundScripts: Script[] = [];
        for(const {tag, isDefault, command} of scripts) {
            if (hasScript(packageJson, command) || isDefault) {
                foundScripts.push({
                    tag,
                    command
                });
            }
        }
        if(foundScripts.length === 0) {
            return "";
        }
        let groupContent = `
<h3 style="${titleStyles.title3}">${groupName}</h3>

\`\`\`bash`;
        foundScripts.forEach(({tag, command}: Script) => {
                if (tag) {
                    groupContent += `\n # ${tag}`;
                }
                groupContent += `\n npm run ${command}`;
        })
        groupContent += `\n\`\`\``
        return groupContent;
    } catch (error) {
        console.error(chalk.red('Error reading package.json:', error));
    }

}

export default addScriptsGroup;