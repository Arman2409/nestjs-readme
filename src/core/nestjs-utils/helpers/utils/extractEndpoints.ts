import removeQuotes from "../../../../../helpers/removeQuotes";
import type { EndpointDetails, Source } from "../../../../../types/core";

const extractEndpoints = (content: string) => {
    const endpoints: EndpointDetails[] = [];
    const methodRegex = /@(Get|Post|Put|Delete|Patch|Head|Query|Params|Body)\((.*?)\)/g;
    const methodsDecorators = ["Get", "Post", "Put", "Delete", "Patch", "Head"];

    const controllerPath = getControllerPath(content);

    let match: RegExpExecArray|null;
    while ((match = methodRegex.exec(content)) !== null) {
        const method = match[1]; // Extract method (GET, POST, etc.)
        const path = match[2]; // Extract path
        if (methodsDecorators.includes(method)) {
            const newEndpoint = {
                method: method,
                path: path,
                details: []
            }

            endpoints.push(newEndpoint);
        } else {
            const regex = /@Query\(".*?"\)\s+\w+:\s+(\w+)/;
            const result = content.slice(Number(match[3])).match(regex);
            const type = (result as RegExpMatchArray)[1];

            endpoints[endpoints.length - 1].details.push({
                source: method.toLowerCase() as Source,
                name: removeQuotes(path),
                type
            })
        }
    }

    return {
        path: `/${controllerPath}`,
        endpoints
    };
}

export default extractEndpoints;

function getControllerPath(content:string) {
    const methodRegex = /@Controller\((.*?)\)/g;

    const mathch = methodRegex.exec(content);

    const controllerName = (mathch as RegExpExecArray)[1];
    const nameWithoutQuotes = removeQuotes(controllerName);

    return nameWithoutQuotes;
}