import removeQuotes from "../../../../../helpers/removeQuotes";
import type { EndpointDetails, Source } from "../../../../../types/core";

const methodRegex = /@(Get|Post|Put|Delete|Patch|Head|Query|Params|Body)\((.*?)\)/g;
const methodsDecorators = ["Get", "Post", "Put", "Delete", "Patch", "Head"];

const extractEndpoints = (content: string) => {
    const endpoints: EndpointDetails[] = [];
    const controllerPath = getControllerPath(content);

    let match: RegExpExecArray | null;
    while ((match = methodRegex.exec(content)) !== null) {
        if (match) {
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
                const regex = /@(Body|Query|Param)\s*\((.*?)\)\s+(\w+):?\s*([a-zA-Z<>]+)\s*[,)]/g;
                const regexForLine = /@(Body|Query|Param)\((.*?)\)\s*(\w+):\s*(\w+)\s*,?/;

                const newMatch = content.slice(match.index).match(regex);
                if (newMatch) {
                    const sourceMatch = (newMatch as any)[0].match(regexForLine);

                    if (sourceMatch) {
                        const name = sourceMatch[2];   // Parameter name (e.g., updateProductDto)
                        const type = sourceMatch[3];   // Parameter type (e.g., CreateProductDto)

                        const newEndpointDetails = {
                            source: method.toLowerCase() as Source,
                            name,
                            type,
                        }

                        endpoints[endpoints.length - 1].details.push(newEndpointDetails)
                    }
                }
            }
        }
    }

    return {
        path: `/${controllerPath}`,
        endpoints
    };
}

export default extractEndpoints;

function getControllerPath(content: string) {
    const methodRegex = /@Controller\((.*?)\)/g;

    const match = methodRegex.exec(content);


    const controllerName = (match as RegExpExecArray)[1];
    const nameWithoutQuotes = removeQuotes(controllerName);

    return nameWithoutQuotes;
}