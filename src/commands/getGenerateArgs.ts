import { allowedGenerateArgs } from "../../configs/commands";
import removeDuplicates from "./utils/removeDuplicates";

const getGenerateArgs = (
    args: string[]
): string[] | undefined => {
    const genArgs = args.slice(3);

    if (!genArgs) {
        return undefined;
    }

    genArgs.forEach((arg: string) => {
        if (!allowedGenerateArgs.includes(arg.toLowerCase())) {
            throw new Error(`Invalid Generate argument '${arg}'. Use --help for more info.`);
        }
    })

    return removeDuplicates(genArgs);
}

export default getGenerateArgs;