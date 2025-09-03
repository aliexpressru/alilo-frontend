export type Agent = {
	agent_id: number,
	host_name: string,
	port: string,
	enabled: boolean,
	tags: string[],
	cpu_used: number,
	mem_used: number,
	ports_used: number
};

export const AgentEmpty = {
	agent_id: 0,
	host_name: '',
	port: '',
	enabled: false,
	tags: [],
	cpu_used: 0,
	mem_used: 0,
	ports_used: 0
};

export type DeleteAgentResponse = {
	status: boolean;
	message: string;
};

export type UpdateAgentResponse = {
	status: boolean,
	message: string
}

export type CreateAgentResponse = {
	status: boolean,
	message: string
}

export type SetAgentResponse = {
	status: boolean,
	agent_id: number,
	message: string
}

export type GetAgentResponse = {
	status: boolean,
	agent: {
		agent_id: number,
		host_name: string,
		port: string,
		enabled: boolean,
		tags: string[]
	},
	message: string
}

export type GetAgentAllTagsResponse = {
	status: boolean,
	message: string,
	tags: string[]
}

export type GetAllAgentResponse = {
	status: boolean,
	agents: Agent[],
	message: string
}
