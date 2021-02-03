import { dayjs } from "../lib/dayjs"

export function formatMiteDate(date: dayjs.Dayjs) {
  return date.format("YYYY-MM-DD")
}
