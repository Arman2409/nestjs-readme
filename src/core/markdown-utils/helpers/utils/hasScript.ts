const hasScript = (
    packageJson: JSON, 
    scriptName: string):boolean => {
    if (!packageJson || !packageJson["scripts"]) {
        return false; // Handle missing or empty scripts section
    }
    return scriptName in packageJson["scripts"];
}

export default hasScript;