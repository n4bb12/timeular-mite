import dayjs from "dayjs"
import { DeepPartial } from "utility-types"

import { Mapping } from "./getCurrentMapping"
import { MiteEntry } from "./mite"
import { TimeularEntry } from "./timeular"

export function mapEntry(mapping: Mapping, entry: TimeularEntry): DeepPartial<MiteEntry> | undefined {
  const { project, service } = mapping[entry.activityId]

  if (!project || !service) {
    console.error(`Failed to map Timeular entry, the mapping is incomplete: ${entry.id}`)
    return
  }

  const from = entry.duration.startedAt
  const to = entry.duration.stoppedAt

  const miteEntry: DeepPartial<MiteEntry> = {
    time_entry: {
      date_at: from.split("T")[0],
      minutes: dayjs(to).diff(from, "minutes"),
      note: [entry.note.text || "", ...entry.note.tags].filter(Boolean).join("\n"),
      project_id: project,
      service_id: service,
    },
  }

  return miteEntry
}
