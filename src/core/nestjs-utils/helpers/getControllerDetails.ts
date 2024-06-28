import fs from 'fs';
import { join } from 'path';

import truncateString from '../../../../helpers/truncateString';
import extractEndpoints from './utils/extractEndpoints';
import type { ControllerDetails } from '../../../../types/core';

const getControllerDetails = (
    currentDir: string,
    controllers: ControllerDetails[]
) => {
    const controllerFiles = fs.readdirSync(currentDir)
        .filter(file => file.endsWith('.controller.ts')); // Filter controller files

    try {
        controllerFiles.forEach((controllerFile) => {
            const modulePath = join(currentDir, controllerFile);
            const moduleContent = fs.readFileSync(modulePath, 'utf8');

            const controllerDetails = extractEndpoints(moduleContent);
            controllers.push(controllerDetails);
        });
    } catch(e) {
        console.error(truncateString(e?.message, 500));
    }
}

export default getControllerDetails;