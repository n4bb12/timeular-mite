import dayjs from "dayjs"
import got from "got"
import { DeepPartial } from "utility-types"

import { MiteEntry } from "./types"

/**
 * https://mite.yo.lk/en/api/time-entries.html#list-daily
 */
export async function getMiteEntries(accountName: string, apiKey: string, date: dayjs.Dayjs) {
  const dateStr = date.toISOString().split("T")[0]

  const url = `https://${accountName}.mite.yo.lk/time_entries.json?user_id=current&at=${dateStr}`
  console.log("GET", url)

  const { body } = await got.get<MiteEntry[]>(url, {
    responseType: "json",
    headers: { "X-MiteApiKey": apiKey },
  })

  return body
}

/**
 * https://mite.yo.lk/en/api/time-entries.html#delete
 */
export async function deleteMiteEntry(accountName: string, apiKey: string, id: MiteEntry["time_entry"]["id"]) {
  const url = `https://${accountName}.mite.yo.lk/time_entries/${id}.json`
  console.log("DELETE", url)

  const { body } = await got.delete<MiteEntry>(url, {
    responseType: "json",
    headers: { "X-MiteApiKey": apiKey },
  })

  return body
}

/**
 * https://mite.yo.lk/en/api/time-entries.html#create
 */
export async function createMiteEntry(accountName: string, apiKey: string, entry: DeepPartial<MiteEntry>) {
  const url = `https://${accountName}.mite.yo.lk/time_entries.json`
  console.log("POST", url)

  const { body } = await got.post<MiteEntry>(url, {
    responseType: "json",
    headers: { "X-MiteApiKey": apiKey },
    json: entry,
  })

  return body
}
