import { http } from '../../axios';
import { Scenario } from '../../types/ScenarioTypes';

import type {
	CheckAndConvertExtendedScriptLinkResponse,
	CopyScriptResponse,
	CopySimpleScriptResponse,
	CreateScriptResponse,
	CreateSimpleScriptResponse,
	DeleteScriptResponse,
	DeleteSimpleScriptResponse,
	GetAllScriptsResponse,
	GetScriptResponse,
	GetSimpleScriptResponse,
	PreExtendedScript,
	PreSimpleScript,
	Script,
	SimpleScript,
	UpdateScriptResponse,
	UpdateSimpleScriptResponse,
} from '../../types/ScriptTypes';
import { prepareCyrillicToLatinFileName } from "../../utils/validators";

class ScriptService {
	async getAllScripts(scenarioId: string): Promise<GetAllScriptsResponse> {
		const { data } = await http.post<GetAllScriptsResponse>(
			// alilo_v2
			'/v1/scripts',
			// alilo_v1
			// '/v1/scripts/get-all',
			{ scenario_id: scenarioId }
		);
		return data;
	}

	async getScript(
		scenarioId: string,
		scriptId: Script['script_id']
	): Promise<GetScriptResponse> {
		const request = {
			scenario_id: scenarioId,
			script_id: scriptId,
		};

		const { data } = await http.post<GetScriptResponse>(
			// alilo_v2
			'/v1/script',
			// alilo_v1
			// '/v1/script/get',
			request
		);
		if (!data.script.options) {
			data.script.options = {
				duration: '',
				rps: '',
				steps: '',
			};
		}

		return data;
	}

	async getSimpleScript(
		scriptId: SimpleScript['script_id']
	): Promise<GetSimpleScriptResponse> {
		const request = {
			simple_script_id: scriptId,
		};

		const { data } = await http.post<GetSimpleScriptResponse>(
			// alilo_v2
			'/v1/simple-script',
			// alilo_v1
			// '/v1/simple-script/get',
			request
		);

		return data;
	}

	async deleteScript(scriptId: Script['script_id']) {
		const { data } = await http.post<DeleteScriptResponse>(
			'/v1/script/delete',
			{ script_id: scriptId }
		);
		return data;
	}

	async deleteSimpleScript(scriptId: SimpleScript['script_id']) {
		const { data } = await http.post<DeleteSimpleScriptResponse>(
			'/v1/simple-script/delete',
			{ simple_script_id: scriptId }
		);
		return data;
	}

	async updateScript(preExtendedScript: PreExtendedScript) {
		const script = preExtendedScriptToExtendedScript(preExtendedScript);
		const { data } = await http.post<UpdateScriptResponse>(
			'/v1/script/update',
			// TODO: refactor this shit!
			{
				script: {
					ammo_id: script.ammo_id,
					base_url: script.base_url,
					descrip: script.descrip,
					enabled: script.enabled,
					grafana_url: script.grafana_url,
					name: prepareCyrillicToLatinFileName(script.name),
					options: {
						rps: String(script.options.rps),
						steps: String(script.options.steps),
						duration: String(script.options.duration),
					},
					project_id: Number(script.project_id),
					scenario_id: Number(script.scenario_id),
					script_file: script.script_file,
					script_id: Number(script.script_id),
					tag: script.tag,
					selectors: script.selectors,
					additional_env: script.additional_env,
					title: script.title
				},
			}
		);
		return data;
	}

	async updateSimpleScript(simpleScript: SimpleScript) {
		const { data } = await http.post<UpdateSimpleScriptResponse>(
			'/v1/simple-script/update',
			{
				simpleScript: {
					...simpleScript,
					rps: String(simpleScript.rps),
					steps: String(simpleScript.steps),
				},
			}
		);
		return data;
	}

	async updateSimpleScript2(preSimpleScript: PreSimpleScript) {
		const { data } = await http.post<UpdateSimpleScriptResponse>(
			'/v1/simple-script/update',
			{
				simpleScript: preSimpleScriptToSimpleScript(preSimpleScript),
			}
		);
		return data;
	}

	async createScript(script: PreExtendedScript) {
		const { data } = await http.post<CreateScriptResponse>(
			'/v1/script/create',
			{ script: preExtendedScriptToExtendedScript(script) }
		);
		return data;
	}

	async createSimpleScript(simpleScript: SimpleScript) {
		const { data } = await http.post<CreateSimpleScriptResponse>(
			'/v1/simple-script/create',
			{ simple_script: simpleScript }
		);
		return data;
	}

	async createSimpleScript2(preSimpleScript: PreSimpleScript) {


		const { data } = await http.post<CreateSimpleScriptResponse>(
			'/v1/simple-script/create',
			{ simple_script: preSimpleScriptToSimpleScript(preSimpleScript) }
		);
		return data;
	}

	async copyScript(scriptId: Script['script_id'], scenarioId: string) {
		const { data } = await http.post<CopyScriptResponse>(
			'/v1/script/copy',
			{
				source_script_id: Number(scriptId),
				target_scenario_id: Number(scenarioId),
			}
		);
		return data;
	}

	async copySimpleScript(
		scriptId: SimpleScript['script_id'],
		scenarioId: Scenario['scenario_id']
	) {
		const { data } = await http.post<CopySimpleScriptResponse>(
			'/v1/simple-script/copy',
			{
				source_simple_script_id: scriptId,
				target_scenario_id: Number(scenarioId),
			}
		);
		return data;
	}

