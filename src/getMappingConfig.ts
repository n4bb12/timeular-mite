import { pathExists, writeFile } from "fs-extra"

import "./env"
import { fail } from "./fail"
import { dayjs } from "./lib/dayjs"

export const mappingFile = "config/mapping.ts"
export const mappingBackupFile = `config/mapping.backup-${dayjs()
  .toISOString()
  .split(".")[0]
  .replace(/[\D\W]/g, "")}.ts`

export interface Mapping {
  [id: string]: { project: number; service: number }
}

export async function getMappingConfig({ required }: { required?: boolean }) {
  let mapping: Mapping | undefined = undefined

  if (process.env.MAPPING_TS) {
    await writeFile(mappingFile, process.env.MAPPING_TS, "utf8")
  }

  if (await pathExists(mappingFile)) {
    try {
      mapping = require("../config/mapping").mapping
    } catch (error) {
      console.error("The mapping file at config/mapping.ts appears to be corrupt:")
      console.error(error)
    }
  }

  if (required && !mapping) {
    fail("MAPPING_TS or config/mapping.ts not found")
    throw new Error()
  }

  return mapping || {}
}
