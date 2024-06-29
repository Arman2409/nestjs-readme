import fs from "fs";
import path from "path";

import generateReadmeContent from "../../core/generateReadmeContent";
import uppercaseFirstLetter from "../../../helpers/uppercaseFirstLetter";

const applyNewContent = (
    operation: "create" | "append" | "replace",
    readmePath: string,
    args?: string[]
): void => {
    const newContent = generateReadmeContent(args);
    if (operation === "create" || operation === "replace") {
        fs.writeFileSync(readmePath, newContent);
    } else {
        fs.appendFileSync(readmePath, '\n' + newContent);
    }
    const operationName = uppercaseFirstLetter(operation + (operation.endsWith("e") ? "d" : "ed"));
    console.log(`${operationName} ${path.basename(readmePath)}`);
}

export default applyNewContent;