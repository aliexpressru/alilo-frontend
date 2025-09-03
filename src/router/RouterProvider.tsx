import { Navigate, Route, Routes } from 'react-router-dom';
import { routes } from './routes';

import { Layout } from '../components/layout';
import { ProjectsPage } from '../pages/ProjectsPage';
import { AgentsPage } from '../pages/AgentsPage';
import { RunPage } from '../pages/RunPage';
import { NotFound } from '../pages/NotFound';
import { HelpPage } from '../pages/HelpPage';
import { ScenariosPage } from '../pages/ScenariosPage';
import { ScriptsPage } from '../pages/ScriptsPage';
import { RunsProjectHistoryPage, RunsScenarioHistoryPage } from '../pages/RunsHistoryPage';
import { RunsStatusPage } from '../pages/RunsPage';
import React from "react";
import { FilesPage } from "../pages/FilesPage";

const RouterProvider: React.FC = () => (
    <Routes>
        <Route path={routes.index.path} element={<Layout />}>
            <Route
                index
                element={<Navigate to={routes.projects.path} replace />}
            />
            <Route
                path={routes.projects.relativePath}
                element={<ProjectsPage />}
            />
            <Route
                path={routes.agents.relativePath}
                element={
                    <AgentsPage />}
            />
            <Route path={routes.activeRuns.path} element={<RunsStatusPage />} />
            <Route path={routes.help.relativePath} element={<HelpPage />} />
            <Route path={routes.project.relativePath}>
                <Route
                    path={routes.project.view.relativePath}
                    element={<ScenariosPage />}
                />
            </Route>
            <Route path={routes.project.relativePath}>
                <Route
                    path={routes.scenario.view.relativePath}
                    element={<ScriptsPage />}
                />
            </Route>
            <Route path={routes.run.view.relativePath} element={<RunPage />} />
            <Route
                path={routes.runs.viewProject.relativePath}
                element={<RunsProjectHistoryPage />}
            />
            <Route
                path={routes.runs.viewScenario.relativePath}
                element={<RunsScenarioHistoryPage />}
            />
            <Route path={routes.files.path} element={<FilesPage />} />
            <Route path={`${routes.notFound.path}`} element={<NotFound />} />
            <Route
                path={routes.noMatch.path}
                element={<Navigate to={routes.notFound.path} />}
            />
        </Route>
    </Routes>
);

export { RouterProvider };
