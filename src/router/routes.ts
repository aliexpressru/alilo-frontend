import { Project } from '../types/ProjectTypes';
import { Run } from '../types/RunTypes';

export const routes = {
	index: {
		path: '/',
	},
	home: {
		path: '/home',
		relativePath: 'home',
	},
	agents: {
		path: '/agents',
		relativePath: 'agents',
	},
	projects: {
		path: '/projects',
		relativePath: 'projects',
	},
	project: {
		path: '/project',
		relativePath: 'project',
		view: {
			path: '/project/:projectId',
			relativePath: ':projectId',
			createPath: (projectId: Project['id']) => `/project/${projectId}`,
		},
	},
	activeRuns: {
		path: '/runs',
		relativePath: 'runs',
	},
	help: {
		path: '/help',
		relativePath: 'help',
	},

	scenario: {
		view: {
			path: '/project/:projectId/scenario/:scenarioId',
			relativePath: ':projectId/scenario/:scenarioId',
			createPath: (projectId: string, scenarioId: string) =>
				`/project/${projectId}/scenario/${scenarioId}`,
		},
	},
	script: {
		view: {
			path: '/project/:projectId/scenario/:scenarioId/script/:scriptId',
			relativePath: 'script/:scriptId',
			createPath: (
				projectId: number,
				scenarioId: number,
				scriptId: number
			) =>
				`/project/${projectId}/scenario/${scenarioId}/script/${scriptId}`,
		},
	},
	run: {
		view: {
			path: '/run/:runId',
			relativePath: 'run/:runId',
			createPath: (runId: Run['run_id']) => `/run/${runId}`,
		},
	},
	runs: {
		viewProject: {
			path: '/runs/history/:projectId',
			relativePath: '/runs/history/:projectId',
			createPath: (projectId: string) => `/runs/history/${projectId}`,
		},
		viewScenario: {
			path: '/runs/history/:projectId/:scenarioId',
			relativePath: '/runs/history/:projectId/:scenarioId',
			createPath: (projectId: string, scenarioId: string) =>
				`/runs/history/${projectId}/${scenarioId}`,
		},
	},
	files: {
		path: '/files',
		relativePath: 'files',
	},
	noMatch: {
		path: '*',
	},
	notFound: {
		path: '/404',
		relativePath: '/404',
	},
};
