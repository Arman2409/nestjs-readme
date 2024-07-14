import chalk from "chalk";
import fs from "fs";
import path from "path";
import readline from "readline";

import { readmeExistingQuestion } from "../../configs/commands";
import applyNewContent from "./utils/applyNewContent";
import type { GenerateArgs } from "../../types/commands";

let readmePath = path.join(process.cwd(), 'README.md');

const updateReadme = (
    args?: GenerateArgs
): void => {
    if (args?.existsCommand) {
       if(args?.existsCommand === "append" || args?.existsCommand === "replace") {
         if (!fs.existsSync(readmePath)) {
            throw new Error(`Can not implement operation '${args?.existsCommand}', README.md file doesn't exist.`)
         }
       }
       return applyNewContent(args?.existsCommand, readmePath, args);
    }
    if (fs.existsSync(readmePath)) {
        const rl = readline.createInterface({
            input: process.stdin,
            output: process.stdout
        });

        rl.question(readmeExistingQuestion,
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
                        applyNewContent("create", readmePath, args, true);
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
                        console.error(chalk.red("\nInvalid operation name, please try again"));
                        updateReadme();
                        break;
                }
            });
    } else {
        applyNewContent("create", readmePath, args);
    }
}

export default updateReadme;