import type { ControllerDetails } from "../../../../types/core"

const getControllerText = (details: ControllerDetails) =>
    `
### Controller path: ${details.path}

#### Endpoints:

${details.endpoints.map(endpoint => {
        const detailLines = endpoint.details.map(detail => `
    Name: ${detail.name}
    Type: ${detail.type}
    Source: ${detail.source}
`);
        return `Path: ${endpoint.path}
Method: ${endpoint.method}
Entries: 
  ${detailLines.join('')}`
    })}
`

export default getControllerText;