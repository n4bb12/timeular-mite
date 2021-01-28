export interface TimeularActivity {
  id: string
  name: string
  color: string
  integration: string
  spaceId: string
  deviceSide: null
}

export interface TimeularActivities {
  activities: TimeularActivity[]
  inactiveActivities: TimeularActivity[]
  archivedActivities: TimeularActivity[]
}

export interface TimeularEntry {
  id: string
  activityId: string
  duration: {
    startedAt: string
    stoppedAt: string
  }
  note: {
    text: string | null
    tags: string[]
    mentions: string[]
  }
}

export interface TimeularEntries {
  timeEntries: TimeularEntry[]
}
