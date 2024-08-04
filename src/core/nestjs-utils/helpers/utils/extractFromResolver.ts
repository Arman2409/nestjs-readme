import type { EndpointDetails, GraphQLEndpointDetails, Source } from "../../../../../types/core";

const methodRegex = /@(Query|Mutation|Args)\((.*?)\)/g;

const methodsDecorators = ["Query", "Mutation"];

const extractFromResolver = (content: string) => {
    const endpoints: GraphQLEndpointDetails[] = [];

    let match: RegExpExecArray | null;
    while ((match = methodRegex.exec(content)) !== null) {
        if (match) {
            const type = match[1];

            const returnTypeRegex= /@(Query|Mutation)\(\(\)\s*=>\s*(\w+)(,.*)?\)/;
            const nameRegex = /name:\s*"([^"]*)"/;  

            const returnTypeMatch = match.input.slice(match.index).match(returnTypeRegex) || [];
            const nameMatch =  match.input.slice(match.index).match(nameRegex) || [];
            
            if (methodsDecorators.includes(type)) {
                 
                const newGraphQLEndpoint = {
                    type,
                    name: nameMatch[1] || "",
                    returnType: returnTypeMatch[2] || "",
                    arguments: []
                }

                endpoints.push(newGraphQLEndpoint);
            } else {
                const regex = /@Args\s*\((.*?)\)\s+(\w+):?\s*([a-zA-Z<>]+)\s*[,)]/g;
                const regexForLine = /@Args\((.*?)\)\s*(\w+):\s*(\w+)\s*,?/;

                
                const newMatch = content.slice(match.index).match(regex);
                if (newMatch) {
                    const sourceMatch = (newMatch as any)[0].match(regexForLine);
                     

                    if (sourceMatch) {
                        const name = sourceMatch[2];   // Parameter name (e.g., updateProductDto)
                        const type = sourceMatch[3];   // Parameter type (e.g., CreateProductDto)

                        const newEndpointDetails = {
                            name,
                            type,
                        }

                        endpoints[endpoints.length - 1].arguments.push(newEndpointDetails)
                    }
                }
            }
        }
    }

    return {
        endpoints
    };
}

export default extractFromResolver;