import path from "path";
import uppercaseFirstLetter from "../../../helpers/uppercaseFirstLetter";
import { defaultDescription } from "../../../configs/core";

const getTitleAndDescription = (
    packageData: Object
): {
    title: string,
    description: string
} => {
    let {
        name: title = "Nest.js app",
        description = "Nest.js server API"
    } = { ...packageData };
    if (!title) {
        title = uppercaseFirstLetter(path.basename(process.cwd()));
    }
    return {
        title: title,
        description: description || `${title} ${defaultDescription}`
    }
}

export default getTitleAndDescription;