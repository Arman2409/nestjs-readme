import chalk from "chalk"

export const helpText = chalk.cyan(
`${chalk.bold("Usage:")}
    nextjs-readme [options]

${chalk.bold("Commands:")}
    generate/gen      Generate README file for your Nest.js project
    --help            Get help

${chalk.bold("Options:")} 
   ${chalk.yellow("!under maintenence!")}
`)

export const cautionText = chalk.bold.magenta(
`\nReview your README.md file after generation, don't forget that it was generated automatically and might not be precise`
);

export const readmeExistingQuestion = chalk.yellow(
'README.md already exists. What would you like to do?\n(append(a)/create(c)/replace(r)/exit(e)):'
);

export const envNotFoundMessage = chalk.yellow("Environment variables not detected.Continuing");
export const existsCommands = ["--replace", "--create", "--append"]
export const allowedBoolArgs = ["--no-commands", "--no-controllers", "--no-env"]
