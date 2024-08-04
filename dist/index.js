#!/usr/bin/env node
var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(
  // If the importer is in node compatibility mode or this is not an ESM
  // file that has been converted to a CommonJS file using a Babel-
  // compatible transform (i.e. "__esModule" has not been set), then set
  // "default" to the CommonJS "module.exports" for node compatibility.
  isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target,
  mod
));

// configs/commands.ts
var import_chalk = __toESM(require("chalk"));
var helpText = import_chalk.default.cyan(
  `${import_chalk.default.bold("Usage:")}
    nextjs-readme [options]

${import_chalk.default.bold("Commands:")}
    generate/gen      Generate README file for your Nest.js project
    --help            Get help

${import_chalk.default.bold("Options:")} 
   ${import_chalk.default.yellow("!under maintenence!")}
`
);
var cautionText = import_chalk.default.bold.magenta(
  `
 \u2757 Review your README.md file after generation, don't forget that it was generated automatically and might not be precise \u2757`
);
var readmeExistingQuestion = import_chalk.default.yellow(
  "README.md already exists. What would you like to do?\n(append(a)/create(c)/replace(r)/exit(e)):"
);
var envNotFoundMessage = import_chalk.default.yellow("Environment variables not detected.Continuing");
var existsCommands = ["--replace", "--create", "--append"];
var allowedBoolArgs = ["--no-commands", "--no-controllers", "--no-env"];

// helpers/argToCamel.ts
var argToCamel = (str) => {
  const camelCase = str.toLowerCase().replace(/-([a-z])/g, (match, letter) => letter.toUpperCase()).slice(1);
  return camelCase.slice(0, 1).toLowerCase() + camelCase.slice(1);
};
var argToCamel_default = argToCamel;

// src/commands/getGenerationArgs.ts
var getGenerationArgs = (args) => {
  const genArgs = args.slice(3);
  const result = {};
  if (!genArgs) {
    return void 0;
  }
  genArgs.forEach((arg, index) => {
    var _a;
    const lowerArg = arg.toLowerCase();
    if (allowedBoolArgs.includes(arg)) {
      result[argToCamel_default(lowerArg)] = true;
    } else if (lowerArg.startsWith("--modules-path")) {
      const path6 = genArgs[index + 1];
      if (!path6 || path6.startsWith("--")) {
        throw new Error(`Missing or invalid value for '${arg}' argument.`);
      }
      result.modulesPath = path6;
    } else if (existsCommands.includes(lowerArg)) {
      result.existsCommand = lowerArg.slice(2);
    } else if (existsCommands.map((command) => command.slice(0, 3)).includes(lowerArg)) {
      result.existsCommand = (_a = existsCommands.find((command) => command.startsWith(lowerArg))) == null ? void 0 : _a.slice(2);
    } else if (!(genArgs[index - 1] === "--modules-path")) {
      throw new Error(`Invalid Generate argument '${arg}'. Use --help for more info.`);
    }
  });
  return result;
};
var getGenerationArgs_default = getGenerationArgs;

// src/commands/handleInstructions.ts
var handleInstructions = (status) => {
  switch (status) {
    case "help":
      console.log(helpText);
      break;
    case "not-given":
      throw new Error("Command not provided. Use --help for more info.");
    case "invalid":
      throw new Error("Invalid options. Use --help for more info.");
    default:
      throw new Error("Unknown status received.");
  }
};
var handleInstructions_default = handleInstructions;

// src/commands/updateReadme.ts
var import_chalk8 = __toESM(require("chalk"));
var import_fs6 = __toESM(require("fs"));
var import_path4 = __toESM(require("path"));
var import_readline = __toESM(require("readline"));

// src/commands/utils/applyNewContent.ts
var import_chalk7 = __toESM(require("chalk"));
var import_fs5 = __toESM(require("fs"));
var import_path3 = __toESM(require("path"));

// src/core/nestjs-utils/helpers/getControllerDetails.ts
var import_chalk2 = __toESM(require("chalk"));
var import_fs = __toESM(require("fs"));

