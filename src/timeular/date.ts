import { dayjs } from "../lib/dayjs"

export function formatTimeularDate(date: dayjs.Dayjs) {
  return date.toISOString().split(".")[0] + ".000"
}

export function parseTimeularDate(value: string) {
  return dayjs(value + "Z")
}
