<h1 style="text-align: center; border-bottom: 1px solid green"> Nestjs-readme
</h1>

`Generate basic README.md file for your Nest.js project`

- [Usage](#usage)
- [Available Commands](#commands)
- [Features](#features)

<h2 id="usage" style="text-align: center">
  Usage
</h2>

#### Installation
```bash
 npm install nestjs-readme
```

#### Usage
```bash
 npx nestjs-readme gen
```

<h2 id="commands" style="text-align: center">
  Available Commands
</h2>

- generate/gen    Generates README.md file for your project with default configuration
- --help          You can get more info about package's usage with this command

<h2 id="features" style="text-align: center">
  Features
</h2>

This package can help you to generate basic README for your Nest.js project by extracting information from your project such as
- Title and description
- Commands
- Environment variables
- Controllers

### Title and Description
This package will look for title and description in package.json, otherwise it will add basic info.

### Commands
This package will look for basic commands used in Nest.js projects, like "start" and "test" in your package.json's scripts section and if they are present, it will add them.

### Environment variables 
The following files ".env", '.env.production' and '.env.development' will be scanned for environment variables and if there are any variables, they will be added as well.The environment variables are expected to be in this format VARIABLE_NAME="value".

### Controllers
This is Nest.js specific feature.If your project has Nest.js-like structure and has "./src/modules/" folder, the package will look for controllers in each module and then list them readme with their endpoints with there parameters and paths.Note that GraphQL and other kind of APIs endpoints aren't supported yet.
