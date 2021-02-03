import got from "got"

import { dayjs } from "../lib/dayjs"
import { formatTimeularDate, parseTimeularDate } from "./date"
import { TimeularEntries } from "./types"

/**
 * https://developers.timeular.com/#d4c6e3c4-c38b-4891-aa19-907460f43f9b
 */
export async function getTimeularEntries(accessToken: string, date: dayjs.Dayjs) {
  const from = date.startOf("day")
  const to = date.endOf("day")

  const fromStr = formatTimeularDate(from)
  const toStr = formatTimeularDate(to)

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
    .filter(entry => {
      const date = parseTimeularDate(entry.duration.startedAt)
      return date.isAfter(from) && date.isBefore(to)
    })
    .sort((a, b) => a.duration.startedAt.localeCompare(b.duration.startedAt))
}
