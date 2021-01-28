import got from "got"

import { MiteProject } from "./types"

/**
 * https://mite.yo.lk/en/api/projects.html#list-active
 */
export async function getMiteProjects(accountName: string, apiKey: string) {
  const url = `https://${accountName}.mite.yo.lk/projects.json`
  console.log("GET", url)

  const { body } = await got.get<MiteProject[]>(url, {
    responseType: "json",
    headers: { "X-MiteApiKey": apiKey },
  })

  return body
}
