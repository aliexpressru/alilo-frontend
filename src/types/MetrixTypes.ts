export interface ExprErrorResponse {
    data?: Data
    error?: Error
}

export interface ExprResponse {
    status: "failed" | "success"
    is_partial?: boolean
    data?: Data
    stats?: Stats
    error?: Error
}

export interface Data {
    result_type: string
    result: Result[]
}

export interface Result {
    metric: Metric
    values: Value[]
}

export interface Metric {
    name: string
    client_name?: string
    status?: string
    job: string
    instance: string
}

export interface Value {
    timestamp: string
    data: string
}

export interface Stats {
    series_fetched: string
    execution_time_msec: string
}

export interface Error {
    code: string
    message: string
    details: string | null
}

export type DataSourceResponse = {
    data_sources: DataSource[]
}

export type DataSource = {
    id: number
    name: string
    json_data: JsonData
}

export interface JsonData {
    direct_url: string
}

