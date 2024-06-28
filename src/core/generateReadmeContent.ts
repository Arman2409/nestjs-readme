import extractControllers from "./nestjs-utils/extractControllers";
import getPackageInfo from "./extract-utils/getPackageInfo";
import getTitleAndDescription from "./extract-utils/getTitleAndDescription";
import listControllers from "./markdown-utils/listControllers";
import getCommandsContent from "./markdown-utils/addCommands";

const generateReadmeContent = () => {
    const packageInfo = getPackageInfo();
    const metaData = getTitleAndDescription(packageInfo);
    const controllersData = extractControllers();

    return (
`# ${metaData?.title}
  
## Description
${metaData?.description}

${listControllers(controllersData)}
${getCommandsContent()}
`
    )
}

export default generateReadmeContent;