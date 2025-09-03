import { QueryParam } from './ScriptTypes';

export type Parse = {};

export type ParseResponse = {
	status: boolean;
	message: string;
	json: string;
};

export type ParsedCUrl = {
	method: string;
	url: string;
	query_params: QueryParam[];
	headers: Record<string, string>;
	body: string;
};
