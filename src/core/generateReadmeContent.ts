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
    
    // Add title and description 
    const packageInfo = getPackageInfo();
    if(packageInfo){
        readmeString += addTitleAndDescription(packageInfo);
    }

    // Add Endpoints from Controllers 
    const controllersData = extractControllers();
    if(controllersData) {
        readmeString += listControllers(controllersData);
    }

    // Add environment variables 
    const envVariables = getEnvVariables();
    if(envVariables) {
        readmeString += addEnvVariables(envVariables);
    }

    // Add Commands 
    if(packageInfo){
        readmeString += addCommands(packageInfo);
    }

    return readmeString;
}

export default generateReadmeContent;