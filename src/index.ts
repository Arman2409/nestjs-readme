#!/usr/bin/env node
import getGenerationArgs from "./commands/getGenerationArgs";
import handleInstructions from "./commands/handleInstructions";
import updateReadme from "./commands/updateReadme";

const operation = process.argv[2];

switch (operation) {
    case "generate":
    case "gen":
        const updateArgs = getGenerationArgs(process.argv);
        updateReadme(updateArgs);
        break;
    case "--help":
        handleInstructions("help");
        break;
    case undefined:
        handleInstructions("not-given");
        break;
    default:
        handleInstructions("invalid");
        break;
}
