import dayjs from "dayjs"
import got from "got"

import { TimeularEntries } from "./types"

function formatDate(date: dayjs.Dayjs) {
  return date.toISOString().split(".")[0] + ".000"
}

/**
 * https://developers.timeular.com/#d4c6e3c4-c38b-4891-aa19-907460f43f9b
 */
export async function getTimeularEntries(accessToken: string, date: dayjs.Dayjs) {
  const from = date.startOf("day")
  const to = date.endOf("day")

  const fromStr = formatDate(from)
  const toStr = formatDate(to)

  const url = `https://api.timeular.com/api/v3/time-entries/${fromStr}/${toStr}`
  console.log("GET", url)

  const { body } = await got.get<TimeularEntries>(url, {
    responseType: "json",
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  })

  // If entries cross midnight then we look at which day it started on and only count that version.
  return body.timeEntries
    .filter(entry => dayjs(entry.duration.startedAt).isAfter(from))
    .filter(entry => dayjs(entry.duration.startedAt).isBefore(to))
    .sort((a, b) => a.duration.startedAt.localeCompare(b.duration.startedAt))
}
