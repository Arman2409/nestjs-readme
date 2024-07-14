import chalk from "chalk";
import fs from "fs";

import extractEndpoints from './utils/extractEndpoints';
import type { ControllerDetails } from '../../../../types/core';

const getControllerDetails = (
    currentDir: string,
    controllers: ControllerDetails[]
) => {
    try {
        const fileContent = fs.readFileSync(currentDir, 'utf8');

        const controllerDetails = extractEndpoints(fileContent);
        controllers.push(controllerDetails);
    } catch (e) {
        console.error(chalk.red("Failed to extract endpoints from the controller:", e?.message, 500));
    }
}

export default getControllerDetails;