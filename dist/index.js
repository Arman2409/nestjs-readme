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

// src/commands/updateReadme.ts
var import_fs6 = __toESM(require("fs"));
var import_path4 = __toESM(require("path"));
var import_readline = __toESM(require("readline"));

// src/commands/utils/applyNewContent.ts
var import_fs5 = __toESM(require("fs"));

// src/core/nestjs-utils/extractControllers.ts
var import_fs2 = __toESM(require("fs"));
var import_path2 = require("path");

// src/core/nestjs-utils/helpers/getControllerDetails.ts
var import_fs = __toESM(require("fs"));
var import_path = require("path");

// helpers/truncateString.ts
var truncateString = (str, length = 10, dots = true) => {
  if (!str) return "";
  str = str.trim();
  if (str.length < length) return str;
  return str.slice(0, length) + (dots ? "..." : "");
};
var truncateString_default = truncateString;

// helpers/removeQuotes.ts
var removeQuotes = (str) => {
  return str ? str.slice(1, -1) : "";
};
var removeQuotes_default = removeQuotes;

// src/core/nestjs-utils/helpers/utils/extractEndpoints.ts
var extractEndpoints = (content) => {
  const endpoints = [];
  const methodRegex = /@(Get|Post|Put|Delete|Patch|Head|Query|Params|Body)\((.*?)\)/g;
  const methodsDecorators = ["Get", "Post", "Put", "Delete", "Patch", "Head"];
  const controllerPath = getControllerPath(content);
  let match;
  while ((match = methodRegex.exec(content)) !== null) {
    const method = match[1];
    const path3 = match[2];
    if (methodsDecorators.includes(method)) {
      const newEndpoint = {
        method,
        path: path3,
        details: []
      };
      endpoints.push(newEndpoint);
    } else {
      const regex = /@Query\(".*?"\)\s+\w+:\s+(\w+)/;
      const result = content.slice(Number(match[3])).match(regex);
      const type = result[1];
      endpoints[endpoints.length - 1].details.push({
        source: method.toLowerCase(),
        name: removeQuotes_default(path3),
        type
      });
    }
  }
  return {
    path: `/${controllerPath}`,
    endpoints
  };
};
var extractEndpoints_default = extractEndpoints;
function getControllerPath(content) {
  const methodRegex = /@Controller\((.*?)\)/g;
  const mathch = methodRegex.exec(content);
  const controllerName = mathch[1];
  const nameWithoutQuotes = removeQuotes_default(controllerName);
  return nameWithoutQuotes;
}

// src/core/nestjs-utils/helpers/getControllerDetails.ts
var getControllerDetails = (currentDir, controllers2) => {
  const controllerFiles = import_fs.default.readdirSync(currentDir).filter((file) => file.endsWith(".controller.ts"));
  try {
    controllerFiles.forEach((controllerFile) => {
      const modulePath = (0, import_path.join)(currentDir, controllerFile);
      const moduleContent = import_fs.default.readFileSync(modulePath, "utf8");
      const controllerDetails = extractEndpoints_default(moduleContent);
      controllers2.push(controllerDetails);
    });
  } catch (e) {
    console.error(truncateString_default(e == null ? void 0 : e.message, 500));
  }
};
var getControllerDetails_default = getControllerDetails;

// configs/core.ts
var modulesPath = "./src/modules";
var defaultDescription = "Nest.js API server";

// src/core/nestjs-utils/extractControllers.ts
var controllers = [];
var extractControllers = () => {
  const subdirectories = import_fs2.default.readdirSync(
    modulesPath,
    { withFileTypes: true }
  ).filter((dirent) => dirent.isDirectory());
  for (const subdir of subdirectories) {
    const subdirPath = (0, import_path2.join)(modulesPath, subdir.name);
    getControllerDetails_default(subdirPath, controllers);
  }
  return controllers;
};
var extractControllers_default = extractControllers;

// src/core/extract-utils/getPackageInfo.ts
var import_fs3 = __toESM(require("fs"));
var getPackageInfo = () => {
  try {
    const packageData = JSON.parse(import_fs3.default.readFileSync("./package.json", "utf8"));
    return packageData;
  } catch (error) {
    console.error("Error reading package.json:", error);
    return { title: "", description: "" };
  }
};
var getPackageInfo_default = getPackageInfo;

// src/core/extract-utils/getTitleAndDescription.ts
var import_path3 = __toESM(require("path"));

// helpers/uppercaseFirstLetter.ts
var uppercaseFirstLetter = (str) => {
  if (!str) {
    console.error("Non string value received");
    return "";
  }
  return `${str[0].toUpperCase()}${str.slice(1)}`;
};
var uppercaseFirstLetter_default = uppercaseFirstLetter;

