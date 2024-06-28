import { ControllerDetails } from "../../../types/core";
import getControllerText from "./helpers/getControllerText";

const listControllers = (modulesData: ControllerDetails[]) => {
    let controllersText = "## Controllers \n";
    modulesData.forEach((module) => {
        controllersText += getControllerText(module);
    })

    return controllersText;
}

export default listControllers;