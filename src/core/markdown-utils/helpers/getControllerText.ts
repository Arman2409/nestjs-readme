import type { ControllerDetails } from "../../../../types/core"

const getControllerText = (details: ControllerDetails) =>
    `
<h4>🧭 Controller: ${details.path} </h4>

#### 📌 Endpoints:

${details.endpoints.map(endpoint => {
        const detailLines = endpoint.details.map(detail => `
      - **Source**: ${detail.source} 
      - **Type**: ${detail.type}
`);
        return `- **Path**: ${endpoint.path}
- **Method**: ${endpoint.method}
${detailLines.length ? `- **Entries**:
  ${detailLines.join('')}` : ""}
`
    })}
`
 
export default getControllerText;