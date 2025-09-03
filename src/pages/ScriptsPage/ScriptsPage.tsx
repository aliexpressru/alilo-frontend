import { FC, useCallback, useEffect, useMemo, useState } from 'react';
import { Page } from '../../components/shared/Page';
import { useNavigate, useParams } from 'react-router-dom';
import { BreadcrumbsCustom } from '../../components/shared/Breadcrumbs';
import { routes } from '../../router/routes';
import { scriptService } from '../../services/api/scriptService';
import { Script, SimpleScript } from '../../types/ScriptTypes';
import { snackbarService } from '../../services/snackbarService';
import { TITLE_PAGE_LENGTH } from '../../constants';
import { projectService, scenarioService } from '../../services/api';
import { Scenario } from '../../types/ScenarioTypes';
import { TableScripts } from '../../components/Scripts/TableScripts';
import { Project } from "../../types/ProjectTypes";

const ScriptsPage: FC = () => {
	const { projectId } = useParams<{ projectId: string }>();
	const { scenarioId } = useParams<{ scenarioId: string }>();

	const [scripts, setScripts] = useState<Script[]>([]);
	const [simpleScripts, setSimpleScripts] = useState<SimpleScript[]>([]);

	const [scenarioName, setScenarioName] = useState<Scenario['title']>('');
	const [projectName, setProjectName] = useState<Project['title']>('');

	const [loader, setLoader] = useState<boolean>(false);

	const navigate = useNavigate();

	const noScripts = useMemo(() => scripts.length === 0, [scripts.length]);
	const noSimpleScripts = useMemo(
		() => simpleScripts.length === 0,
		[simpleScripts.length]
	);

	const handleUpdateScriptList = useCallback(() => {
		setLoader(true);
		scriptService
			.getAllScripts(scenarioId!)
			.then((sc) => {
				setScripts(sc.scripts);
				setSimpleScripts(sc.simple_scripts);
			})
			.catch((e) => {
				if (noScripts || noSimpleScripts) {
					snackbarService.addSnack({
						palette: 'danger',
						title: e.message ?? 'Error while fetching scenarios',
					});
				}
			})
			.finally(() => {
				setLoader(false);
			});
	}, [noScripts, noSimpleScripts, scenarioId]);

	const renderLoader = useMemo(
		() => (noScripts || noSimpleScripts) && loader,
		[loader, noScripts, noSimpleScripts]
	);

	useEffect(() => {
		handleUpdateScriptList();
		// const interval = setInterval(
		// 	handleUpdateScriptList,
		// 	PROJECT_LIST_INTERVAL
		// );
		// return () => clearInterval(interval);
	}, [handleUpdateScriptList]);


	useEffect(() => {
		if (!projectId) {
			return;
		}

		scenarioService
			.getScenario(scenarioId!)
			.then(({ scenario }) => {
				if (!scenario) {
					navigate(`/projects`);
					return;
				}
				if (scenario!.project_id.toString() !== projectId) {
					navigate(`/project/${scenario!.project_id}/scenario/${scenarioId}`);
					return;
				}
				setScenarioName(scenario!.title);
			});

		projectService
			.getProject(projectId!)
			.then(({ project }) => {
				setProjectName(project!.title);
			});
		}, [projectId, scenarioId, navigate]);

	return (
		<>
			<Page
				title={
					scenarioName.length > TITLE_PAGE_LENGTH
						? `${scenarioName.slice(0, TITLE_PAGE_LENGTH)}...`
						: scenarioName
				}
				breadcrumbs={
					<BreadcrumbsCustom
						links={{
							Projects: routes.projects.path,
							[projectName]: routes.project.view.createPath(
								projectId!
							),
							[scenarioName]: '',
						}}
					/>
				}
				loading={renderLoader}
			>
				{(scripts || simpleScripts) && scenarioId && (
					<>
						<TableScripts
							projectId={projectId!}
							scenarioId={+scenarioId}
							scripts={scripts}
							simpleScripts={simpleScripts}
							callback={handleUpdateScriptList}
						/>
					</>
				)}
			</Page>
		</>
	);
};

export { ScriptsPage };
