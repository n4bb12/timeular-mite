import "./env"
import { fail } from "./fail"
import { dayjs } from "./lib/dayjs"

export function getDateRange(range: string) {
  if (range === "today") {
    const date = dayjs()
    return [date]
  }

  if (range === "yesterday") {
    const date = dayjs().subtract(1, "day")
    return [date]
  }

  const date = dayjs(range)
  if (date.isValid()) {
    return [date]
  }

  fail("The range argument could not be parsed")
  throw new Error()
}
