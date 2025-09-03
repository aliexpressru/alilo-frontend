import { FC, useCallback, useEffect, useMemo, useState } from 'react';

import { runService, scenarioService } from '../../services/api';
import { snackbarService } from '../../services/snackbarService';
import { Page } from '../../components/shared/Page';
import { useParams } from 'react-router-dom';
import { Run } from '../../types/RunTypes';
import { BreadcrumbsCustom } from '../../components/shared/Breadcrumbs';
import { routes } from '../../router/routes';
import { TableHistoryRun } from '../../components/History/TableHistoryProject';

const RunsScenarioHistoryPage: FC = () => {
	const { projectId } = useParams<'projectId'>();
	const { scenarioId } = useParams<'scenarioId'>();

	const [runs, setRuns] = useState<Run[]>([]);

	const [scenarioName, setScenarioName] = useState<string>('');

	const noRuns = useMemo(() => runs.length === 0, [runs.length]);

	const [loader, setLoader] = useState<boolean>(false);

	const handleUpdateRunsList = useCallback(() => {
		setLoader(true);
		runService
			.getAllRuns({
				projectId: "0",
				scenarioId: scenarioId!,
				limit: 0
			})
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
	}, [noRuns, scenarioId]);

	const handleProject = useCallback(() => {
		setLoader(true);
		scenarioService
			.getScenario(scenarioId!)
			.then((s) => setScenarioName(s.scenario.title))
			.catch((e) => {
				snackbarService.addSnack({
					palette: 'danger',
					title: e.message ?? 'Eror get project name',
				});
			})
			.finally(() => {
				setLoader(false);
			});
	}, [scenarioId]);

	useEffect(() => {
		handleProject();
		handleUpdateRunsList();
	}, [handleProject, handleUpdateRunsList]);

	return (
		<>
			<Page
				title={`Runs history of ${scenarioName} scenario`}
				loading={loader}
				breadcrumbs={<BreadcrumbsCustom links={{
					"Projects": routes.projects.path,
					"Scenarios": routes.scenario.view.createPath(projectId!, scenarioId!),
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

export { RunsScenarioHistoryPage };
