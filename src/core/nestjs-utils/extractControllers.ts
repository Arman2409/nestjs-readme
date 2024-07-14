import getControllerDetails from './helpers/getControllerDetails';
import { modulesDefaultPath } from '../../../configs/core';
import findFiles from './helpers/findFiles';
import type { ControllerDetails } from '../../../types/core';
import { existsSync, readSync, readdirSync } from 'fs';

const controllers: ControllerDetails[] = [];

const extractControllers = (
    modulesPath: string = modulesDefaultPath
) => {
    if(!existsSync(modulesPath)) {
        console.warn(`Path ${modulesPath} doesn't exist.Scanning the main directory.`);
        modulesPath = "./";
    }
    const files = findFiles(modulesPath, '.controller.ts');

    for (const file of files) { 
        getControllerDetails(file, controllers);
    }
    
    return controllers;
}

export default extractControllers;
