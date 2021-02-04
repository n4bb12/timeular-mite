import { dayjs, Dayjs } from "../lib/dayjs"

export function formatTimeularDate(date: Dayjs) {
  return date.toISOString().split(".")[0] + ".000"
}

export function parseTimeularDate(value: string) {
  return dayjs(value + "Z")
}
