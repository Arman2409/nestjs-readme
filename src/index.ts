#!/usr/bin/env node
import getGenerateArgs from "./commands/getGenerateArgs";
import handleInstructions from "./commands/handleInstructions";
import updateReadme from "./commands/updateReadme";

const operation = process.argv[2];

switch (operation) {
    case "generate":
    case "gen":
        const updateArgs = getGenerateArgs(process.argv);
        updateReadme(updateArgs);
        break;
    case "--help":
        handleInstructions("help");
        break;
    case undefined:
        handleInstructions("notGiven");
        break;
    default:
        handleInstructions("invalid");
        break;
}
