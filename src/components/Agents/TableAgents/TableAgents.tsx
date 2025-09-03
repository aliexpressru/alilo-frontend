import { useCallback, useEffect, useMemo, useState } from "react";
import { MRT_ColumnDef } from "material-react-table";
import { Flex, Group, Text, Switch } from "@mantine/core";
import { modals } from "@mantine/modals";
import { Agent } from "../../../types/AgentTypes";
import { AgentCreateModal, AgentDeleteModal, AgentEditModal } from "../modals";
import { Tag } from '../../shared/Tag/Tag';
import { AddButton } from "../../shared/Buttons/AddButton";
import { IconButton } from "../../shared/Buttons/IconButton";
import { Pencil, Trash } from "../../../assets/svg";
import { agentService } from "../../../services/api";
import { MaterialTable } from "../../shared/Table/MaterialTable";

export interface ITableAgentsProps {
	agents: Agent[];
}

const TableAgents = ({ agents }: ITableAgentsProps) => {
	const [data, setData] = useState<Agent[]>(agents);

	useEffect(() => {
		setData(agents);
	}, [agents]);

	const openCreateModal = () =>
		modals.open({
			title: 'Agent create',
			size: 'xl',
			radius: 'md',
			children: <AgentCreateModal
				close={modals.closeAll} />
		});

	const openEditModal = (editedAgent: Agent) =>
		modals.open({
			title: 'Agent edit',
			size: 'xl',
			radius: 'md',
			children: <AgentEditModal
				agent={editedAgent}
				close={modals.closeAll} />
		});

	const openDeleteModal = (deletedAgent: Agent) =>
		modals.open({
			title: 'Agent delete',
			size: 'xl',
			radius: 'md',
			children: <AgentDeleteModal
				agent={deletedAgent}
				close={modals.closeAll} />
		});

	const handleSwitchTotalAgents = useCallback(
		() => {
			const newValue = data.every((agent) => !agent.enabled);
			const updatedAgents = data.map((agent) => ({ ...agent, enabled: newValue }));
			setData(updatedAgents);
			updatedAgents.forEach((agent) => agentService.updateAgent(agent));
		},
		[data]
	);

	const handleSwitchAgent = useCallback(
		(agent: Agent) => {
			const updatedAgents = data.map((a) => a.agent_id === agent.agent_id ? { ...a, enabled: !a.enabled } : a);
			setData(updatedAgents);
			// Optionally, update the agent in your API or database
			agentService.updateAgent({ ...agent, enabled: !agent.enabled });
		},
		[data]
	);

	const renderRowActions = (row: Agent) => (
		<Flex direction={'row'} gap={'md'}>
			<IconButton icon={Pencil} iconProps={{ size: "l" }} onClick={() => openEditModal(row)}/>
			<IconButton icon={Trash} iconProps={{ size: "l" }} onClick={() => openDeleteModal(row)}/>
		</Flex>
	);

	const columns = useMemo<MRT_ColumnDef<Agent>[]>(
		() => [
			{
				accessorKey: 'enabled',
				header: 'switch',
				Header: () => (
					<Switch
						checked={data.every((agent) => agent.enabled)}
						onChange={() => handleSwitchTotalAgents()}
						color="#D63426"
						size="md"
						onLabel="ALL"
					/>
				),
				Cell: ({row}) => (
					<Switch
						color="#D63426"
						checked={row.original.enabled}
						onChange={() => handleSwitchAgent(row.original)}
					/>
				),
				size: 10,
				enableSorting: false,
			},
			{
				accessorFn: (res) => res.host_name,
				Cell: ({ cell }) => (
					<Text
						size="md">{cell.getValue<string>()}
					</Text>
				),
				header: 'Name',
			},
			{
				accessorFn: (res) => res.agent_id,
				Cell: ({ cell }) => (
					<Text size="md">{cell.getValue<string>()}
					</Text>
				),
				header: 'Agent ID',
				maxSize: 50
			},
			{
				accessorFn: (res) => res.port,
				Cell: ({ cell }) => (
					<Text
						size="md">{cell.getValue<string>()}
					</Text>
				),
				header: 'Port',
				maxSize: 40
			},
			{
				accessorFn: (res) => res.port,
				Cell: ({row }) => (
					<Flex direction={"row"}>
						{row.original.tags.map(
							(tag) => <Tag
								text={tag}
							/>)}
					</Flex>
				),
				header: 'Tags',
				enableSorting: false
			},
		], [handleSwitchAgent, handleSwitchTotalAgents, data]
	);

	return (
		<MaterialTable<Agent>
		data={data}
		columns={columns}
		renderRowActions={renderRowActions}
		renderTopToolbarCustomActions={() => (
			<Group>
				<AddButton onClick={openCreateModal}/>
			</Group>)}
		/>
	);
};

export default TableAgents;

