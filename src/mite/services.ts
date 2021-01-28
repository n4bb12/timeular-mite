import got from "got"

import { MiteService } from "./types"

/**
 * https://mite.yo.lk/en/api/services.html#list-active
 */
export async function getMiteServices(accountName: string, apiKey: string) {
  const url = `https://${accountName}.mite.yo.lk/services.json`
  console.log("GET", url)

  const { body } = await got.get<MiteService[]>(url, {
    responseType: "json",
    headers: { "X-MiteApiKey": apiKey },
  })

  return body
}
