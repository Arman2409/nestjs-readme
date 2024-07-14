import chalk from "chalk"
import fs from "fs";
import path from "path";

import { cautionText } from "../../../configs/commands";
import generateReadmeContent from "../../core/generateReadmeContent";
import uppercaseFirstLetter from "../../../helpers/uppercaseFirstLetter";
import getNewReadmePath from "./getNewReadmePath";
import type { GenerateArgs } from "../../../types/commands";

const applyNewContent = (
    operation: "create" | "append" | "replace",
    readmePath: string,
    args?: GenerateArgs,
    timestamp?: boolean
): void => {
    if(operation === "create" && timestamp) {
        readmePath = getNewReadmePath(readmePath);
    }
    const newContent = generateReadmeContent(args);
    if (operation === "create" || operation === "replace") {
        fs.writeFileSync(readmePath, newContent);
    } else {
        fs.appendFileSync(readmePath, '\n' + newContent);
    }
    const operationName = uppercaseFirstLetter(operation + (operation.endsWith("e") ? "d" : "ed"));
    console.log(chalk.green(`${operationName} ${path.basename(readmePath)}`));
    console.log(cautionText);
}

export default applyNewContent;