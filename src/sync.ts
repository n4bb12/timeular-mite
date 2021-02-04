import "./env"
import { getMappingConfig } from "./getMappingConfig"
import { getDateRange } from "./getDateRange"
import { mapEntry } from "./mapEntries"
import { getMiteAccessToken, getMiteAccountName, MiteEntry } from "./mite"
import { createMiteEntries, deleteMiteEntries, getMiteEntries } from "./mite/entries"
import { getTimeularAccessToken, getTimeularEntries } from "./timeular"

async function main() {
  const timeularAccessToken = await getTimeularAccessToken()
  const miteAccountName = getMiteAccountName()
  const miteAccessToken = getMiteAccessToken()
  const mappingConfig = await getMappingConfig({ required: true })

  const dates = getDateRange(process.argv[2])

  for (const date of dates) {
    const dateStr = date.toISOString().split("T")[0]
    console.log("=".repeat(10), "Processing", dateStr)

    const miteEntries = await getMiteEntries(miteAccountName, miteAccessToken, date)

    if (miteEntries.find(entry => entry.time_entry.locked)) {
      console.log("Skipping", dateStr, "because it has a locked entry in Mite")
      continue
    }

    await deleteMiteEntries(miteAccountName, miteAccessToken, miteEntries)

    const timeularEntries = await getTimeularEntries(timeularAccessToken, date)
    const mappedEntries = timeularEntries
      .map(entry => mapEntry(entry, mappingConfig))
      .filter((mapped): mapped is MiteEntry => !!mapped)

    await createMiteEntries(miteAccountName, miteAccessToken, mappedEntries)
  }
}

main().catch(console.error)
