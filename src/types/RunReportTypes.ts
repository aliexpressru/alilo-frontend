export interface GetRunReportResponse {
    report: Report
    report_status: string
    report_link: string
    run_id: number
    user_name: string
    preferred_user_name: string
}

export interface Report {
    name: string
    data_range: DataRange
    run_id: number
    run_link: string
    project_id: number
    project_link: string
    scenario_id: number
    scenario_link: string
    percentage_of_target: number
    user_name: string
    preferred_user_name: string
    count_script_runs: string
    scenario_selectors: any[]
    scenario_metrics: any[]
    script_summary: ScriptSummary[]
}

export interface DataRange {
    from: string
    to: string
}

export interface ScriptSummary {
    script_name: string
    script_runs_summary: ScriptRunsSummary
    log_file_names: string[]
    trace_ids: TraceId[]
    script_runs_metrics: ScriptRunsMetric[]
    urls: string[]
    logs_link: string[]
}

export interface ScriptRunsSummary {
    run_id: number
    run_script_id: number
    // TODO: fix for charts
    script: Script
    simple_script: SimpleScript
    status: string
    agent: Agent
    info: string
    pid: string
    log_file_name: string
    k6_api_port: string
    port_prometheus: string
    target: number
    metrics: Metrics
    type_script_run: string
}

export interface Agent {
    agent_id: number
    host_name: string
    port: string
    enabled: boolean
    tags: string[]
    cpu_used: number
    mem_used: number
    ports_used: number
}

export interface Metrics {
    rps: string
    rt90p: string
    rt95p: string
    rt_max: string
    rt99p: string
    failed: string
    vus: string
    sent: string
    received: string
    variety_ts: number
    checks: string
    progress_bar: string
    current_test_run_duration: string
    execution_status: string
    full_iteration_count: string
    active_vus_count: string
    has_started: boolean
    has_ended: boolean
    failed_rate: string
    dropped_iterations: string
}

export interface Selectors {
    expr_rps: string
    source_rps: string
    cmt_rps: string
    expr_rt: string
    source_rt: string
    cmt_rt: string
    expr_err: string
    source_err: string
    cmt_err: string
}

export interface TraceId {
    trace_id: string
    trace_time: string
    project_id: number
    scenario_id: number
    script_id: number
    run_id: number
    run_script_id: number
    agent: string
    url_paths: string[]
}

// ---

// export interface GetRunReportResponse {
//     name: string
//     data_range: DataRange
//     run_id: number
//     run_link: string
//     project_id: number
//     project_link: string
//     scenario_id: number
//     scenario_link: string
//     percentage_of_target: number
//     user_name: string
//     preferred_user_name: string
//     count_script_runs: number
//     script_summary: ScriptSummary[]
// }

// export interface DataRange {
//     from: From
//     to: To
// }

// export interface From {
//     seconds: number
//     nanos: number
// }

// export interface To {
//     seconds: number
//     nanos: number
// }

// export interface ScriptSummary {
//     script_name: string
//     script_runs_summary: ScriptRunsSummary
//     log_file_names: string[]
//     trace_ids: TraceId[]
//     script_runs_metrics: ScriptRunsMetric[]
//     urls: string[]
//     logs_link: string[]
// }

// export interface ScriptRunsSummary {
//     run_id: number
//     run_script_id: number
//     script: Script
//     agent: Agent
//     info: string
//     pid: number
//     log_file_name: string
//     target: number
//     metrics: Metrics
// }

export interface Script {
    name: string
    descrip?: string
    script_id: number
    project_id: number
    scenario_id: number
    script_file: string
    ammo_id: string
    options: Options
    enabled: boolean
    tag: string
    selectors: Selectors
    grafana_url?: string[]
}

export interface Options {
    rps: string
    steps: string
    duration: string
}

export interface SimpleScript {
    name: string
    description: string
    script_id: number
    project_id: number
    scenario_id: number
    enabled: boolean
    tag: string
    path: string
    http_method: string
    // query_params: QueryParam[]
    // headers: Headers
    ammo_url: string
    rps: string
    duration: string
    steps: string
    max_v_us: string
    script_file_url: string
    selectors: Selectors
    title: string
}

export interface Selectors {
    expr_rps: string
    source_rps: string
    cmt_rps: string
    expr_rt: string
    source_rt: string
    cmt_rt: string
    source_err: string
    cmt_err: string
}

// export interface Selectors {
//     expr_rps: string
//     source_rps: string
//     cmt_rps?: string
//     expr_rt: string
//     source_rt: string
//     cmt_rt?: string
//     source_err: string
//     expr_err?: string
//     cmt_err?: string
// }

// export interface Agent {
//     agent_id: number
//     host_name: string
//     port: string
//     enabled: boolean
//     tags: string[]
//     cpu_used: number
//     mem_used: number
//     ports_used: number
// }

// export interface Metrics {
//     rps: string
//     rt90p: string
//     rt95p: string
//     rt_max: string
//     rt99p: string
//     vus: string
//     sent: string
//     received: string
//     variety_ts: number
//     checks: number
//     progress_bar: string
//     current_test_run_duration: CurrentTestRunDuration
//     execution_status: string
//     full_iteration_count: number
//     active_vus_count: string
//     has_started: boolean
//     failed_rate: string
//     dropped_iterations: string
//     failed?: number
// }

// export interface CurrentTestRunDuration {
//     seconds: number
//     nanos: number
// }

// export interface TraceId {
//     trace_id: string
//     trace_time: TraceTime
//     project_id: number
//     scenario_id: number
//     script_id: number
//     run_id: number
//     run_script_id: number
//     agent: string
//     url_paths: string[]
// }

// export interface TraceTime {
//     seconds: number
//     nanos: number
// }

export interface ScriptRunsMetric {
    name: string
    description?: string
    status: string
    data: Data
    stats: Stats
}

export interface Data {
    result_type: string
    result?: Result[]
}

export interface Result {
    values: Value[]
    metric?: Metric
}

export interface Value {
    timestamp: number
    data?: number
}

export interface Metric {
    method: string
}

export interface Stats {
    series_fetched: string
    execution_time_msec?: number
}

// ---

export interface getReportStatusResponse {
    entre: ReportStatus[]
    error: {
        code: string
        message: string
    }
}

export type RunReportStatusType = "STATUS_UNSPECIFIED" | "STATUS_COMPLETE" | "STATUS_PROCESSING" | "STATUS_NOT_APPLIED" | "STATUS_FAILED"

export interface ReportStatus {
    // TODO: remove field on back side
    // report: null
    report_status: RunReportStatusType
    report_link: string
    run_id: number
    user_name: string
    preferred_user_name: string
    details: string
}


/*
* Types for report functions
*/

export type ReportData = {
    total: TotalData
    successScripts: SuccessScripts
    scripts: ScriptData[]
}
export type TotalData = {
    rpsSummary: number
    rtMax: number
    errorsAvg: number
}
export type ScriptData = {
    scriptName: string
    scriptId: number
    runScriptId: number
    description?: string
    usedUrls: string[]
    traces: string[]
    logLinks: string[]
    rps?: RPS
    rt?: RT
    errors?: Errors
}

export type SuccessScripts = {
    total: number
    withErrors: number
}

export type RPS = {
    max: number
    rpsSeriesData?: Value[]
}

export type RT = {
    avg?: number
    rtSeriesData?: Value[]
}

export type Errors = {
    percent?: number
    errorsSeriesData?: Value[]
}
