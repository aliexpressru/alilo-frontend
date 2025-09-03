import { http } from '../../axios';

import type {
	Agent,
	CreateAgentResponse,
	DeleteAgentResponse,
	GetAllAgentResponse,
	GetAgentAllTagsResponse,
	GetAgentResponse,
	UpdateAgentResponse,
} from '../../types/AgentTypes';

class AgentService {
	async getAllAgents(): Promise<GetAllAgentResponse> {
		const { data } = await http.post<GetAllAgentResponse>(
			// alilo_v2
			'/v1/agents'
			// alilo_v1
			// '/v1/agent/get-all'
		);
		return data;
	}

	async updateAgent(
		agent: Agent
	): Promise<UpdateAgentResponse> {
		const { data } = await http.post<UpdateAgentResponse>(
			'/v1/agent/update',
			{
				agent,
			}
		);

		return data;
	}

	async createAgent(
		agent: Agent
	): Promise<CreateAgentResponse> {
		const { data } = await http.post<CreateAgentResponse>(
			'/v1/agent/set',
			{
				agent,
			});

		return data;
	}

	async getAgent(agentId: number): Promise<GetAgentResponse> {
		const { data } = await http.post<GetAgentResponse>(
			'/v1/agent/get',
			{
				agent_id: agentId,
			});

		return data;
	}

	async deleteAgent(agentId: number): Promise<DeleteAgentResponse> {
		const { data } = await http.post<DeleteAgentResponse>(
			'/v1/agent/delete',
			{
				agent_id: agentId,
			}
		);

		return data;
	}

	async getAgentAllTags(): Promise<GetAgentAllTagsResponse> {
		const { data } = await http.post<GetAgentAllTagsResponse>(
			// alilo_v2
			'/v1/agent/tags',
			// alilo_v1
			// '/v1/agent/get-tags',
			{}
		);

		return data;
	}
}

export const agentService = new AgentService();
