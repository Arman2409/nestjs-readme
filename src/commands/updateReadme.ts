import fs from "fs";
import path from "path";
import readline from "readline";

import applyNewContent from "./utils/applyNewContent";
import getNewReadmePath from "./utils/getNewReadmePath";

let readmePath = path.join(process.cwd(), 'README.md');

const checkForReadme = (args?: string[]):void => {
    if (fs.existsSync(readmePath)) {
        const rl = readline.createInterface({
            input: process.stdin,
            output: process.stdout
        });

        rl.question('README.md already exists. What would you like to do? (append(a)/create(c)/replace(r)/exit(e)):',
            (answer) => {
                const normalizedAnswer = answer.toLowerCase().trim(); // Normalize input

                switch (normalizedAnswer) {
                    case 'append':
                    case 'a':
                        applyNewContent("append", readmePath, args);
                        rl.close();
                        break;
                    case 'create':
                    case 'c':
                        applyNewContent("create", getNewReadmePath(readmePath), args);
                        rl.close();
                        break;
                    case 'replace':
                    case 'r':
                        applyNewContent("replace", readmePath, args);
                        rl.close();
                        break;
                    case 'exit':
                    case 'e':
                        rl.close();
                        break;
                    default:
                        console.error("\nInvalid operation name, please try again");
                        checkForReadme();
                        break;
                }
            });
    } else {
        applyNewContent("create", readmePath);
    }
}

export default checkForReadme;