// helpers/removeQuotes.ts
var removeQuotes = (str) => {
  return str ? str.slice(1, -1) : "";
};
var removeQuotes_default = removeQuotes;

// src/core/nestjs-utils/helpers/utils/extractEndpoints.ts
var methodRegex = /@(Get|Post|Put|Delete|Patch|Head|Query|Params|Body)\((.*?)\)/g;
var methodsDecorators = ["Get", "Post", "Put", "Delete", "Patch", "Head"];
var extractEndpoints = (content) => {
  const endpoints = [];
  const controllerPath = getControllerPath(content);
  let match;
  while ((match = methodRegex.exec(content)) !== null) {
    if (match) {
      const method = match[1];
      const path6 = match[2];
      if (methodsDecorators.includes(method)) {
        const newEndpoint = {
          method,
          path: path6,
          details: []
        };
        endpoints.push(newEndpoint);
      } else {
        const regex = /@(Body|Query|Param)\s*\((.*?)\)\s+(\w+):?\s*([a-zA-Z<>]+)\s*[,)]/g;
        const regexForLine = /@(Body|Query|Param)\((.*?)\)\s*(\w+):\s*(\w+)\s*,?/;
        const newMatch = content.slice(match.index).match(regex);
        if (newMatch) {
          const sourceMatch = newMatch[0].match(regexForLine);
          if (sourceMatch) {
            const name = sourceMatch[2];
            const type = sourceMatch[3];
            const newEndpointDetails = {
              source: method.toLowerCase(),
              name,
              type
            };
            endpoints[endpoints.length - 1].details.push(newEndpointDetails);
          }
        }
      }
    }
  }
  return {
    path: `/${controllerPath}`,
    endpoints
  };
};
var extractEndpoints_default = extractEndpoints;
function getControllerPath(content) {
  const methodRegex2 = /@Controller\((.*?)\)/g;
  const match = methodRegex2.exec(content);
  const controllerName = match[1];
  const nameWithoutQuotes = removeQuotes_default(controllerName);
  return nameWithoutQuotes;
}

// src/core/nestjs-utils/helpers/getControllerDetails.ts
var getControllerDetails = (currentDir, controllers2) => {
  try {
    const fileContent = import_fs.default.readFileSync(currentDir, "utf8");
    const controllerDetails = extractEndpoints_default(fileContent);
    controllers2.push(controllerDetails);
  } catch (e) {
    console.error(import_chalk2.default.red("Failed to extract endpoints from the controller:", e == null ? void 0 : e.message, 500));
  }
};
var getControllerDetails_default = getControllerDetails;

// configs/core.ts
var modulesDefaultPath = "./src/";
var defaultDescription = "Nest.js API server";

// src/core/nestjs-utils/helpers/findFiles.ts
var import_chalk3 = __toESM(require("chalk"));
var import_fs2 = __toESM(require("fs"));
var import_path = __toESM(require("path"));
var shouldIgnore = [".", "node_modules", ".git", ".vscode"];
var findFiles = (dir, ext = ".ts", fileList = []) => {
  try {
    const files = import_fs2.default.readdirSync(dir);
    files.forEach((file) => {
      const filePath = import_path.default.join(dir, file);
      if (import_fs2.default.statSync(filePath).isDirectory()) {
        let shouldBeIgnored = false;
        shouldIgnore.forEach((path6) => {
          if (filePath.startsWith(path6)) {
            shouldBeIgnored = true;
          }
        });
        if (shouldBeIgnored) {
          return;
        }
        findFiles(filePath, ext, fileList);
      } else if (filePath.endsWith(ext)) {
        fileList.push(filePath);
      }
    });
    return fileList;
  } catch (err) {
    console.error(import_chalk3.default.red("Failed to extract files:", err));
    return [];
  }
};
var findFiles_default = findFiles;

