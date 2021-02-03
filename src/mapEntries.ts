import { DeepPartial } from "utility-types"

import { Mapping } from "./getCurrentMapping"
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

  const miteEntry: DeepPartial<MiteEntry> = {
    time_entry: {
      minutes: dayjs(to).diff(from, "minutes"),
      note: [entry.note.text || "", ...entry.note.tags].filter(Boolean).join("\n"),
      date_at: formatMiteDate(from),
      project_id: project,
      service_id: service,
    },
  }

  return miteEntry
}
