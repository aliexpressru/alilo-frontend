import { http } from '../../axios';
import { sortByKey } from '../../utils/sorters';

import {
	CreateScenarioResponse,
	GetAllScenariosResponse,
	DeleteScenarioResponse,
	GetScenarioResponse,
	SetDurationScenarioResponse,
	CopyScenarioResponse,
	GetLastRunStatusResponse,
	UpdateScenarioResponse,
	Scenario,
	SetStepsScenarioResponse,
	GetTotalRpsAmountResponse,
} from '../../types/ScenarioTypes';
import { Project } from '../../types/ProjectTypes';
import { BaseResponse } from "../../types/ScriptTypes";

class ScenarioService {
	async getAllScenarios(projectId: string, limit = 10_000, pageNumber = 0): Promise<GetAllScenariosResponse> {
		try {
			const { data } = await http.post(
				// alilo_v2
				'/v1/scenarios',
				// alilo_v1
				// '/v1/scenario/get-all',
				{
					limit,
					page_number: pageNumber,
					project_id: projectId,
					headers: {
						'Content-Type': 'application/json',
					}
				}
			);

			return {
				status: true,
				scenarios: data.scenarios?.sort(sortByKey('title')),
				totalPages: data.total_pages,
				message: data.message
			};
		} catch (error) {
			throw new Error(error);
		}
	}

	async getScenario(
		sceanrioId: string | number
	): Promise<GetScenarioResponse> {
		try {
			const { data } = await http.post<GetScenarioResponse>(
				// alilo_v2
				'/v1/scenario',
				// alilo_v1
				// '/v1/scenario/get',
				{
					scenario_id: sceanrioId,
				}
			);
			return data;
		} catch (error) {
			throw new Error(error);
		}
	}

	async createScenario(
		projectId: string,
		title: string,
		descrip: string
	): Promise<CreateScenarioResponse> {
		try {
			const { data } = await http.post<CreateScenarioResponse>(
				'/v1/scenario/create',
				{
					scenario: {
						project_id: projectId,
						title,
						descrip,
					},
				}
			);
			return data;
		} catch (error) {
			console.error(
				'error in scenario service, createNewScenario method: ',
				error
			);
			return {
				status: false,
				scenario_id: '',
				message: 'An unexpected error occurred',
			};
		}
	}

	async deleteScenario(scenarioId: Scenario['scenario_id']) {
		try {
			const { data } = await http.post<DeleteScenarioResponse>(
				'/v1/scenario/delete',
				{
					scenario_id: scenarioId,
				}
			);

			return data;
		} catch (error) {
			console.error(
				'error in scenario service, deleteScenario method: ',
				error
			);
			throw new Error(error);
		}
	}

	// eslint-disable-next-line max-params
	async updateScenario(
		scenarioId: string,
		projectId: string,
		newTitle: string,
		newDescription: string
	): Promise<UpdateScenarioResponse> {
		try {
			// 👇️ const data: CreateUserResponse
			const { data } = await http.post<UpdateScenarioResponse>(
				'/v1/scenario/update',
				{
					scenario: {
						scenario_id: scenarioId,
						project_id: projectId,
						title: newTitle,
						descrip: newDescription,
					},
				}
			);

			return data;
		} catch (error) {
			// eslint-disable-next-line no-console
			console.error(
				'error in scenario service, updateScenario method: ',
				error
			);
			throw new Error('An unexpected error occurred');
		}
	}

	// eslint-disable-next-line max-params
	async copyScenario(
		sourceScenarioId: Scenario['scenario_id'],
		targetProjectId: Project['id'],
		targetScenarioId: Scenario['scenario_id'],
		titleCopy: string,
		descripCopy: string,
		isNew: boolean
	): Promise<CopyScenarioResponse> {
		const payloadCopyToNewScenario = () => ({
			source_scenario_id: Number(sourceScenarioId),
			target_scenario_data: {
				scenario_id: 0,
				project_id: Number(targetProjectId),
				title: titleCopy,
				descrip: descripCopy,
			},
		});
		const payloadCopyToExitScenario = () => ({
			source_scenario_id: Number(sourceScenarioId),
			target_scenario_id: Number(targetScenarioId),
		});

		try {
			// 👇️ const data: CreateUserResponse
			const { data } = await http.post<CopyScenarioResponse>(
				'/v1/scenario/copy',
				isNew ? payloadCopyToNewScenario() : payloadCopyToExitScenario()
			);

			return data;
		} catch (error) {
			// eslint-disable-next-line no-console
			console.error(
				'error in scenario service, updateScenario method: ',
				error
			);
			throw new Error('An unexpected error occurred');
		}
	}
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	async runScenario(sceanrioId: string): Promise<any> {
		try {
			// eslint-disable-next-line @typescript-eslint/no-explicit-any
			const { data } = await http.post<any>(
				'/v1/run/start',
				{
					scenario_id: sceanrioId,
				});
			return data;
		} catch (error) {
			// eslint-disable-next-line no-console
			console.error(
				'error in scenario service, runScenario method: ',
				error
			);
			return {
				status: false,
				scenario: null,
				message: 'An unexpected error occurred',
			};
		}
	}

