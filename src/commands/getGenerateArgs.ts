import { allowedBoolArgs, existsCommands } from "../../configs/commands";
import argToCamel from "../../helpers/argToCamel";
import type { ExistsCommand, GenerateArgs } from "../../types/commands";

const getGenerateArgs = (
    args: string[]
): GenerateArgs | undefined => {
    const genArgs = args.slice(3);
    const result: GenerateArgs = {};

    if (!genArgs) {
        return undefined;
    }

    genArgs.forEach((
        arg: string,
        index: number) => {
        const lowerArg = arg.toLowerCase();
        if (allowedBoolArgs.includes(arg)) {
            result[argToCamel(lowerArg)] = true;
        } else if (lowerArg.startsWith('--modules-path')) {
            const path = genArgs[index + 1];
            if (!path || path.startsWith("--")) {
                throw new Error(`Missing or invalid value for '${arg}' argument.`);
            }
            result.modulesPath = path;
        } else if (existsCommands.includes(lowerArg)) {
            result.existsCommand = lowerArg.slice(2) as ExistsCommand;
        } else if (existsCommands.map((command: string) => command.slice(0, 3)).includes(lowerArg)) {
            result.existsCommand = existsCommands.find((command: string) => command.startsWith(lowerArg))?.slice(2) as ExistsCommand;
        } else if (!(genArgs[index - 1] === "--modules-path")) {
            throw new Error(`Invalid Generate argument '${arg}'. Use --help for more info.`);
        }
    });

    return result;
}

export default getGenerateArgs;