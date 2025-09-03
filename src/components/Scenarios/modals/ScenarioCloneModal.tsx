import {
    Flex as FlexMantine,
    // Select as SelectMantine,
    Button as ButtonMantine,
    Space as SpaceMantine,
    Text as TextMantine,
    Checkbox,
} from '@mantine/core';

import { useForm as useFormMantine } from '@mantine/form';

import { useCallback, useEffect, useState } from 'react';
import {
    projectService,
    scenarioService,
    // scenarioService
} from '../../../services/api';
import { Project } from '../../../types/ProjectTypes';
import { snackbarService } from '../../../services/snackbarService';
import { Scenario } from '../../../types/ScenarioTypes';
import { Select } from '../../vendor/Select/Select';
import { MODAL_CALLBACK_INTERVAL } from '../../../constants';

type ScenarioCloneModalProps = {
    scenario: Scenario;
    close: VoidFunction;
    callback: VoidFunction;
};

export const ScenarioCloneModal: React.FC<ScenarioCloneModalProps> = (
    { scenario, close, callback }
) => {

    const form = useFormMantine({
        initialValues: {
            target_project_id: '',
            target_scenario_id: '',
            scenario_id: scenario.scenario_id,
            project_id: scenario.project_id,
            title: scenario.title,
            descrip: scenario.descrip,
            new: true,
        },
        onValuesChange: (values) => {
            if (!values.new) {
                handleGetScenarios(values.target_project_id);
            }
        }
    });

    const [projects, setProjects] = useState<Project[]>([]);

    const handleGetProjects = useCallback(() => {
        projectService
            // LOAD-1220
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

    const [scenarios, setScenarios] = useState<Scenario[]>([]);

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

    const handleSubmitForm = form.onSubmit((clonedScenario) => {
        // const newTitleClonedScenario = `Cloned ${clonedScenario.title}`;
        // console.log(
        //     'ScnId: ', clonedScenario.scenario_id,
        //     'Target PrjId: ', clonedScenario.target_project_id,
        //     'Target ScnId: ', clonedScenario.target_scenario_id,
        //     'Title: ', newTitleClonedScenario,
        //     'Descrip: ', clonedScenario.descrip,
        //     'New?: ', clonedScenario.new
        // );
        scenarioService
            .copyScenario(
                clonedScenario.scenario_id,
                clonedScenario.target_project_id,
                clonedScenario.target_scenario_id,
                clonedScenario.title,
                clonedScenario.descrip,
                clonedScenario.new
            )
            .catch((e) => {
                snackbarService.addSnack({
                    palette: 'danger',
                    title: e.message ?? 'Error clone scenario',
                });
            })
            .finally(() => {
                window.location.reload();
            });

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
                <FlexMantine gap="sm" direction="column" >
                    <FlexMantine gap="sm" direction="row">
                        <TextMantine size="md">Select a target project to copy scenario </TextMantine>
                        <TextMantine fw={700}>{scenario.title}</TextMantine>
                    </FlexMantine>
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
                            }
                        }}
                        searchable
                        allowDeselect={false}
                    />
                    <Checkbox
                        disabled={form.getValues().target_project_id === ''}
                        defaultChecked
                        label="Create new scenario"
                        color="red"
                        key={form.key('new')}
                        {...form.getInputProps('new', { type: 'checkbox' })}
                    />
                    {form.getValues().new ? (
                        <></>
                    ) : (
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
                            disabled={scenarios.length === 0}
                            searchable
                            allowDeselect={false}
                        />
                    )}
                    <SpaceMantine h="xs" />
                    <FlexMantine direction="row" gap="sm">
                        <ButtonMantine radius="md" size="md" variant="filled" color="#C2FD60" type="submit" fullWidth style={{ color: "#1d1d1d" }}>CLONE</ButtonMantine>
                        <ButtonMantine radius="md" size="md" variant="filled" color="#f3f4f67c" fullWidth
                            onClick={() => close()}
                            style={{ color: "#1d1d1d" }}>Cancel</ButtonMantine>
                    </FlexMantine>
                </FlexMantine>
            </form>
        </>
    );
};
