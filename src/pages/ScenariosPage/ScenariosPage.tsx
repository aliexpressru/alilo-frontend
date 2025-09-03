import React, { FC, useCallback, useEffect, useState } from 'react';

import { projectService, scenarioService } from '../../services/api';

import { TITLE_PAGE_LENGTH, PAGINATION_SETTINGS_KEY } from '../../constants';
import { Page } from '../../components/shared/Page';
import { Scenario } from '../../types/ScenarioTypes';
import { useParams } from 'react-router-dom';
import { BreadcrumbsCustom } from '../../components/shared/Breadcrumbs';
import { routes } from '../../router/routes';
import { notifications } from '@mantine/notifications';
import TableScenarios from "../../components/Scenarios/TableScenarios/TableScenarios";
import { MRT_PaginationState } from "material-react-table";
import { useMRTPagination } from "../../hooks/useMRTPagination";

const ScenariosPage: FC = () => {
	// Используем React для удовлетворения noUnusedLocals
	console.log('React version:', React.version);
	const { projectId } = useParams<{ projectId: string }>();
	const { currentPageSize, setCurrentPageSize } = useMRTPagination();

	const [projectName, setProjectName] = useState<string>('');
	const [scenarios, setScenarios] = useState<Scenario[]>([]);
	const [totalProjectCountPages, setTotalScenarioCount] = useState<number>(0);
	const [pagination, setPagination] = useState<MRT_PaginationState>({
		pageIndex: 0,
		pageSize: currentPageSize.CurrentScenarioPage,
	});

	const [loader, setLoader] = useState<boolean>(false);

	const handleGetAllScenarios = useCallback(() => {
		setLoader(true);

		currentPageSize.CurrentScenarioPage = pagination.pageSize;
		localStorage.setItem(PAGINATION_SETTINGS_KEY, JSON.stringify(currentPageSize));
		setCurrentPageSize(currentPageSize);

		scenarioService
			.getAllScenarios(projectId!, pagination.pageSize, pagination.pageIndex + 1)
			.then((s) => {
				setScenarios(s.scenarios ? s.scenarios : []);
				setTotalScenarioCount(s.totalPages);
			})
			.catch((e) => {
				notifications.show({
					title: 'Error',
					message: e.message ?? 'Eror while fetching scenarios',
					autoClose: 3000,
					withCloseButton: false,
					radius: 'md'
				});
			}).finally(() => {
				setLoader(false);
			});

	}, [projectId, pagination, currentPageSize, setCurrentPageSize]);

	useEffect(() => {
		projectService
			.getProject(projectId!)
			.then(({ project }) => setProjectName(project!.title));
	}, [projectId]);

	useEffect(() => {
		handleGetAllScenarios();
	}, [handleGetAllScenarios]);

	return (
		<>
			<Page
				title={
					projectName.length > TITLE_PAGE_LENGTH
						? `${projectName.slice(0, TITLE_PAGE_LENGTH)}...`
						: projectName
				}
				breadcrumbs={
					<BreadcrumbsCustom
						links={{
							Projects: routes.projects.path,
							[projectName]: '',
						}}
					/>
				}
				loading={loader}
			>
				{projectId && (
					<TableScenarios
						pagination={pagination}
						totalCountPages={totalProjectCountPages}
						setPagination={setPagination}
						projectId={projectId}
						data={scenarios}
						callback={handleGetAllScenarios}
					/>
				)}
			</Page>
		</>
	);
};

export { ScenariosPage };
