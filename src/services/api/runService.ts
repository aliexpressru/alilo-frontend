import { http } from '../../axios';
import { sortByKey } from '../../utils/sorters';

import type {
	GetRunResponse,
	StopRunResponse,
	StartRunResponse,
	GetAllRunsResponse,
	StartScriptResponse,
	StopScriptRunResponse,
	AdjustmentRpsResponse,
	GetByStatusResponse,
	Run,
	StartScriptRunResponse,
	GetScriptRunResponse,
	IsChangeLoadlevelResponse,
	GetTotalRunRPSResponse,
} from '../../types/RunTypes';
import { Project } from '../../types/ProjectTypes';
import { Scenario } from '../../types/ScenarioTypes';
import { Script, SimpleScript } from '../../types/ScriptTypes';

type GetAllRunsReq = {
	projectId?: Project['id'] | undefined;
	scenarioId?: Scenario['scenario_id'] | undefined;
	limit?: number;
};

class RunService {
	async getRun(runId: Run['run_id']): Promise<GetRunResponse> {
		const request = {
			run_id: runId,
		};

		const { data } = await http.post<GetRunResponse>(
			// alilo_v2
			'/v1/run',
			// alilo_v1
			// '/v1/run/get',
			request
		);

		return data;
	}

	async getScriptRun(runId: Run['run_id'], scriptName: string): Promise<GetScriptRunResponse> {
		const request = {
			run_id: runId,
			script_name: scriptName
		};

		const { data } = await http.post<GetScriptRunResponse>(
			'/v1/run/scriptruns',
			request
		);

		return data;
	}

	async getAllRuns(req?: GetAllRunsReq): Promise<GetAllRunsResponse> {
		try {
			const request = {
				project_id: req?.projectId ?? 0,
				scenario_id: req?.scenarioId ?? 0,
				limit: req?.limit ?? 0,
				page_number: 0,
			};

			const { data } = await http.post<GetAllRunsResponse>(
				// alilo_v2
				'/v1/runs',
				// alilo_v1
				// '/v1/run/get-all',
				request
			);

			data.runs?.sort(sortByKey('title'));
			return data;
		} catch (e) {
			console.error('There was an error!', e);
			throw e;
		}
	}

	async startRun(
		scenarioId: Scenario['scenario_id'],
		userName: string,
		preferredUsername: string,
		percentage?: Run['percentage_of_target']
	): Promise<StartRunResponse> {
		const request = {
			scenario_id: scenarioId,
			percentage_of_target: percentage ? percentage : 100,
			user_name: userName,
			preferred_user_name: preferredUsername
		};

		const { data } = await http.post<StartRunResponse>(
			'/v1/run/start',
			request
		);

		return data;
	}

	async startScriptRun(
		scriptId: Script['script_id']
	): Promise<StartScriptRunResponse> {
		const request = {
			script_id: scriptId,
		};

		const { data } = await http.post<StartScriptRunResponse>(
			'/v1/run/start/script',
			request
		);

		return data;
	}

	async startSimpleScriptRun(
		simpleScriptId: SimpleScript['script_id']
	): Promise<StartScriptRunResponse> {
		const request = {
			simple_script_id: simpleScriptId,
		};

		const { data } = await http.post<StartScriptRunResponse>(
			'/v1/run/start/simple-script',
			request
		);

		return data;
	}

	async startScript(
		runId: Run['run_id'],
		scriptId: Script['script_id']
	): Promise<StartScriptResponse> {
		const request = {
			run_id: runId,
			script_id: scriptId,
		};

		const { data } = await http.post<StartScriptResponse>(
			'/v1/run/start/script',
			request
		);

		return data;
	}

	async stopRun(runId: Run['run_id']): Promise<StopRunResponse> {
		const request = {
			run_id: runId,
		};

		const { data } = await http.post<StopRunResponse>(
			'/v1/run/stop',
			request
		);

		return data;
	}

	async stopScriptRun(
		runId: Run['run_id'],
		scriptId: Script['script_id']
	): Promise<StopScriptRunResponse> {
		const request = {
			run_id: runId,
			run_script_id: scriptId,
		};

		const { data } = await http.post<StopScriptRunResponse>(
			'/v1/run/stop/script-run',
			request
		);

		return data;
	}

	async adjustmentRps(
		runId: Run['run_id'],
		adjustmentOnPercent: Run['percentage_of_target']
	): Promise<AdjustmentRpsResponse> {
		const request = {
			run_id: runId,
			adjustment_on_percent: adjustmentOnPercent,
		};

		const { data } = await http.post<AdjustmentRpsResponse>(
			// alilo_v2
			'/v1/run/adjustment',
			// alilo_v1
			// '/v1/run/adjustment-rps',
			request
		);

		return data;
	}

	async isChangeLoadlevel(
		runId: Run['run_id'],
	): Promise<IsChangeLoadlevelResponse> {
		const request = {
			run_id: runId
		};

		const { data } = await http.post<IsChangeLoadlevelResponse>(
			'/v1/run/is-change-loadlevel',
			request
		);

		return data;
	}

	async getTotalRunRPS(
		runId: Run['run_id'],
	): Promise<GetTotalRunRPSResponse> {
		const request = {
			run_id: runId
		};

		const { data } = await http.post<GetTotalRunRPSResponse>(
			'/v1/run/rps',
			request
		);

		return data;
	}

	async getByStatus(
		run_status:
			| 'STATUS_STOPPED_UNSPECIFIED'
			| 'STATUS_PREPARED'
			| 'STATUS_RUNNING'
			| 'STATUS_SCHEDULED'
			| 'STATUS_STOPPING',
		limit: number,
		page_number: number
	): Promise<GetByStatusResponse> {
		const request = {
			run_status,
			limit,
			page_number,
		};

		const { data } = await http.post<GetByStatusResponse>(
			// alilo_v2
			'/v1/run/by-status',
			// alilo_v1
			// '/v1/run/get-by-status',
			request
		);

		return data;
	}
}

export const runService = new RunService();
