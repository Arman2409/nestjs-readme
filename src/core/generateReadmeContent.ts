import extractControllers from "./nestjs-utils/extractControllers";
import getPackageInfo from "./extract-utils/getPackageInfo";
import addTitleAndDescription from "./markdown-utils/addTitleAndDescription";
import listControllers from "./markdown-utils/listControllers";
import addCommands from "./markdown-utils/addCommands";
import getEnvVariables from "./extract-utils/getEnvVariables";
import addEnvVariables from "./markdown-utils/addEnvVariables";
import type { GenerateArgs } from "../../types/commands";

const generateReadmeContent = (args?: GenerateArgs) => {
    let readmeString = ""
    
    const packageInfo = getPackageInfo();
    readmeString += addTitleAndDescription(packageInfo);

    const controllersData = extractControllers();
    readmeString += listControllers(controllersData);

    const envVariables = getEnvVariables();
    readmeString += addEnvVariables(envVariables);

    readmeString += addCommands();

    return readmeString;
}

export default generateReadmeContent;