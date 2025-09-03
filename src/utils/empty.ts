import { Project } from '../types/ProjectTypes';
import { Scenario } from '../types/ScenarioTypes';
import { Script, SimpleScript } from '../types/ScriptTypes';

type CreateEmptyScriptProps = {
	scenarioId: Scenario['scenario_id'];
	projectId: Project['id'];
};

export const createEmptyScript = ({
	scenarioId,
	projectId,
}: CreateEmptyScriptProps): Script => ({
	name: 'New script',
	title: 'My super script!',
	descrip: '',
	scenario_id: scenarioId,
	script_id: 0,
	options: {
		rps: '1',
		steps: '1',
		duration: '5m',
	},
	script_file: '',
	ammo_id: '',
	base_url: '',
	project_id: projectId,
	enabled: false,
	grafana_url: [''],
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
});

export const createEmptySimpleScript = ({
	scenarioId,
	projectId,
}: CreateEmptyScriptProps): SimpleScript => ({
	name: 'New Simple Script',
	title: 'My Super script',
	description: '',
	script_id: 0,
	project_id: Number(projectId),
	scenario_id: Number(scenarioId),
	enabled: false,
	monitoring_links: [''],
	tag: '',
	path: 'http://example.com',
	scheme: '',
	http_method: 'post',
	query_params: [],
	headers: {},
	static_ammo: '',
	ammo_url: '',
	is_static_ammo: true,
	rps: '1',
	duration: '10m',
	steps: '1',
	max_v_us: '300',
	script_file_url: '',
	options: '',
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
});
