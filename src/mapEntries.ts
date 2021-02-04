import { DeepPartial } from "utility-types"

import { Mapping } from "./getMappingConfig"
import { formatMiteDate, MiteEntry } from "./mite"
import { parseTimeularDate, TimeularEntry } from "./timeular"

export function mapEntry(entry: TimeularEntry, mapping: Mapping): DeepPartial<MiteEntry> | undefined {
  const { project, service } = mapping[entry.activityId]

  if (!project || !service) {
    console.error(`Failed to map Timeular entry, the mapping is incomplete: ${entry.id}`)
    return
  }

  const from = parseTimeularDate(entry.duration.startedAt)
  const to = parseTimeularDate(entry.duration.stoppedAt)

  const roundedMinutes = Math.round(to.diff(from, "minutes", true))
  const noteWithTags = [entry.note.text || "", ...entry.note.tags].filter(Boolean).join("\n")

  const miteEntry: DeepPartial<MiteEntry> = {
    time_entry: {
      date_at: formatMiteDate(from),
      minutes: roundedMinutes,
      note: noteWithTags,
      project_id: project,
      service_id: service,
    },
  }

  return miteEntry
}
