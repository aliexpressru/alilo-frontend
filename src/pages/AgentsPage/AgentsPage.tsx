import { FC, useCallback, useEffect, useMemo, useState } from 'react';

import { agentService } from '../../services/api';

import { Agent } from '../../types/AgentTypes';
import { snackbarService } from '../../services/snackbarService';
import { Page } from '../../components/shared/Page';
import TableAgents from "../../components/Agents/TableAgents/TableAgents";

const AgentsPage: FC = () => {
	const [loader, setLoader] = useState<boolean>(false);
	const [agents, setAgents] = useState<Agent[]>([]);

	const noAgents = useMemo(() => agents.length === 0, [agents.length]);

	const handleUpdateAgentsList = useCallback(() => {
		setLoader(true);
		agentService
			.getAllAgents()
			.then((resp) => {
				const sortedAgents = resp.agents.sort((a, b) =>
					b.agent_id > a.agent_id ? b.agent_id : a.agent_id
				);
				setAgents(sortedAgents);
			})
			.catch((e) => {
				if (noAgents) {
					snackbarService.addSnack({
						palette: 'danger',
						title: e.message ?? 'Error while fetching agents',
					});
				}
			})
			.finally(() => {
				setLoader(false);
			});
	}, [noAgents]);

	useEffect(() => {
		handleUpdateAgentsList();
	}, [handleUpdateAgentsList]);

	return (
		<>
			<Page
				title={"Agents"}
				loading={loader}>
				<TableAgents
					agents={agents}
				/>
			</Page>
		</>
	);
};

export { AgentsPage };