// src/core/nestjs-utils/extractControllers.ts
var import_fs3 = require("fs");
var controllers = [];
var extractControllers = (modulesPath = modulesDefaultPath) => {
  if (!(0, import_fs3.existsSync)(modulesPath)) {
    console.warn(`Path ${modulesPath} doesn't exist.Scanning the main directory.`);
    modulesPath = "./";
  }
  const files = findFiles_default(modulesPath, ".controller.ts");
  for (const file of files) {
    getControllerDetails_default(file, controllers);
  }
  return controllers;
};
var extractControllers_default = extractControllers;

// src/core/extract-utils/getPackageInfo.ts
var import_chalk4 = __toESM(require("chalk"));
var import_fs4 = __toESM(require("fs"));
var getPackageInfo = () => {
  try {
    const packageData = JSON.parse(import_fs4.default.readFileSync("./package.json", "utf8")) || {};
    if (!packageData) {
      console.warn(import_chalk4.default.yellow("File package.json not detected.Continuing"));
    }
    return packageData;
  } catch (error) {
    console.error(import_chalk4.default.red("Error reading package.json:", error));
    return { title: "", description: "" };
  }
};
var getPackageInfo_default = getPackageInfo;

// src/core/markdown-utils/addTitleAndDescription.ts
var import_path2 = __toESM(require("path"));

// helpers/uppercaseFirstLetter.ts
var import_chalk5 = __toESM(require("chalk"));
var uppercaseFirstLetter = (str) => {
  if (!str) {
    console.error(import_chalk5.default.red("Non string value received"));
    return "";
  }
  return `${str[0].toUpperCase()}${str.slice(1)}`;
};
var uppercaseFirstLetter_default = uppercaseFirstLetter;

// styles/text.ts
var titleStyles = {
  title1: "color: #4CAF50; text-align: center; border-bottom: 3px solid #4CAF50; padding-bottom: 10px;",
  title2: "color: #FF5722; text-align: center; padding-bottom: 5px;",
  title3: "color: #03A9F4; text-align: center;  border-bottom: 1px solid #4CAF50;"
};
var text_default = titleStyles;

// src/core/markdown-utils/addTitleAndDescription.ts
var addTitleAndDescription = (packageData) => {
  let {
    name: title = "Nest.js app",
    description = "Nest.js server API"
  } = { ...packageData };
  if (!title) {
    title = import_path2.default.basename(process.cwd());
  }
  return `<h1 style="${text_default.title1}">${uppercaseFirstLetter_default(title)}</h1>
  
<h2 style="${text_default.title2}">\u{1F4D6} ${description || `${title} ${defaultDescription}`}</h3>

`;
};
var addTitleAndDescription_default = addTitleAndDescription;

// src/core/markdown-utils/helpers/getControllerText.ts
var getControllerText = (details) => `
<h4>\u{1F9ED} Controller: ${details.path} </h4>

#### \u{1F4CC} Endpoints:

${details.endpoints.map((endpoint) => {
  const detailLines = endpoint.details.map((detail) => `
      - **Source**: ${detail.source} 
      - **Type**: ${detail.type}
`);
  return `- **Path**: ${endpoint.path}
- **Method**: ${endpoint.method}
${detailLines.length ? `- **Entries**:
  ${detailLines.join("")}` : ""}
`;
})}
`;
var getControllerText_default = getControllerText;

// src/core/markdown-utils/listControllers.ts
var listControllers = (controllersData) => {
  if (!controllersData || !controllersData.length) {
    return "";
  }
  let controllersText = `<h3 style="${text_default.title3}">Controllers</h3> 
`;
  controllersData.forEach((module2) => {
    controllersText += getControllerText_default(module2);
  });
  return controllersText;
};
var listControllers_default = listControllers;

// data/scripts.ts
var installationScripts = [
  {
    command: "install",
    isDefault: true
  }
];
var runningScripts = [
  {
    command: "start",
    tag: "development"
  },
  {
    command: "start:dev",
    tag: "watch mode"
  }
];
var testingScripts = [
  {
    command: "test",
    tag: "unit tests"
  },
  {
    command: "test:e2e",
    tag: "e2e tests"
  },
  {
    command: "test:cov",
    tag: " test coverage"
  }
];

