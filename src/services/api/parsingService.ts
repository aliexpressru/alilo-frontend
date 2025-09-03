import { http } from '../../axios';

import type { ParseResponse as ParseСurlResponse } from '../../types/ParsingTypes';

class ParsingService {
	async parseCUrl(curlStr: string): Promise<ParseСurlResponse> {
		try {
			const { data } = await http.post<ParseСurlResponse>(
				'/v1/parsing/CUrl',
				{
					curl: curlStr,
				}
			);

			return data;
		} catch (e) {
			throw new Error(e);
		}
	}
}

export const parsingService = new ParsingService();
