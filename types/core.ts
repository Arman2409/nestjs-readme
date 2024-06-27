export type Source = "query" | "param" | "body"

export interface ModuleDetails {
    name: string
    controller: ControllerDetails
}

export interface ControllerDetails {
    path: string
    endpoints: EndpointDetails[]
}

export interface EndpointDetails {
    method: string
    path: string
    details: {
        source: Source
        name: string
        type: string
    }[]
}[]