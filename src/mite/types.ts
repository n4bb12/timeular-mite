export interface MiteProject {
  project: {
    budget: number
    budget_type: string
    created_at: string
    customer_id: number
    hourly_rate: number
    id: number
    name: string
    note: string
    updated_at: string
    archived: boolean
    active_hourly_rate: null
    hourly_rates_per_service: []
    customer_name: string
  }
}

export interface MiteService {
  service: {
    billable: boolean
    created_at: string
    hourly_rate: number
    id: number
    name: string
    note: string
    updated_at: string
    archived: boolean
  }
}

export interface MiteEntry {
  time_entry: {
    billable: boolean
    created_at: string
    date_at: string
    id: number
    locked: boolean
    minutes: number
    started_time: string | null
    project_id: number
    revenue: number
    hourly_rate: number
    service_id: number
    updated_at: string
    user_id: number
    note: string
    user_name: string
    customer_id: number
    customer_name: string
    project_name: string
    service_name: string
  }
}
