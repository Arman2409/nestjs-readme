import fs from "fs";
import path from "path";
import readline from "readline";

import applyNewContent from "./utils/applyNewContent";

let readmePath = path.join(process.cwd(), 'README.md');

const checkForReadme = () => {
    if (fs.existsSync(readmePath)) {
        const rl = readline.createInterface({
            input: process.stdin,
            output: process.stdout
        });

        rl.question('README.md already exists. What would you like to do? (append/create/replace):',
            (answer) => {
                if (answer.toLowerCase() === 'append') {
                    applyNewContent("append", readmePath);
                } else {
                    if(answer === "create") {
                        const timestamp = new Date().toISOString().replace(/[-:]/g, '').replace('T', '_').split('.')[0];
                        readmePath = readmePath.slice(0, -3) + `_${timestamp}.md`
                    }
                    applyNewContent("create", readmePath);
                }
                rl.close();
            });
    } else {
        applyNewContent("create", readmePath);
    }
}

export default checkForReadme;