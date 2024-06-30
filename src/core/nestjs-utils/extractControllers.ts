import fs from 'fs';
import { join } from 'path';
import type { Dirent } from "fs";

import getControllerDetails from './helpers/getControllerDetails';
import { modulesDefaultPath } from '../../../configs/core';
import type { ControllerDetails } from '../../../types/core';

const controllers: ControllerDetails[] = [];

const extractControllers = (modulesPath:string = modulesDefaultPath) => {
    let subDirectories: Dirent[] = [];
    try {
        subDirectories = fs.readdirSync(
            modulesPath,
            { withFileTypes: true }
        )
            .filter((dirent) => dirent.isDirectory());
    } catch (e) {
        throw new Error(`Can't scan path ${modulesPath}`)
    }

    for (const subdir of subDirectories) {
        const subdirPath = join(modulesDefaultPath, subdir.name);

        getControllerDetails(subdirPath, controllers);
    }
    return controllers;
}

export default extractControllers;
