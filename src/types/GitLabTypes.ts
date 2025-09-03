export type GetActivePipelienesResponse = Pipeliene[]

export interface Pipeliene {
    id: number
    iid: number
    project_id: number
    sha: string
    ref: string
    status: string
    source: string
    created_at: string
    updated_at: string
    web_url: string
    name: unknown
}


export interface GetPipelieneCancelResponse {
    id: number
    iid: number
    project_id: number
    sha: string
    ref: string
    status: string
    source: string
    created_at: string
    updated_at: string
    web_url: string
    before_sha: string
    tag: boolean
    yaml_errors: unknown
    user: User
    started_at: string
    finished_at: unknown
    committed_at: unknown
    duration: unknown
    queued_duration: number
    coverage: unknown
    detailed_status: DetailedStatus
}

export interface User {
    id: number
    username: string
    name: string
    state: string
    avatar_url: string
    web_url: string
}

export interface DetailedStatus {
    icon: string
    text: string
    label: string
    group: string
    tooltip: string
    has_details: boolean
    details_path: string
    illustration: unknown
    favicon: string
}
