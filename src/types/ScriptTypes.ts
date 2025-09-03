export interface BaseResponse {
	status: boolean;
	message: string;
}

export type Script = {
	name: string;
	title: string;
	descrip: string;
	script_id: number;
	project_id: string;
	scenario_id: string;
	script_file: string;
	ammo_id: string;
	options: {
		rps: string;
		steps: string;
		duration: string;
	};
	base_url: string;
	enabled: boolean;
	grafana_url: string[];
	tag: string;
	selectors: Selectors;
	additional_env: Record<string, string>
};

export type PreExtendedScript = {
	name: string;
	title: string;
	descrip: string;
	script_id: number;
	project_id: string;
	scenario_id: string;
	script_file: string;
	ammo_id: string;
	options: {
		rps: string;
		steps: string;
		duration: string;
	};
	base_url: string;
	enabled: boolean;
	grafana_url: string[];
	tag: string;
	selectors: Selectors;
	additional_env: QueryParam[]
}

type Selectors = {
	expr_rps: string,
	source_rps: string,
	cmt_rps: string,
	expr_rt: string,
	source_rt: string,
	cmt_rt: string,
	expr_err: string,
	source_err: string,
	cmt_err: string,
}

export type GetAllScriptsResponse = {
	scripts: Script[];
	simple_scripts: SimpleScript[];
};

export type QueryParam = {
	key: string;
	value: string;
};

export type HttpMethodType = 'get' | 'post';

export const enum HttpMethodTypeNames {
	GET = 'get',
	POST = 'post'
}

export type SimpleScript = {
	name: string;
	title: string;
	description: string;
	script_id: number;
	project_id: number;
	scenario_id: number;
	enabled: boolean;
	monitoring_links: string[];
	tag: string;
	path: string;
	scheme: 'http' | 'https' | '';
	http_method: HttpMethodType;
	query_params: QueryParam[];
	headers: Record<string, string>;
	static_ammo: string;
	ammo_url: string;
	is_static_ammo: boolean;
	rps: string;
	duration: string;
	steps: string;
	max_v_us: string;
	script_file_url: string;
	// TODO: May be remove?
	options: any;
	selectors: Selectors;
	additional_env: Record<string, string>;
};

export type PreSimpleScript = {
	options: any;
	ammo_url: string;
	description: string;
	duration: string;
	enabled: boolean;
	headers: QueryParam[];
	http_method: HttpMethodType;
	is_static_ammo: boolean;
	max_v_us: string;
	monitoring_links: string[];
	name: string;
	path: string;
	project_id: number;
	query_params: QueryParam[];
	rps: string;
	scenario_id: number;
	scheme: 'http' | 'https' | '';
	script_file_url: string;
	script_id: number;
	static_ammo: string;
	steps: string;
	tag: string;
	title: string;
	selectors: Selectors;
	additional_env: QueryParam[];
};

export function CreateSimpleScriptEmpty(): SimpleScript {
	return {
		options: '',
		ammo_url: "",
		description: "",
		duration: "5m",
		enabled: false,
		headers: {},
		http_method: 'get',
		is_static_ammo: false,
		max_v_us: '300',
		monitoring_links: ['http://monitor1.ru', 'http://monitor2.ru'],
		name: 'Example',
		path: '',
		project_id: 0,
		query_params: [
		] as QueryParam[],
		rps: '10',
		scenario_id: 0,
		scheme: '',
		script_file_url: '',
		script_id: 0,
		static_ammo: '',
		steps: '1',
		tag: '',
		selectors: {
			expr_rps: "",
			source_rps: "",
			cmt_rps: "",
			expr_rt: "",
			source_rt: "",
			cmt_rt: "",
			expr_err: "",
			source_err: "",
			cmt_err: ""
		},
		additional_env: {},
	} as SimpleScript;
}

export function CreatePreSimpleScriptEmpty(projectId: number, scenarioId: number): PreSimpleScript {
	return {
		options: '',
		title: 'Example',
		ammo_url: "",
		description: "",
		duration: "5m",
		enabled: false,
		headers:
			[] as QueryParam[],
		http_method: 'get',
		is_static_ammo: true,
		max_v_us: '300',
		monitoring_links: ['http://monitor1.ru', 'http://monitor2.ru'],
		name: 'Example',
		path: '',
		project_id: projectId,
		query_params: [
		] as QueryParam[],
		rps: '10',
		scenario_id: scenarioId,
		scheme: '',
		script_file_url: '',
		script_id: 0,
		static_ammo: '',
		steps: '1',
		tag: '',
		selectors: {
			expr_rps: "",
			source_rps: "",
			cmt_rps: "",
			expr_rt: "",
			source_rt: "",
			cmt_rt: "",
			expr_err: "",
			source_err: "",
			cmt_err: ""
		},
		additional_env: [] as QueryParam[]
	} as PreSimpleScript;
}


export function CreatePreExtendedScriptEmpty(projectId: number, scenarioId: number): PreExtendedScript {
	return {
		name: 'Example',
		title: 'My super script!',
		descrip: '',
		script_id: 0,
		project_id: projectId.toString(),
		scenario_id: scenarioId.toString(),
		script_file: '',
		ammo_id: '',
		base_url: '',
		options: {
			rps: '10',
			steps: '1',
			duration: '5m'
		},
		enabled: false,
		grafana_url: [],
		tag: '',
		selectors: {
			expr_rps: "",
			source_rps: "",
			expr_rt: "",
			cmt_rps: "",
			source_rt: "",
			cmt_rt: "",
			expr_err: "",
			source_err: "",
			cmt_err: ""
		},
		additional_env: [] as QueryParam[]
	} as PreExtendedScript;
}

export type CreateScriptResponse = {
	script_id: string;
	status: boolean;
};

export type CreateSimpleScriptResponse = {
	script_id: string;
	status: boolean;
	message: string;
};

export type CopyScriptResponse = {
	status: boolean;
	message: string;
};

export type CopySimpleScriptResponse = {
	status: boolean;
	simple_script_id: number;
	message: string;
};

export type DeleteScriptResponse = {
	status: boolean;
};

export type DeleteSimpleScriptResponse = {
	status: boolean;
	message: string;
};

export type GetScriptResponse = {
	script: Script;
};

export type GetSimpleScriptResponse = {
	simple_script: SimpleScript;
};

export type ConvertLinkStatus = 'LINK_STATUS_UNSPECIFIED' | 'LINK_STATUS_EMPTY' | 'LINK_STATUS_INVALID' | 'LINK_STATUS_VALID' | 'LINK_STATUS_FIXED';

export type CheckAndConvertExtendedScriptLinkResponse = {
	status: ConvertLinkStatus,
	message: string,
	valid_url: string,
	error: {
		code: string,
		message: string,
	}
};

export type UpdateScriptResponse = {
	status: boolean;
};

export type UpdateSimpleScriptResponse = {
	status: boolean;
	message: string;
};
