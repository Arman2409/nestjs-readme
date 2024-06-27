import fs from "fs";

import generateReadmeContent from "../../core/generateReadmeContent";

const updateReadme = (
    operation: "create" | "append",
    readmePath: string,
) => {
    const newContent = generateReadmeContent();
    if (operation === "create") {
        return fs.writeFileSync(readmePath, newContent);
    }
    fs.appendFileSync(readmePath, '\n' + newContent);
}

export default updateReadme;