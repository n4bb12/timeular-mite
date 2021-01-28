import "./env"
import { getCurrentMapping } from "./getCurrentMapping"
import { getDateRange } from "./getDateRange"
import { mapEntry } from "./mapEntries"
import { getMiteAccessToken, getMiteAccountName } from "./mite"
import { createMiteEntry, deleteMiteEntry, getMiteEntries } from "./mite/entries"
import { getTimeularAccessToken, getTimeularEntries } from "./timeular"

async function main() {
  const timeularAccessToken = await getTimeularAccessToken()
  const miteAccountName = getMiteAccountName()
  const miteAccessToken = getMiteAccessToken()
  const mapping = await getCurrentMapping({ required: true })

  const dates = getDateRange(process.argv[2])

  for (const date of dates) {
    const dateStr = date.toISOString().split("T")[0]
    console.log("=".repeat(10), "Processing", dateStr)

    const miteEntries = await getMiteEntries(miteAccountName, miteAccessToken, date)

    if (miteEntries.find(entry => entry.time_entry.locked)) {
      console.log("Skipping", dateStr, "because it has a locked entry in Mite")
      continue
    }

    for (const entry of miteEntries) {
      await deleteMiteEntry(miteAccountName, miteAccessToken, entry.time_entry.id)
    }

    const timeularEntries = await getTimeularEntries(timeularAccessToken, date)

    for (const entry of timeularEntries) {
      const mapped = mapEntry(mapping, entry)

      if (mapped) {
        await createMiteEntry(miteAccountName, miteAccessToken, mapped)
      }
    }
  }
}

main().catch(console.error)
