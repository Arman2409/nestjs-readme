import fs from 'fs';
import { join } from 'path';

import truncateString from '../../../../helpers/truncateString';
import extractEndpoints from './utils/extractEndpoints';
import type { ModuleDetails } from '../../../../types/core';

const getControllerDetails = (
    currentDir: string,
    moduleName: string,
    modules: ModuleDetails[]
) => {
    const controllerFiles = fs.readdirSync(currentDir)
        .filter(file => file.endsWith('.controller.ts')); // Filter controller files

    try {
        controllerFiles.forEach((controllerFile) => {
            const modulePath = join(currentDir, controllerFile);
            const moduleContent = fs.readFileSync(modulePath, 'utf8');

            const controllerDetails = extractEndpoints(moduleContent);
            modules.push({ name: moduleName, controller: controllerDetails });
        });
    } catch(e) {
        console.error(truncateString(e?.message, 500));
    }
}

export default getControllerDetails;