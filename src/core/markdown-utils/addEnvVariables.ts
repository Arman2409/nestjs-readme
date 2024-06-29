import uppercaseFirstLetter from "../../../helpers/uppercaseFirstLetter"

const addEnvVariables = (
    envVariables: Record<string, string>
) => {
    let variablesText = ""
    for (const key in envVariables) {
        const normalizedName = uppercaseFirstLetter(key.replace(/_/g, ' ').replace(/-/g, ' ').toLowerCase());
        variablesText += `\n- ${key}: Your ${normalizedName}`
    }
    return `
## Environment variables
${variablesText}`
}

export default addEnvVariables;