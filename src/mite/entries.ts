import got from "got"
import { DeepPartial } from "utility-types"

import { Dayjs } from "../lib/dayjs"
import { formatMiteDate } from "./date"
import { MiteEntry } from "./types"

/**
 * https://mite.yo.lk/en/api/time-entries.html#list-daily
 */
export async function getMiteEntries(accountName: string, apiKey: string, date: Dayjs) {
  const dateStr = formatMiteDate(date)

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
export async function deleteMiteEntry(accountName: string, apiKey: string, entry: MiteEntry) {
  const url = `https://${accountName}.mite.yo.lk/time_entries/${entry.time_entry.id}.json`
  console.log("DELETE", url)

  const { body } = await got.delete<MiteEntry>(url, {
    responseType: "json",
    headers: { "X-MiteApiKey": apiKey },
  })

  return body
}

export async function deleteMiteEntries(accountName: string, apiKey: string, entries: MiteEntry[]) {
  for (const entry of entries) {
    await deleteMiteEntry(accountName, apiKey, entry)
  }
  console.log(`Deleted ${entries.length} entries from Mite.`)
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

export async function createMiteEntries(accountName: string, apiKey: string, entries: MiteEntry[]) {
  for (const mapped of entries) {
    await createMiteEntry(accountName, apiKey, mapped)
  }
  console.log(`Created ${entries.length} entries in Mite.`)
}
