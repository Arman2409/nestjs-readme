import path from "path";

import uppercaseFirstLetter from "../../../helpers/uppercaseFirstLetter";
import { defaultDescription } from "../../../configs/core";
import titleStyles from "../../../styles/text";

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
    return `<h1 style="${titleStyles.title1}">${uppercaseFirstLetter(title)}</h1>
  
<h2 style="${titleStyles.title2}">📖 ${description || `${title} ${defaultDescription}`}</h3>

`
}
export default addTitleAndDescription;