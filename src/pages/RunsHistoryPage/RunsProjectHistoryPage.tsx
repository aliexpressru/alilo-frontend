import { FC, useCallback, useEffect, useMemo, useState } from 'react';

import { projectService, runService } from '../../services/api';
import { snackbarService } from '../../services/snackbarService';
import { Page } from '../../components/shared/Page';
import { useParams } from 'react-router-dom';
import { Run } from '../../types/RunTypes';
import { BreadcrumbsCustom } from '../../components/shared/Breadcrumbs';
import { routes } from '../../router/routes';
import { TableHistoryRun } from '../../components/History/TableHistoryProject';

const RunsProjectHistoryPage: FC = () => {
	const { projectId } = useParams<'projectId'>();

	const [runs, setRuns] = useState<Run[]>([]);
	const [projectName, setProjectName] = useState<string>('');

	const noRuns = useMemo(() => runs.length === 0, [runs.length]);

	const [loader, setLoader] = useState<boolean>(false);

	const handleUpdateRunsList = useCallback(() => {
		setLoader(true);
		runService
			.getAllRuns({ projectId })
			.then((r) => {
				setRuns(r.runs);
			})
			.catch((e) => {
				if (noRuns) {
					snackbarService.addSnack({
						palette: 'danger',
						title: e.message ?? 'Eror while fetching runs',
					});
				}
			})
			.finally(() => {
				setLoader(false);
			});
	}, [noRuns, projectId]);

	const handleProject = useCallback(() => {
		setLoader(true);
		projectService
			.getProject(projectId!)
			.then((r) => {
				setProjectName(r.project!.title);
			})
			.catch((e) => {
				snackbarService.addSnack({
					palette: 'danger',
					title: e.message ?? 'Eror get project name',
				});
			})
			.finally(() => {
				setLoader(false);
			});
	}, [projectId]);

	useEffect(() => {
		handleProject();
		handleUpdateRunsList();
	}, [handleProject, handleUpdateRunsList]);

	return (
		<>
			<Page
				title={`Runs history of ${projectName} project`}
				loading={loader}
				breadcrumbs={<BreadcrumbsCustom links={{
					"Projects": routes.projects.path,
					"History": ""
				}} />}
			>
				<TableHistoryRun
					runs={runs}
					callback={handleUpdateRunsList}
				/>
			</Page >
		</>
	);
};

export { RunsProjectHistoryPage };
