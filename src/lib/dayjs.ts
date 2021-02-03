import dayjs from "dayjs"
import utc = require("dayjs/plugin/utc")
import timezone = require("dayjs/plugin/timezone")

// The Timeular dates don't contain a time zone.
// This means the date will be interpreted differently on different machines.
//
// Example Timeular date:
// 2021-02-02T23:10:56.360
//
// The above timestamp was created at 00:10, so the local time here was UTC+1.
//
// Correspendingly, the representation with included time zone would have been:
// 2021-02-02T23:10:56.360Z
// 2021-02-03T00:10:56+01:00
//
// Furthermore, in order to query the Timeular API with the correct time ranges,
// we need to send it dates represented in the same local time zone.
// Therefore all dates used in this script need to use the appropriate time zone
// for parsing and formatting.

dayjs.extend(utc)
dayjs.extend(timezone)
dayjs.tz.setDefault(process.env.TIMEULAR_TIMEZONE || "Europe/Berlin")

export { dayjs }
