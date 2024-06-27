import fs from 'fs';
import { join } from 'path'; // Use path.join for safe path construction

const modulesPath = './src/modules'; // Replace with your actual modules directory

const modules: { name: string; controllers: { name: string; endpoints: string[] }[] }[] = [];

function getControllers(currentDir = modulesPath) {
    const subdirectories = fs.readdirSync(currentDir, { withFileTypes: true })
        .filter((dirent) => dirent.isDirectory()); // Filter subdirectories

    for (const subdir of subdirectories) {
        const subdirPath = join(currentDir, subdir.name);
        getControllers(subdirPath); // Recursive call for subdirectories
    }

    const controllerFiles = fs.readdirSync(currentDir)
        .filter(file => file.endsWith('.controller.ts')); // Filter controller files
    
    const controllerRegex = /@Controller\('([^']+)',/g; // Improved regex

    controllerFiles.forEach((controllerFile) => {
        const modulePath = join(currentDir, controllerFile);
        const moduleContent = fs.readFileSync(modulePath, 'utf8');

        const controllerMatches = moduleContent.match(controllerRegex);
         
        if (controllerMatches) {
            const moduleName = currentDir.replace(modulesPath, ''); // Extract module name from path
            const moduleControllers = controllerMatches.map((match) => ({
                name: match.split("'")[1],
                endpoints: [],
            }));

            modules.push({ name: moduleName, controllers: moduleControllers });
        }
    });
    return modules;
}

export default getControllers;  