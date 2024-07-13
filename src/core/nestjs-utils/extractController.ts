import fs from 'fs';
import path, { join } from 'path';
import type { Dirent } from "fs";

import getControllerDetails from './helpers/getControllerDetails';
import { modulesDefaultPath } from '../../../configs/core';
import type { ControllerDetails } from '../../../types/core';

const controllers: ControllerDetails[] = [];

function findFiles(
    dir: string, 
    ext: string = '.ts',
    fileList: string[] = []
): string[] {
    const files = fs.readdirSync(dir);
    
    files.forEach(file => {
        const filePath = path.join(dir, file);
        if (fs.statSync(filePath).isDirectory()) {
            findFiles(filePath, ext, fileList);
        } else if (filePath.endsWith(ext)) {
            fileList.push(filePath);
        }
    });
    return fileList;
}

const extractControllers = (
    modulesPath: string = modulesDefaultPath
) => {
    // let files = fs.readdirSync(modulesPath);
    // try {
    //     files = fs.readdirSync(modulesPath);
    // } catch (e) {
    //     throw new Error(`Can't scan path ${modulesPath}`)
    // }

    const files = findFiles(modulesPath, '.controller.ts');

    

    for (const file of files) { 
        getControllerDetails(file, controllers);
    }

    console.log({controllers});
    
    return controllers;
}

export default extractControllers;