	async checkAndConvertExtendedScriptLink(
		scriptLink: Script['script_file']
	) {
		const { data } = await http.post<CheckAndConvertExtendedScriptLinkResponse>(
			'/v1/script/link-converter',
			{
				script_url: scriptLink,
			}
		);
		return data;
	}
}

function preSimpleScriptToSimpleScript(preSimpleScript: PreSimpleScript): SimpleScript {
	const rec: Record<string, string> = {};
	// eslint-disable-next-line no-return-assign
	preSimpleScript.headers.forEach((h) => rec[h.key] = h.value);

	const additionEnv: Record<string, string> = {};
	// eslint-disable-next-line no-return-assign
	preSimpleScript.additional_env.forEach((env) => additionEnv[env.key] = env.value);

	const simpleScript: SimpleScript = {
		options: preSimpleScript.options,
		ammo_url: preSimpleScript.ammo_url,
		description: preSimpleScript.description,
		duration: preSimpleScript.duration,
		enabled: preSimpleScript.enabled,
		// headers: { "t": "q" } as Record<string, string>,
		headers: rec,
		http_method: preSimpleScript.http_method,
		is_static_ammo: preSimpleScript.is_static_ammo,
		max_v_us: preSimpleScript.max_v_us,
		monitoring_links: preSimpleScript.monitoring_links,
		name: prepareCyrillicToLatinFileName(preSimpleScript.title),
		title: preSimpleScript.title,
		path: preSimpleScript.path,
		project_id: preSimpleScript.project_id,
		query_params: preSimpleScript.query_params,
		rps: preSimpleScript.rps,
		scenario_id: preSimpleScript.scenario_id,
		scheme: preSimpleScript.scheme,
		script_file_url: preSimpleScript.script_file_url,
		script_id: preSimpleScript.script_id,
		static_ammo: preSimpleScript.static_ammo,
		steps: preSimpleScript.steps,
		tag: preSimpleScript.tag,
		selectors: preSimpleScript.selectors,
		additional_env: additionEnv
	};

	return simpleScript;
}

function preExtendedScriptToExtendedScript(preExtendedScript: PreExtendedScript): Script {
	const additionEnv: Record<string, string> = {};
	// eslint-disable-next-line no-return-assign
	preExtendedScript.additional_env.forEach((env) => additionEnv[env.key] = env.value);

	return {
		name: prepareCyrillicToLatinFileName(preExtendedScript.title),
		title: preExtendedScript.title,
		descrip: preExtendedScript.descrip,
		script_id: preExtendedScript.script_id,
		project_id: preExtendedScript.project_id,
		scenario_id: preExtendedScript.scenario_id,
		script_file: preExtendedScript.script_file,
		ammo_id: preExtendedScript.ammo_id,
		options: {
			rps: preExtendedScript.options.rps,
			steps: preExtendedScript.options.steps,
			duration: preExtendedScript.options.duration,
		},
		base_url: preExtendedScript.base_url,
		enabled: preExtendedScript.enabled,
		grafana_url: preExtendedScript.grafana_url,
		tag: preExtendedScript.tag,
		selectors: preExtendedScript.selectors, // Ensure this is correctly mapped
		additional_env: additionEnv,
	};
}

export function simpleScriptToPreSimpleScript(simpleScript: SimpleScript): PreSimpleScript {
	const additionalEnv = Object.entries(simpleScript.additional_env).map((env) => ({ key: env[0], value: env[1] }));

	const preSimpleScript: PreSimpleScript = {
		options: simpleScript.options,
		ammo_url: simpleScript.ammo_url,
		description: simpleScript.description,
		duration: simpleScript.duration,
		enabled: simpleScript.enabled,
		// eslint-disable-next-line max-len
		headers: Object.entries(simpleScript.headers).map((h) => ({ key: h[0], value: h[1] })),
		http_method: simpleScript.http_method,
		is_static_ammo: simpleScript.is_static_ammo,
		max_v_us: simpleScript.max_v_us,
		monitoring_links: simpleScript.monitoring_links,
		name: simpleScript.name,
		path: simpleScript.path,
		project_id: simpleScript.project_id,
		query_params: simpleScript.query_params,
		rps: simpleScript.rps,
		scenario_id: simpleScript.scenario_id,
		scheme: simpleScript.scheme,
		script_file_url: simpleScript.script_file_url,
		script_id: simpleScript.script_id,
		static_ammo: simpleScript.static_ammo,
		steps: simpleScript.steps,
		tag: simpleScript.tag,
		selectors: simpleScript.selectors,
		additional_env: additionalEnv,
		title: simpleScript.title,
	};

	return preSimpleScript;
}

export function extendedScriptToPreExtendedScript(script: Script): PreExtendedScript {
	const additionalEnv = Object.entries(script.additional_env).map((env) => ({ key: env[0], value: env[1] }));

	const preExtendedScript: PreExtendedScript = {
		name: script.name,
		title: script.title,
		descrip: script.descrip,
		script_id: script.script_id,
		project_id: script.project_id,
		scenario_id: script.scenario_id,
		script_file: script.script_file,
		ammo_id: script.ammo_id,
		options: {
			rps: script.options.rps,
			steps: script.options.steps,
			duration: script.options.duration,
		},
		base_url: script.base_url,
		enabled: script.enabled,
		grafana_url: script.grafana_url,
		tag: script.tag,
		selectors: script.selectors,
		additional_env: additionalEnv
	};

	return preExtendedScript;
}

export const scriptService = new ScriptService();
