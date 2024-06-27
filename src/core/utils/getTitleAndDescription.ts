import path from "path";
import uppercaseFirstLetter from "../../../helpers/uppercaseFirstLetter";

const getTitleAndDescription = (
    packageData: Object
): {
    title: string,
    description: string
} => {
    let {
        name = "Nest.js app",
        description = "Nest.js server API"
    } = { ...packageData };
    if (!name) {
        name = path.basename(process.cwd());
    }
    return {
        title: uppercaseFirstLetter(name),
        description
    }
}

export default getTitleAndDescription;