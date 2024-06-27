const generateReadmeContent = () => {
    // Here you can add logic to generate the content based on the NestJS project
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
}

export default generateReadmeContent;