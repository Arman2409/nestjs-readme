<h1 style="text-align: center; border-bottom: 1px solid green"> Nestjs-readme
</h1>

`Extract REAMDE file for your Nest.js project`
<h2 style="text-align: center">
  Usage
</h2>

```bash
 npm install nestjs-readme
```
<h2 style="text-align: center">
  Features
</h2>

This package can help you to generate basic README for your Nest.js project by extracting information from you project such as
- Title and description
- Commands
- Environment variables
- Controllers

### Title and Description
This package will look for title and description in package.json, otherwise it will add basic info.

### Commands
This package will look for basic commands used in Nest.js projects, like "start" and "test" in your package.json and if they are present, it will add them.

### Environment variables 
The following files ".env", '.env.production' and '.env.development' will be scanned for environment variables and if there are any, they will be added as well.

### Controllers
This is Nest.js specific feature.If your project has Nest.js like structure and has "./src/modules/" folder, the package will look for controllers in each module and then list them readme with their endpoints with there parameters and paths.