// src/core/extract-utils/getTitleAndDescription.ts
var getTitleAndDescription = (packageData) => {
  let {
    name: title = "Nest.js app",
    description = "Nest.js server API"
  } = { ...packageData };
  if (!title) {
    title = uppercaseFirstLetter_default(import_path3.default.basename(process.cwd()));
  }
  return {
    title,
    description: description || `${title} ${defaultDescription}`
  };
};
var getTitleAndDescription_default = getTitleAndDescription;

// src/core/markdown-utils/helpers/getControllerText.ts
var getControllerText = (details) => `
### Controller path: ${details.path}

#### Endpoints:

${details.endpoints.map((endpoint) => {
  const detailLines = endpoint.details.map((detail) => `
    Name: ${detail.name}
    Type: ${detail.type}
    Source: ${detail.source}
`);
  return `Path: ${endpoint.path}
Method: ${endpoint.method}
Entries: 
  ${detailLines.join("")}`;
})}
`;
var getControllerText_default = getControllerText;

// src/core/markdown-utils/listControllers.ts
var listControllers = (modulesData) => {
  let controllersText = "## Controllers \n";
  modulesData.forEach((module2) => {
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

// src/core/markdown-utils/helpers/addScriptsGroup.ts
var import_fs4 = __toESM(require("fs"));

// src/core/markdown-utils/helpers/utils/hasScript.ts
var hasScript = (packageJson, scriptName) => {
  if (!packageJson || !packageJson["scripts"]) {
    return false;
  }
  return scriptName in packageJson["scripts"];
};
var hasScript_default = hasScript;

// src/core/markdown-utils/helpers/addScriptsGroup.ts
var addScriptsGroup = (groupName, scripts) => {
  try {
    const packageJsonData = import_fs4.default.readFileSync("./package.json", "utf-8");
    const packageJson = JSON.parse(packageJsonData);
    let groupContent = `
## ${groupName}

\`\`\`bash`;
    scripts.forEach(({ tag, command, isDefault }) => {
      if (hasScript_default(packageJson, command) || isDefault) {
        if (tag) {
          groupContent += `
 # ${tag}`;
        }
        groupContent += `
 npm run ${command}`;
      }
    });
    groupContent += `
\`\`\``;
    return groupContent;
  } catch (error) {
    console.error("Error reading package.json:", error);
  }
};
var addScriptsGroup_default = addScriptsGroup;

// src/core/markdown-utils/addCommands.ts
var installation = addScriptsGroup_default("Installation", installationScripts);
var running = addScriptsGroup_default("Running", runningScripts);
var testing = addScriptsGroup_default("Testing", runningScripts);
var getCommandsContent = () => {
  return `
  ${installation}
  ${running}
  ${testing}
`;
};
var addCommands_default = getCommandsContent;

// src/core/generateReadmeContent.ts
var generateReadmeContent = () => {
  const packageInfo = getPackageInfo_default();
  const metaData = getTitleAndDescription_default(packageInfo);
  const controllersData = extractControllers_default();
  return `# ${metaData == null ? void 0 : metaData.title}
  
## Description
${metaData == null ? void 0 : metaData.description}

${listControllers_default(controllersData)}
${addCommands_default()}
`;
};
var generateReadmeContent_default = generateReadmeContent;

// src/commands/utils/applyNewContent.ts
var applyNewContent = (operation, readmePath2) => {
  const newContent = generateReadmeContent_default();
  if (operation === "create") {
    return import_fs5.default.writeFileSync(readmePath2, newContent);
  }
  import_fs5.default.appendFileSync(readmePath2, "\n" + newContent);
};
var applyNewContent_default = applyNewContent;

// src/commands/updateReadme.ts
var readmePath = import_path4.default.join(process.cwd(), "README.md");
var checkForReadme = () => {
  if (import_fs6.default.existsSync(readmePath)) {
    const rl = import_readline.default.createInterface({
      input: process.stdin,
      output: process.stdout
    });
    rl.question(
      "README.md already exists. What would you like to do? (append/create/replace):",
      (answer) => {
        if (answer.toLowerCase() === "append") {
          applyNewContent_default("append", readmePath);
        } else {
          if (answer === "create") {
            const timestamp = (/* @__PURE__ */ new Date()).toISOString().replace(/[-:]/g, "").replace("T", "_").split(".")[0];
            readmePath = readmePath.slice(0, -3) + `_${timestamp}.md`;
          }
          applyNewContent_default("create", readmePath);
        }
        rl.close();
      }
    );
  } else {
    applyNewContent_default("create", readmePath);
  }
};
var updateReadme_default = checkForReadme;

// src/index.ts
updateReadme_default();
