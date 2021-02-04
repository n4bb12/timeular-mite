import { Dayjs } from "../lib/dayjs"

export function formatMiteDate(date: Dayjs) {
  return date.format("YYYY-MM-DD")
}