// src/core/markdown-utils/helpers/addScriptsGroup.ts
var import_chalk6 = __toESM(require("chalk"));

// src/core/markdown-utils/helpers/utils/hasScript.ts
var hasScript = (packageJson, scriptName) => {
  if (!packageJson || !packageJson["scripts"]) {
    return false;
  }
  return scriptName in packageJson["scripts"];
};
var hasScript_default = hasScript;

// src/core/markdown-utils/helpers/addScriptsGroup.ts
var addScriptsGroup = (groupName, scripts, packageJson) => {
  try {
    let foundScripts = [];
    for (const { tag, isDefault, command } of scripts) {
      if (hasScript_default(packageJson, command) || isDefault) {
        foundScripts.push({
          tag,
          command
        });
      }
    }
    if (foundScripts.length === 0) {
      return "";
    }
    let groupContent = `
<h3 style="${text_default.title3}">${groupName}</h3>

\`\`\`bash`;
    foundScripts.forEach(({ tag, command }) => {
      if (tag) {
        groupContent += `
 # ${tag}`;
      }
      groupContent += `
 npm run ${command}`;
    });
    groupContent += `
\`\`\``;
    return groupContent;
  } catch (error) {
    console.error(import_chalk6.default.red("Error reading package.json:", error));
  }
};
var addScriptsGroup_default = addScriptsGroup;

// src/core/markdown-utils/addCommands.ts
var groupsData = [
  {
    name: "Installation",
    scripts: installationScripts
  },
  {
    name: "Running",
    scripts: runningScripts
  },
  {
    name: "Testing",
    scripts: testingScripts
  }
];
var addCommands = (packageInfo) => {
  const scriptsGroups = [];
  groupsData.forEach(({ name, scripts }) => {
    const groupText = addScriptsGroup_default(name, scripts, packageInfo);
    if (groupText) {
      scriptsGroups.push(groupText);
    }
  });
  return `
  ${scriptsGroups.map((group) => group)}
`;
};
var addCommands_default = addCommands;

