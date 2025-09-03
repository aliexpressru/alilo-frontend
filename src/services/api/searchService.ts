import { http } from '../../axios';

import { SearchRequest, SearchResponse } from '../../types/SearchTypes';

class SearchService {
	async search(searchParams: SearchRequest): Promise<SearchResponse> {
		try {
			const { data } = await http.post<SearchResponse>(
				'/v1/search/script',
				searchParams
			);
			return data;
		} catch (e) {
			throw new Error(e);
		}
	}
}

export const searchService = new SearchService();
