export type ExistsCommand = "create" | "replace" | "append"

export interface GenerateArgs {
    noCommands?: boolean
    modulesPath?: string
    existsCommand?: ExistsCommand
} 