import titleStyles from "../../../styles/text";
import { ControllerDetails } from "../../../types/core";
import getControllerText from "./helpers/getControllerText";

const listControllers = (controllersData: ControllerDetails[]) => {
    if(!controllersData || !controllersData.length) {
        return "";
    }
    let controllersText = `<h3 style="${titleStyles.title3}">Controllers</h3> \n`;
    controllersData.forEach((module) => {
        controllersText += getControllerText(module);
    })

    return controllersText;
}

export default listControllers;