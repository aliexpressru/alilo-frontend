import { Script, SimpleScript } from './ScriptTypes';

export type Search = {};

export type SearchRequest = {
	search_query: string
	not_like: boolean
	project_id: number
	scenario_id: number
}

export type SearchResponse = {
	status: boolean;
	scripts: Script[];
	simple_scripts: SimpleScript[];
	message: string;
};
