import * as fs from 'fs';
import * as path from 'path';

const getEnvVariables = (
  filePath?: string
): Record<string, string> => {
  const possibleFiles = [".env", '.env.production', '.env.development'];
  let envPath = '';
  if (filePath && fs.existsSync(filePath)) {
    envPath = filePath;
  } else {
    for (const file of possibleFiles) {
      const resolvedPath = path.resolve(process.cwd(), file);
      if (fs.existsSync(resolvedPath)) {
        envPath = resolvedPath;
        break;
      }
    }
  }

  if (!envPath) {
    throw new Error(`No environment file found at paths: ${possibleFiles.join(', ')}`);
  }

  const envContent = fs.readFileSync(envPath, 'utf-8');
  const envVariables: Record<string, string> = {};

  envContent.split('\n').forEach(line => {
    // Remove comments and trim whitespace
    const cleanedLine = line.split('#')[0].trim();

    // Ignore empty lines
    if (cleanedLine) {
      const [key, ...value] = cleanedLine.split('=');
      const joinedValue = value.join('=').trim();

      // Remove surrounding quotes if they exist
      const finalValue = joinedValue.replace(/^['"]|['"]$/g, '');

      envVariables[key.trim()] = finalValue;
    }
  });

  return envVariables;
}

export default getEnvVariables