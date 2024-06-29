import path from "path";
import uppercaseFirstLetter from "../../../helpers/uppercaseFirstLetter";
import { defaultDescription } from "../../../configs/core";

const addTitleAndDescription = (
    packageData: Object
): string => {
    let {
        name: title = "Nest.js app",
        description = "Nest.js server API"
    } = { ...packageData };
    if (!title) {
        title = path.basename(process.cwd());
    }
    return `# ${uppercaseFirstLetter(title)}
  
## Description
${description || `${title} ${defaultDescription}`}
`
}
export default addTitleAndDescription;