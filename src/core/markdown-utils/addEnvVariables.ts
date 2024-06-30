import uppercaseFirstLetter from "../../../helpers/uppercaseFirstLetter"
import titleStyles from "../../../styles/text";

const addEnvVariables = (
    envVariables: Record<string, string>
) => {
    let variablesText = ""
    for (const key in envVariables) {
        const normalizedName = uppercaseFirstLetter(key.replace(/_/g, ' ').replace(/-/g, ' ').toLowerCase());
        variablesText += `\n- ${key}: Your ${normalizedName}`
    }
    return `
<h3 style="${titleStyles.title3}">🌐 Environment variables</h3>
${variablesText}`
}

export default addEnvVariables;