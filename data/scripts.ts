import type { Script } from "../types/core"

export const installationScripts: Script[] = [
  {
      command: "install",
      isDefault: true
  },
]

export const runningScripts: Script[]  = [
  {
      command: "start",
      tag: "development"
  },
  {
      command: "start:dev",
      tag: "watch mode"
  },
]

export const testingScripts: Script[]  = [
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
},
]
