import { installationScripts, runningScripts, testingScripts } from "../../../data/scripts";
import addScriptsGroup from "./helpers/addScriptsGroup";

const groupsData = [
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
]

const scriptsGroups: string[] = []
groupsData.forEach(({name, scripts}) => {
   const groupText = addScriptsGroup(name, scripts);
   if(groupText) {
    scriptsGroups.push(groupText);
   }
})

const addCommands = () => {
    return `
  ${scriptsGroups.map(group => group)}
`
}

export default addCommands;