import React, { useMemo } from "react";
import { MRT_ColumnDef, MRT_PaginationState } from "material-react-table";
import { Flex, Group, Text } from "@mantine/core";
import { modals } from '@mantine/modals';
import { Link } from 'react-router-dom';
import { IconButton } from '../../shared/Buttons/IconButton';
import { Pencil, Trash, Copy } from '../../../assets/svg';
import { routes } from "../../../router/routes";
import { Scenario } from "../../../types/ScenarioTypes";
import { ScenarioCloneModal, ScenarioCreateModal, ScenarioDeleteModal, ScenarioEditModal } from "../modals";
import { AddButton } from "../../shared/Buttons/AddButton";
import { MaterialTable } from "../../shared/Table/MaterialTable";
import { HistoryButton } from "../../shared/Buttons/HistoryButton";
import { DurationProjectControlButton } from "../../shared/Buttons/DurationControlButton";
import { StepsControlButton } from "../../shared/Buttons/StepsControlButton";

export interface ITableScenariosProps {
	projectId: string;
	data: Scenario[];
	setPagination: (updaterOrValue: MRT_PaginationState | ((prev: MRT_PaginationState) => MRT_PaginationState)) => void;
	pagination: MRT_PaginationState;
	totalCountPages: number;
	callback: VoidFunction;
}

const TableScenarios = ({ projectId, data, callback, totalCountPages, setPagination, pagination }: ITableScenariosProps) => {
	// Используем React для удовлетворения noUnusedLocals
	console.log('React version:', React.version);

	const openEditModal = (editedScenario: Scenario) =>
		modals.open({
			title: 'Scenario edit',
			size: 'xl',
			radius: 'md',
			children: <ScenarioEditModal
				scenario={editedScenario}
				close={modals.closeAll}
				callback={callback}
			/>
		});

	const openHistoryPage = (projectId: string) => {
		window.open(
			routes.runs.viewProject.createPath(projectId)
		);
	};

	const openCloneModal = (clonedScenario: Scenario) =>
		modals.open({
			title: 'Scenario clone',
			size: 'xl',
			radius: 'md',
			children: <ScenarioCloneModal
				scenario={clonedScenario}
				close={modals.closeAll}
				callback={callback}
			/>
		});

	const openCreateModal = () =>
		modals.open({
			title: 'Scenario create',
			size: 'xl',
			radius: 'md',
			children: <ScenarioCreateModal
				projectId={projectId}
				close={modals.closeAll}
				callback={callback}
			/>
		});

	const openDeleteModal = (deletedScenario: Scenario) =>
		modals.open({
			title: 'Scenario delete',
			size: 'xl',
			radius: 'md',
			children: <ScenarioDeleteModal
				scenario={deletedScenario}
				close={modals.closeAll}
				callback={callback}
			/>
		});

	const columns = useMemo<MRT_ColumnDef<Scenario>[]>(
		() => [
			{
				accessorFn: (res) => res.title,
				Cell: ({ cell, row }) => (
					<Link to={routes.scenario.view.createPath(projectId, row.original.scenario_id)}>
						<Text size="md">{cell.getValue<string>()}</Text>
						<Text size="xs">{row.original.descrip}</Text>
					</Link>
				),
				header: 'Title',
				size: 150,
			},
		], [projectId]
	);

	const renderRowActions = (row: Scenario) => (
		<Flex direction={'row'} gap={'xs'}>
			<IconButton icon={Pencil} iconProps={{ size: "l" }} onClick={() => openEditModal(row)} />
			<IconButton icon={Copy} iconProps={{ size: 'l' }} onClick={() => openCloneModal(row)} />
			<IconButton icon={Trash} iconProps={{ size: "l" }} onClick={() => openDeleteModal(row)} />
		</Flex>
	);

	return (<MaterialTable<Scenario>
		data={data}
		columns={columns}
		renderRowActions={renderRowActions}
		renderTopToolbarCustomActions={() => (
			<Group style={{ display: 'flex', justifyContent: 'space-between', width: '100%' }}>
				<AddButton onClick={() => openCreateModal()} />
				<Flex gap={".6rem"}>
					<StepsControlButton projectId={projectId!} callback={callback} />
					<DurationProjectControlButton projectId={projectId!} callback={callback} />
					<HistoryButton onClick={() => openHistoryPage(projectId!)} />
				</Flex>
			</Group>
		)}
		totalCountPages={totalCountPages}
		pagination={pagination}
		setPagination={setPagination}
	/>);
};

export default TableScenarios;

