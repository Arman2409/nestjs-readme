import { installationScripts, runningScripts } from "../../../data/scripts";
import addScriptsGroup from "./helpers/addScriptsGroup";

const installation = addScriptsGroup('Installation', installationScripts);
const running = addScriptsGroup('Running', runningScripts);
const testing = addScriptsGroup('Testing', runningScripts);

const getCommandsContent = () => {
    return `
  ${installation}
  ${running}
  ${testing}
`
}

export default getCommandsContent;