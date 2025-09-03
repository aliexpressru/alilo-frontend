export type Scenario = {
	scenario_id: string;
	project_id: string;
	title: string;
	descrip: string;
};

export const ScenarioEmpty = (projectId: string) => ({
	project_id: projectId,
	title: '',
	descrip: ''
});

export type GetAllScenariosResponse = {
	status: boolean;
	scenarios: Scenario[];
	totalPages: number;
	message: string;
};

export type GetScenarioResponse = {
	status: boolean;
	scenario: Scenario;
	message: string;
};

export type CreateScenarioResponse = {
	status: boolean;
	scenario_id: string;
	message: string;
};

export type DeleteScenarioResponse = {
	status: string;
};

export type UpdateScenarioResponse = {
	status: string;
};

export type CopyScenarioResponse = {
	status: boolean;
	scenario_id: string;
	message: string;
};

export type SetDurationScenarioResponse = {
	status: boolean;
	message: string;
};

export type SetStepsScenarioResponse = {
	status: boolean;
	message: string;
};

export type GetLastRunStatusResponse = {
	status: boolean;
	message: string;
	last_run_status: string;
	last_run_id: number;
};

export type GetTotalRpsAmountResponse = {
	status: boolean;
	message: string;
	rps: string;
};
