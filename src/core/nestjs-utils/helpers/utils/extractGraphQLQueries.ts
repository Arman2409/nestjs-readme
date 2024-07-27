import type { EndpointDetails, Source } from "../../../../../types/core";

const methodRegex = /@(Query|Mutation|Args)\((.*?)\)/g;
const methodsDecorators = ["Query", "Mutation"];

const extractEndpoints = (content: string) => {
    const endpoints: EndpointDetails[] = [];
    // const controllerPath = getControllerPath(content);

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
                const regex = /@Args\s*\((.*?)\)\s+(\w+):?\s*([a-zA-Z<>]+)\s*[,)]/g;
                const regexForLine = /@Args\((.*?)\)\s*(\w+):\s*(\w+)\s*,?/;

                console.log(content.slice(match.index));
                
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
                            path: path
                        }

                        endpoints[endpoints.length - 1].details.push(newEndpointDetails)
                    }
                }
            }
        }
    }

    return {
        // path: `/${controllerPath}`,
        endpoints
    };
}

export default extractEndpoints;

// function getControllerPath(content: string) {
//     const methodRegex = /@Controller\((.*?)\)/g;

//     const match = methodRegex.exec(content);


//     const controllerName = (match as RegExpExecArray)[1];
//     const nameWithoutQuotes = removeQuotes(controllerName);

//     return nameWithoutQuotes;
// }

// import removeQuotes from "../../../../../helpers/removeQuotes";

// // Regex patterns to match GraphQL queries and mutations
// const operationRegex = /@Query\((.*?)\)|@Mutation\((.*?)\)/g;

// // Function to extract GraphQL operations from resolver content
// const extractGraphQLOperations = (content: string): { operations: any[] } => {
//     const operations: any[] = [];

//     // Regex patterns to extract GraphQL queries and mutations
//     const queryRegex = /@Query\((.*?)\)/g;
//     const mutationRegex = /@Mutation\((.*?)\)/g;

//     // Extract Queries
//     let match: RegExpExecArray | null;
//     while ((match = queryRegex.exec(content)) !== null) {
//         if (match) {
//             const name = removeQuotes(match[1]); // Extract query name
//             const newOperation = {
//                 name: name || 'UnnamedQuery',
//                 type: 'query',
//                 fields: extractFields(content, match.index)
//             };
//             operations.push(newOperation);
//         }
//     }

//     // Extract Mutations
//     while ((match = mutationRegex.exec(content)) !== null) {
//         if (match) {
//             const name = removeQuotes(match[1]); // Extract mutation name
//             const newOperation = {
//                 name: name || 'UnnamedMutation',
//                 type: 'mutation',
//                 fields: extractFields(content, match.index)
//             };
//             operations.push(newOperation);
//         }
//     }

//     return {
//         operations
//     };
// };

// // Helper function to extract fields for a given operation
// const extractFields = (content: string, startIndex: number): string[] => {
//     const fields: string[] = [];
//     const fieldRegex = /(\w+)\s*:/g; // Regex to match field names

//     let match: RegExpExecArray | null;
//     let operationContent = content.slice(startIndex);
//     console.log(operationContent);
    
//     while ((match = fieldRegex.exec(operationContent)) !== null) {
//         if (match) {
//             console.log(match);
            
//             fields.push(match[1]);
//         }
//     }

//     // console.log(fields);
    

//     return fields;
// };

// export default extractGraphQLOperations;