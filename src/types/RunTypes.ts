import { Script, SimpleScript } from './ScriptTypes';
import { Project } from './ProjectTypes';
import { Scenario } from './ScenarioTypes';

export type Run = {
	run_id: number;
	title: string;
	project_id: Project['id'];
	scenario_id: Scenario['scenario_id'];
	script_runs: ScriptRun[];
	status: string;
	info: string;
	created_at: string;
	updated_at: string;
	percentage_of_target: number;
	user_name: string;
	preferred_username: string;
};

export type TypeScriptRun =
	| 'TYPE_SCRIPT_RUN_EXTENDED_UNSPECIFIED'
	| 'TYPE_SCRIPT_RUN_SIMPLE';

export type ScriptRunStatus =
	| 'STATUS_STOPPED_UNSPECIFIED'
	| 'STATUS_RUNNING'
	| 'STATUS_FAILED'
	| 'STATUS_STOPPING';

export type RunStatus =
	| 'STATUS_STOPPED_UNSPECIFIED'
	| 'STATUS_PREPARED'
	| 'STATUS_RUNNING'
	| 'STATUS_SCHEDULED'
	| 'STATUS_STOPPING'
	| 'UNKNOWN';

export type ScriptRun = {
	run_id: string;
	run_script_id: string;
	script: Script|null;
	status: string;
	agent: {
		agent_id: string;
		host_name: string;
		port: string;
		enabled: boolean;
		tags: string[];
	};
	info: string;
	pid: string;
	log_file_name: string;
	k6_api_port: string;
	port_prometheus: string;
	target: number;
	metrics: {
		rps: string;
		rt90p: string;
		rt95p: string;
		rt_max: string;
		rt99p: string;
		failed: string,
		vus: string,
		sent: string,
		received: string
		variety_ts: string;
		checks: string;
		progress_bar: string;
		current_test_run_duration: string;
		execution_status: "Running" | "Created" | "InitVUs" | "InitExecutors" | "InitDone" | "PausedBeforeRun" | "Started" | "Setup" | "Teardown" | "Interrupted" | "Ended";
		full_iteration_count: string;
		active_vus_count: string;
		has_started: string;
		has_ended: string;
		failed_rate: string;
		dropped_iterations: string;
	};
	simple_script: SimpleScript|null;
	type_script_run: TypeScriptRun;
};

export type ScriptRunInfo = Omit<ScriptRun, "script" | "simple_script"> & {
	_script_name: string;
	_description: string;
	_steps: string;
	_duration: string;
	_script_link: string;
}

// {
// 	_script_name: string;
// 	_description: string;
// } &
// ScriptRun & {
// 	_script_name: string;
// };
// Omit<ScriptRun, "script" & "simple_script">;

export function scriptRunToScriptRunInfo(scriptRun: ScriptRun): ScriptRunInfo {
	return {
		...scriptRun,
		_script_name: scriptRun.type_script_run
			=== ScriptRunType.TYPE_SCRIPT_RUN_SIMPLE
			? scriptRun.simple_script?.name
			: scriptRun.script?.name,
		_description: scriptRun.type_script_run
			=== ScriptRunType.TYPE_SCRIPT_RUN_SIMPLE
			? scriptRun.simple_script?.description
			: scriptRun.script?.descrip,
		_steps: scriptRun.type_script_run
			=== ScriptRunType.TYPE_SCRIPT_RUN_SIMPLE
			? scriptRun.simple_script?.steps
			: scriptRun.script?.options.steps,
		_duration: scriptRun.type_script_run
			=== ScriptRunType.TYPE_SCRIPT_RUN_SIMPLE
			? scriptRun.simple_script?.duration
			: scriptRun.script?.options.duration,
		_script_link: scriptRun.type_script_run
			=== ScriptRunType.TYPE_SCRIPT_RUN_SIMPLE
			? scriptRun.simple_script?.script_file_url
			: scriptRun.script?.script_file,

	} as ScriptRunInfo;
}

// eslint-disable-next-line no-shadow
export const enum ScriptRunType {
	TYPE_SCRIPT_RUN_SIMPLE = 'TYPE_SCRIPT_RUN_SIMPLE',
	TYPE_SCRIPT_RUN_EXTENDED_UNSPECIFIED = 'TYPE_SCRIPT_RUN_EXTENDED_UNSPECIFIED',
}

export type GetRunResponse = {
	status: boolean;
	message: string;
	run: Run | null;
};

export type GetScriptRunResponse = {
	script_runs: ScriptRun[]
	error: {
		code: string,
		message: string
		// "details": {}
	}
};

export type GetAllRunsResponse = {
	status: boolean;
	message: string;
	runs: Run[];
};

export type StopRunResponse = {
	status: boolean;
	message: string;
	run: Run;
};

export type StartRunResponse = {
	status: boolean;
	message: string;
	run: Run;
};

export type StartScriptRunResponse = {
	status: boolean;
	message: string;
	run: Run;
};

export type StartSimpleScriptRunResponse = {
	status: boolean;
	message: string;
	run: Run;
};

export type StartScriptResponse = {
	status: boolean;
	message: string;
	run: ScriptRun;
};

export type StopScriptRunResponse = {
	status: boolean;
	message: string;
	run: ScriptRun;
};

export type AdjustmentRpsResponse = {
	status: boolean;
	message: string;
};

export type GetByStatusResponse = {
	status: boolean;
	message: string;
	runs: Run[];
	total_pages: string;
};
export type LoadlevelStatus = {
	current_level: number,
	next_level: number,
	can_change: boolean,
	run_status: RunStatus
}
export type IsChangeLoadlevelResponse = {
	current_level: number,
	next_level: number,
	can_change: boolean,
	run_status: RunStatus,
	data: unknown,
	error: {
		code: string,
		message: string,
		details: unknown
	}
}

export type GetTotalRunRPSResponse = {
	status: boolean;
	rps: string;
	data: unknown,
	error: {
		code: string,
		message: string,
		details: unknown
	}
}
