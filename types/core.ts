export type Source = "query" | "param" | "body"

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

export interface Script {
    command: string 
    tag?: string
    isDefault?: boolean
}