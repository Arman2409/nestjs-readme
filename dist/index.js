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

// src/commands/checkForReadme.ts
var import_fs3 = __toESM(require("fs"));
var import_path2 = __toESM(require("path"));
var import_readline = __toESM(require("readline"));

// src/commands/utils/updateReadme.ts
var import_fs2 = __toESM(require("fs"));

// data/readme-parts.ts
var installation = `
## Installation
\`\`\`bash
$ npm install
\`\`\`

## Running the app
\`\`\`bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
\`\`\`
`;
var testing = `
## Test
\`\`\`bash
# unit tests
$ npm run test

# e2e tests
$ npm run test:e2e

# test coverage
$ npm run test:cov
\`\`\`
  `;

// src/core/utils/getPackageInfo.ts
var import_fs = __toESM(require("fs"));
var getPackageInfo = () => {
  try {
    const packageData = JSON.parse(import_fs.default.readFileSync("./package.json", "utf8"));
    return packageData;
  } catch (error) {
    console.error("Error reading package.json:", error);
    return { title: "", description: "" };
  }
};
var getPackageInfo_default = getPackageInfo;

// src/core/utils/getTitleAndDescription.ts
var import_path = __toESM(require("path"));

// helpers/uppercaseFirstLetter.ts
var uppercaseFirstLetter = (str) => {
  if (!str) {
    console.error("Non string value received");
    return "";
  }
  return `${str[0].toUpperCase()}${str.slice(1)}`;
};
var uppercaseFirstLetter_default = uppercaseFirstLetter;

// src/core/utils/getTitleAndDescription.ts
var getTitleAndDescription = (packageData) => {
  let {
    name = "Nest.js app",
    description = "Nest.js server API"
  } = { ...packageData };
  if (!name) {
    name = import_path.default.basename(process.cwd());
  }
  return {
    title: uppercaseFirstLetter_default(name),
    description
  };
};
var getTitleAndDescription_default = getTitleAndDescription;

// src/core/generateReadmeContent.ts
var generateReadmeContent = () => {
  const packageInfo = getPackageInfo_default();
  const metaData = getTitleAndDescription_default(packageInfo);
  return `# ${metaData == null ? void 0 : metaData.title}
  
## Description
${metaData == null ? void 0 : metaData.description}

${installation}
${testing}
`;
};
var generateReadmeContent_default = generateReadmeContent;

// src/commands/utils/updateReadme.ts
var updateReadme = (operation, readmePath2) => {
  const newContent = generateReadmeContent_default();
  if (operation === "create") {
    return import_fs2.default.writeFileSync(readmePath2, newContent);
  }
  import_fs2.default.appendFileSync(readmePath2, "\n" + newContent);
};
var updateReadme_default = updateReadme;

// src/commands/checkForReadme.ts
var readmePath = import_path2.default.join(process.cwd(), "README.md");
var checkForReadme = () => {
  if (import_fs3.default.existsSync(readmePath)) {
    const rl = import_readline.default.createInterface({
      input: process.stdin,
      output: process.stdout
    });
    rl.question(
      "README.md already exists. What would you like to do? (append/create/replace):",
      (answer) => {
        if (answer.toLowerCase() === "append") {
          updateReadme_default("append", readmePath);
        } else {
          if (answer === "create") {
            const timestamp = (/* @__PURE__ */ new Date()).toISOString().replace(/[-:]/g, "").replace("T", "_").split(".")[0];
            readmePath = readmePath.slice(0, -3) + `_${timestamp}.md`;
          }
          updateReadme_default("create", readmePath);
        }
        rl.close();
      }
    );
  } else {
    updateReadme_default("create", readmePath);
  }
};
var checkForReadme_default = checkForReadme;

// src/index.ts
checkForReadme_default();
