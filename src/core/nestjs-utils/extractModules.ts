import fs from 'fs';
import { join } from 'path';

import getControllerDetails from './helpers/getControllerDetails';
import { modulesPath } from '../../../configs/core';
import type { ModuleDetails } from '../../../types/core';

const modules: ModuleDetails[] = [];

const extractModules = () => {
    const subdirectories = fs.readdirSync(
        modulesPath,
        { withFileTypes: true }
    )
        .filter((dirent) => dirent.isDirectory());

    for (const subdir of subdirectories) {
        const subdirPath = join(modulesPath, subdir.name);

        getControllerDetails(subdirPath, subdir.name, modules);
    }
    return modules;
}

export default extractModules;
