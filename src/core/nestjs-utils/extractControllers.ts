import fs from 'fs';
import { join } from 'path';

import getControllerDetails from './helpers/getControllerDetails';
import { modulesDefaultPath,  } from '../../../configs/core';
import type { ControllerDetails } from '../../../types/core';

const controllers: ControllerDetails[] = [];

const extractControllers = () => {
    const subdirectories = fs.readdirSync(
        modulesDefaultPath,
        { withFileTypes: true }
    )
        .filter((dirent) => dirent.isDirectory());

    for (const subdir of subdirectories) {
        const subdirPath = join(modulesDefaultPath, subdir.name);

        getControllerDetails(subdirPath, controllers);
    }
    return controllers;
}

export default extractControllers;