	async setDurationProject(
		projectId: string,
		newDuration: string
	): Promise<SetDurationScenarioResponse> {
		try {
			// eslint-disable-next-line @typescript-eslint/no-explicit-any
			const { data } = await http.post<any>(
				'/v1/scenario/duration',
				{
					project_id: projectId,
					duration: newDuration,
				});
			return data;
		} catch (error) {
			// eslint-disable-next-line no-console
			console.error(
				'error in scenario service, runScenario method: ',
				error
			);
			return {
				status: false,
				message: 'An unexpected error occurred',
			};
		}
	}

	async setDurationScenario(
		sceanrioId: string,
		newDuration: string
	): Promise<SetDurationScenarioResponse> {
		try {
			// eslint-disable-next-line @typescript-eslint/no-explicit-any
			const { data } = await http.post<any>(
				'/v1/scenario/duration',
				{
					scenario_id: sceanrioId,
					duration: newDuration,
				});
			return data;
		} catch (error) {
			// eslint-disable-next-line no-console
			console.error(
				'error in scenario service, runScenario method: ',
				error
			);
			return {
				status: false,
				message: 'An unexpected error occurred',
			};
		}
	}

	async setStepsScenario(
		stepsNum: string,
		projectId?: number | null,
		scenarioId?: number | null,
	): Promise<SetStepsScenarioResponse> {
		try {
			if (projectId && !scenarioId) {
				const { data } = await http.post<any>(
					'/v1/scenario/steps',
					{
						project_id: projectId,
						steps: stepsNum,
					});
				return data;
			} else if (scenarioId) {
				const { data } = await http.post<any>(
					'/v1/scenario/steps',
					{
						scenario_id: scenarioId,
						steps: stepsNum,
					});
				return data;
			}

			return {
				status: false,
				message: 'An unexpected error occurred',
			};
		} catch (error) {
			console.error(
				'Error in scenario service, setStepsScenario method: ',
				error
			);
			return {
				status: false,
				message: 'An unexpected error occurred',
			};
		}
	}

	async getLastRunStatusScenario(
		sceanrioId: string
	): Promise<GetLastRunStatusResponse> {
		try {
			// eslint-disable-next-line @typescript-eslint/no-explicit-any
			const { data } = await http.post<any>(
				'/v1/scenario/last-run-status',
				{
					scenario_id: sceanrioId,
				}
			);
			return data;
		} catch (error) {
			// eslint-disable-next-line no-console
			console.error(
				'error in scenario service, runScenario method: ',
				error
			);
			return {
				status: false,
				message: 'An unexpected error occurred',
				last_run_status: '',
				last_run_id: 0,
			};
		}
	}

	async updateTag(
		scenarioId: number,
		tag: string
	): Promise<void> {
		await http.post<any>(
			'/v1/scenario/teg',
			{
				scenario_id: scenarioId,
				tag
			}
		);
	}

	async getTotalRpsCount(scenarioId: number): Promise<GetTotalRpsAmountResponse> {
		const {data } = await http.post<GetTotalRpsAmountResponse>(
			'/v1/scenario/rps',
			{
				scenario_id: scenarioId,
			}
		);

		return data;
	}

	async generateGrafanaStructure(scenarioId: Scenario['scenario_id']): Promise<BaseResponse> {
		const { data } = await http.post<BaseResponse>(
			'/v1/scenario/grafanaStructure',
			{ scenario_id: scenarioId }
		);

		return data;
	}

	async generateGrafanaStructureByIds(scenarioIds: Scenario['scenario_id'][], title: string): Promise<BaseResponse> {
		const { data } = await http.post<BaseResponse>(
			'/v1/scenario/grafanaStructureByIds',
			{ scenario_ids: scenarioIds, title }
		);

		return data;
	}
}

export const scenarioService = new ScenarioService();
