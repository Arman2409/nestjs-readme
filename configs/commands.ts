import chalk from "chalk"

export const helpText = chalk.cyan(
`${chalk.bold("Usage:")}
    nextjs-readme [options]

${chalk.bold("Commands:")}
    generate/gen      Generate README file for your Nest.js project
    --help            Get help

${chalk.bold("Options:")} 
 !under maintenence!
`)

export const cautionText = chalk.bold.magenta(
`Review your README after generation, don't forget that it was generated automatically`
);

export const existsCommands = ["--replace", "--create", "--append"]
export const allowedBoolArgs = ["--no-commands", "--no-controllers", "--no-env"]
