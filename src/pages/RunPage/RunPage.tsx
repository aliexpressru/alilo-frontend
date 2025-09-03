import { FC, useCallback, useEffect, useState } from 'react';
import { Page } from '../../components/shared/Page';
import { BreadcrumbsCustom } from '../../components/shared/Breadcrumbs';
import { routes } from '../../router/routes';
import { useParams } from 'react-router-dom';
import { projectService, runService, scenarioService } from '../../services/api';
import { Run, ScriptRunType } from '../../types/RunTypes';
import {Box} from '@mantine/core';
import { RUN_PAGE_INTERVAL, TITLE_PAGE_LENGTH } from '../../constants';
import TableRun from "../../components/Runs/TableRun/TableRun";

const RunPage: FC = () => {
	const runIdParam = useParams<'runId'>();

	const [runner, setRunner] = useState<Run | null>(null);
	const [runId, setRunId] = useState<number>();
	const [projectTitle, setProjectTitle] = useState<string>('');
	const [scenarioTitle, setScenarioTitle] = useState<string>('');

	const handleFetchRun = useCallback(() => {
		if (!runIdParam.runId) {
			return;
		}

		runService.getRun(+runIdParam.runId).then((fetchedRunner) => {
			setRunner(fetchedRunner.run);
			if (runIdParam) {
				setRunId(Number.parseInt(runIdParam.runId!, 10));
			}

			return fetchedRunner;
		}).then((fetchedRunner) => {
			const projectId = fetchedRunner.run?.project_id;
			if (projectId) {
				projectService.getProject(projectId).then((res) => {
					setProjectTitle(res.project?.title ?? '');
				});
			}

			return fetchedRunner;
		}
		).then((fetchedRunner) => {
			const scenarioId = fetchedRunner.run?.scenario_id;
			if (scenarioId) {
				scenarioService.getScenario(scenarioId).then((res) => {
					setScenarioTitle(res.scenario.title ?? '');
				});
			}
		});
	}, [runIdParam]);

	const getTestDuration = () => {
		if (runner && runner.script_runs) {
			const strDurations = runner.script_runs
				.filter((r) => {
					if (r.type_script_run === ScriptRunType.TYPE_SCRIPT_RUN_EXTENDED_UNSPECIFIED) {
						return r.script !== null;
					} else {
						return r.simple_script !== null;
					}
				})
				.map((sr) => sr.type_script_run === ScriptRunType.TYPE_SCRIPT_RUN_SIMPLE
					? sr.simple_script?.duration
					: sr.script?.options.duration
				);

			const numDuration = strDurations.map(
				(s) => {
					if (!s) {
						return -1;
					}
					return Number.parseInt(s.slice(0, -1), 10) | 0;
				}
			);

			return Math.max(...numDuration).toString();
		}
		return "";
	};

	useEffect(() => {
		handleFetchRun();

		const interval = setInterval(handleFetchRun, RUN_PAGE_INTERVAL);
		return () => clearInterval(interval);
	}, [handleFetchRun, runIdParam]);

	const prepareTitle = (title: string | undefined) => {
		if (title) {
			// eslint-disable-next-line no-unused-expressions
			return title.length > TITLE_PAGE_LENGTH
				? `${title.slice(0, TITLE_PAGE_LENGTH)}...`
				: title;
		} else {
			return "None";
		}
	};

	return (
		<>
			<Page
				title={
					prepareTitle(runner?.title ?? '')
				}
				loading={false}
				breadcrumbs={
					<BreadcrumbsCustom links={
						{
							// projects -> [current project] -> [current scenario] -> test
							"Projects": routes.projects.path,
							[projectTitle]: routes.project.view.createPath(
								runner?.project_id || "",
							),
							[scenarioTitle]: routes.scenario.view.createPath(
								runner?.project_id || "",
								runner?.scenario_id || "",
							),
							"Test": ""
						}
					} />
				}
			>
				<Box>
					{runner && runId && (
						<TableRun
							runId={runId}
							runStatus={runner.status}
							scriptRuns={runner.script_runs}
							startTime={runner.created_at}
							testDuration={getTestDuration()}
							loadLevel={runner.percentage_of_target}
							launchedBy={runner.user_name}

						/>
					)}
				</Box>
			</Page>
		</>
	);
};

export { RunPage };