// src/core/extract-utils/getEnvVariables.ts
var fs4 = __toESM(require("fs"));
var path3 = __toESM(require("path"));
var getEnvVariables = (filePath) => {
  const possibleFiles = [".env", ".env.production", ".env.development"];
  let envPath = "";
  if (filePath && fs4.existsSync(filePath)) {
    envPath = filePath;
  } else {
    for (const file of possibleFiles) {
      const resolvedPath = path3.resolve(process.cwd(), file);
      if (fs4.existsSync(resolvedPath)) {
        envPath = resolvedPath;
        break;
      }
    }
  }
  if (!envPath) {
    console.warn(envNotFoundMessage);
    return;
  }
  const envContent = fs4.readFileSync(envPath, "utf-8");
  const envVariables = {};
  envContent.split("\n").forEach((line) => {
    const cleanedLine = line.split("#")[0].trim();
    if (cleanedLine) {
      const [key, ...value] = cleanedLine.split("=");
      const joinedValue = value.join("=").trim();
      const finalValue = joinedValue.replace(/^['"]|['"]$/g, "");
      envVariables[key.trim()] = finalValue;
    }
  });
  if (Object.keys(envVariables).length === 0) {
    console.warn(envNotFoundMessage);
  }
  return envVariables;
};
var getEnvVariables_default = getEnvVariables;

// src/core/markdown-utils/addEnvVariables.ts
var addEnvVariables = (envVariables = {}) => {
  let variablesText = "";
  for (const key in envVariables) {
    const normalizedName = uppercaseFirstLetter_default(key.replace(/_/g, " ").replace(/-/g, " ").toLowerCase());
    variablesText += `
- ${key}: Your ${normalizedName}`;
  }
  return `
<h3 style="${text_default.title3}">\u{1F310} Environment variables</h3>
${variablesText}`;
};
var addEnvVariables_default = addEnvVariables;

// src/core/generateReadmeContent.ts
var generateReadmeContent = (args) => {
  let readmeString = "";
  const packageInfo = getPackageInfo_default();
  if (packageInfo) {
    readmeString += addTitleAndDescription_default(packageInfo);
  }
  const controllersData = extractControllers_default();
  if (controllersData) {
    readmeString += listControllers_default(controllersData);
  }
  const envVariables = getEnvVariables_default();
  if (envVariables) {
    readmeString += addEnvVariables_default(envVariables);
  }
  if (packageInfo) {
    readmeString += addCommands_default(packageInfo);
  }
  return readmeString;
};
var generateReadmeContent_default = generateReadmeContent;

// src/commands/utils/getNewReadmePath.ts
var getNewReadmePath = (readmePath2) => {
  const timestamp = (/* @__PURE__ */ new Date()).toISOString().replace(/[-:]/g, "").replace("T", "_").split(".")[0];
  return readmePath2.slice(0, -3) + `_${timestamp}.md`;
};
var getNewReadmePath_default = getNewReadmePath;

// src/commands/utils/applyNewContent.ts
var applyNewContent = (operation2, readmePath2, args, timestamp) => {
  if (operation2 === "create" && timestamp) {
    readmePath2 = getNewReadmePath_default(readmePath2);
  }
  const newContent = generateReadmeContent_default(args);
  if (operation2 === "create" || operation2 === "replace") {
    import_fs5.default.writeFileSync(readmePath2, newContent);
  } else {
    import_fs5.default.appendFileSync(readmePath2, "\n" + newContent);
  }
  const operationName = uppercaseFirstLetter_default(operation2 + (operation2.endsWith("e") ? "d" : "ed"));
  console.log(import_chalk7.default.green(`${operationName} ${import_path3.default.basename(readmePath2)}`));
  console.log(cautionText);
};
var applyNewContent_default = applyNewContent;

// src/commands/updateReadme.ts
var readmePath = import_path4.default.join(process.cwd(), "README.md");
var updateReadme = (args) => {
  if (args == null ? void 0 : args.existsCommand) {
    if ((args == null ? void 0 : args.existsCommand) === "append" || (args == null ? void 0 : args.existsCommand) === "replace") {
      if (!import_fs6.default.existsSync(readmePath)) {
        throw new Error(`Can not implement operation '${args == null ? void 0 : args.existsCommand}', README.md file doesn't exist.`);
      }
    }
    return applyNewContent_default(args == null ? void 0 : args.existsCommand, readmePath, args);
  }
  if (import_fs6.default.existsSync(readmePath)) {
    const rl = import_readline.default.createInterface({
      input: process.stdin,
      output: process.stdout
    });
    rl.question(
      readmeExistingQuestion,
      (answer) => {
        const normalizedAnswer = answer.toLowerCase().trim();
        switch (normalizedAnswer) {
          case "append":
          case "a":
            applyNewContent_default("append", readmePath, args);
            rl.close();
            break;
          case "create":
          case "c":
            applyNewContent_default("create", readmePath, args, true);
            rl.close();
            break;
          case "replace":
          case "r":
            applyNewContent_default("replace", readmePath, args);
            rl.close();
            break;
          case "exit":
          case "e":
            rl.close();
            break;
          default:
            console.error(import_chalk8.default.red("\nInvalid operation name, please try again"));
            updateReadme();
            break;
        }
      }
    );
  } else {
    applyNewContent_default("create", readmePath, args);
  }
};
var updateReadme_default = updateReadme;

// src/index.ts
var operation = process.argv[2];
switch (operation) {
  case "generate":
  case "gen":
    const updateArgs = getGenerationArgs_default(process.argv);
    updateReadme_default(updateArgs);
    break;
  case "--help":
    handleInstructions_default("help");
    break;
  case void 0:
    handleInstructions_default("not-given");
    break;
  default:
    handleInstructions_default("invalid");
    break;
}
