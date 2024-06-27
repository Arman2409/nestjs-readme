import { installation, testing } from "../../data/readme-parts";
import extractModules from "./nestjs-utils/extractModules";
import getPackageInfo from "./utils/getPackageInfo";
import getTitleAndDescription from "./utils/getTitleAndDescription";

const generateReadmeContent = () => {
    const packageInfo = getPackageInfo();

    const metaData = getTitleAndDescription(packageInfo);
   

    // Here you can add logic to generate the content based on the NestJS project
    return (
        `# ${metaData?.title}
  
## Description
${metaData?.description}

${installation}
${testing}
`
    )
}

export default generateReadmeContent;