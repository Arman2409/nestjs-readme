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

const addCommands = (
  packageInfo: JSON
) => {

  const scriptsGroups: string[] = []
  groupsData.forEach(({ name, scripts }) => {
    const groupText = addScriptsGroup(name, scripts, packageInfo);
    if (groupText) {
      scriptsGroups.push(groupText);
    }
  })

  return `
  ${scriptsGroups.map(group => group)}
`
}

export default addCommands;