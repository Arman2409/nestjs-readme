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
var import_fs2 = __toESM(require("fs"));
var import_path = __toESM(require("path"));
var import_readline = __toESM(require("readline"));

// src/commands/utils/updateReadme.ts
var import_fs = __toESM(require("fs"));

// src/core/generateReadmeContent.ts
var generateReadmeContent = () => {
  return `
  # Project Title
  
  ## Description
  A brief description of the project.
  
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
  
  ## Test
  \`\`\`bash
  # unit tests
  $ npm run test
  
  # e2e tests
  $ npm run test:e2e
  
  # test coverage
  $ npm run test:cov
  \`\`\`
  
  ## License
  [MIT](LICENSE)
    `;
};
var generateReadmeContent_default = generateReadmeContent;

// src/commands/utils/updateReadme.ts
var updateReadme = (operation, readmePath2) => {
  const newContent = generateReadmeContent_default();
  if (operation === "create") {
    return import_fs.default.writeFileSync(readmePath2, newContent);
  }
  import_fs.default.appendFileSync(readmePath2, "\n" + newContent);
};
var updateReadme_default = updateReadme;

// src/commands/checkForReadme.ts
var readmePath = import_path.default.join(process.cwd(), "README.md");
var checkForReadme = () => {
  if (import_fs2.default.existsSync(readmePath)) {
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
