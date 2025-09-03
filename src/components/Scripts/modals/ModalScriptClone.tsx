import {
    Flex,
    // Select as SelectMantine,
    Button,
    Space,
    Text,
} from '@mantine/core';

import { useForm } from '@mantine/form';

import { useCallback, useEffect, useState } from 'react';
import {
    projectService,
    scenarioService,
    scriptService,
} from '../../../services/api';
import { Project } from '../../../types/ProjectTypes';
import { snackbarService } from '../../../services/snackbarService';
import { Scenario } from '../../../types/ScenarioTypes';
import { Select } from '../../vendor/Select/Select';
import { SimpleScript, Script } from '../../../types/ScriptTypes';
import { MODAL_CALLBACK_INTERVAL } from '../../../constants';

type ModalScriptCloneProps = {
    script: SimpleScript | Script;
    callback: VoidFunction;
    close: VoidFunction;
};

export const ModalScriptClone: React.FC<ModalScriptCloneProps> = (
    { script, callback, close }
) => {

    const isSimpleScriptType = (s: SimpleScript | Script): boolean => {
        if ((s as SimpleScript).http_method) {
            return true;
        }
        return false;
    };

    const form = useForm({
        initialValues: {
            target_project_id: '',
            target_scenario_id: '',
            source_script_id: script.script_id,
        },
    });

    const [projects, setProjects] = useState<Project[]>([]);
    const [scenarios, setScenarios] = useState<Scenario[]>([]);

    const handleGetProjects = useCallback(() => {
        projectService
            // LOAD - 1220
            .getAllProjects(10000, 0)
            .then((p) => {
                setProjects(p.projects);
            })
            .catch((e) => {
                snackbarService.addSnack({
                    palette: 'danger',
                    title: e.message ?? 'Error fetch projects',
                });
            });
    }, []);

    const handleGetScenarios = useCallback((projectId: string) => {
        scenarioService
            // LOAD - 1220
            .getAllScenarios(projectId, 10000, 0)
            .then((s) => {
                setScenarios(s.scenarios);
            })
            .catch((e) => {
                snackbarService.addSnack({
                    palette: 'danger',
                    title: e.message ?? 'Error fetch scenarios',
                });
            });
    }, []);

    const cloneExtendedScript = useCallback(
        (sourceScriptId: number, targetScenarioId: string) => {
            scriptService
                .copyScript(sourceScriptId, targetScenarioId)
                .then(() => {
                    snackbarService.addSnack({
                        palette: 'success',
                        title: 'script cloned!',
                    });
                })
                .catch(() => {
                    snackbarService.addSnack({
                        palette: 'danger',
                        title: 'Error while cloning',
                    });
                });
        }, []
    );
    const cloneSimpleScript = useCallback(
        (sourceScriptId: number, targetScenarioId: string) => {
            scriptService
                .copySimpleScript(sourceScriptId, targetScenarioId)
                .then(() => {
                    snackbarService.addSnack({
                        palette: 'success',
                        title: 'script cloned!',
                    });
                })
                .catch(() => {
                    snackbarService.addSnack({
                        palette: 'danger',
                        title: 'Error while cloning',
                    });
                });
        }, []
    );

    const handleSubmitForm = form.onSubmit(() => {
        const sourceScriptId = form.getValues().source_script_id;
        const targetScenarioId = form.getValues().target_scenario_id;

        if (isSimpleScriptType(script)) {
            cloneSimpleScript(sourceScriptId, targetScenarioId);
        } else {
            cloneExtendedScript(sourceScriptId, targetScenarioId);
        }

        setTimeout(callback, MODAL_CALLBACK_INTERVAL);
        close();
    });

    useEffect(() => {
        handleGetProjects();
    }, [handleGetProjects]);

    return (
        <>
            <form
                onSubmit={handleSubmitForm}
            >
                <Flex gap="sm" direction="column">
                    <Flex gap="sm" direction="row">
                        <Text size="md">Select a target project and scenario to copy script </Text>
                        <Text fw={700}>{script.name}</Text>
                    </Flex>
                    <Select
                        label={"Project"}
                        data={
                            projects.map((p) => ({
                                label: p.title,
                                value: p.id.toString(),
                            }))
                        }
                        key={form.key('target_project_id')}
                        {...form.getInputProps('target_project_id', { type: 'input' })}
                        onChange={(value, _) => {
                            if (value) {
                                form.setFieldValue('target_project_id', value);
                                form.setFieldValue('target_scenario_id', '');
                                handleGetScenarios(value);
                            }
                        }}
                        searchable
                        allowDeselect={false}
                    />
                    <Select
                        label={"Scenario"}
                        data={
                            scenarios.map((s) => ({
                                label: s.title,
                                value: s.scenario_id.toString(),
                            }))
                        }
                        key={form.key('target_scenario_id')}
                        {...form.getInputProps('target_scenario_id', { type: 'input' })}
                        onChange={(value, _) => {
                            if (value) {
                                form.setFieldValue('target_scenario_id', value);
                            }
                        }}
                        disabled={scenarios.length === 0}
                        searchable
                        allowDeselect={false}
                    />
                    <Space h="xs" />
                    <Flex direction="row" gap="sm">
                        <Button radius="md" size="md" variant="filled" color="#C2FD60" type="submit" fullWidth style={{ color: "#1d1d1d" }}>CLONE</Button>
                        <Button radius="md" size="md" variant="filled" color="#f3f4f67c" fullWidth
                            onClick={() => close()}
                            style={{ color: "#1d1d1d" }}>Cancel</Button>
                    </Flex>
                </Flex>
            </form>
        </>
    );
};
