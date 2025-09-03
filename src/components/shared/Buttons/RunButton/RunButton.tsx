import {Box, Group, Loader, NumberInput, Popover, Stack, Title, Button} from '@mantine/core';
import {useCallback, useEffect, useState} from 'react';
import {useFormik} from 'formik';

import {Run} from '../../../../types/RunTypes';
import {Scenario} from '../../../../types/ScenarioTypes';
import {runService, scenarioService} from '../../../../services/api';
import {routes} from '../../../../router/routes';
import {PROJECT_LIST_INTERVAL} from '../../../../constants';
import {snackbarService} from '../../../../services/snackbarService';

import {IconButton} from '../IconButton';
import {ActionButton} from '../ActionButton';
import {SimpleButton} from '../SimpleButton';

import {BigMinus, BigPlus, Play} from '../../../../assets/svg';

import styles from './RunButton.module.css';
import {useDisclosure} from "@mantine/hooks";

type RunButtonProps = {
    scenarioId: Scenario['scenario_id'];
};

type StartRun = {
    scenarioId: Scenario['scenario_id'];
    percentage: Run['percentage_of_target'];
};

const RunButton = ({ scenarioId }: RunButtonProps) => {
    const [scenarioRunStatus, setScenarioRunStatus] = useState<Run['status']>('');
    const [lastRunId, setLastRunId] = useState<number>(0);
    const [opened, { close, toggle }] = useDisclosure(false);

    const userName = localStorage.getItem('userName') ?? 'unknown';
    const preferredUsername = localStorage.getItem('preferredUsername') ?? 'unknown';

    const formik = useFormik<StartRun>({
        initialValues: {
            scenarioId,
            percentage: 100,
        },
        onSubmit: (e) => {
            runService
                .startRun(e.scenarioId, userName, preferredUsername, e.percentage)
                .then((response) => {
                    if (response.run === null) return;

                    close();
                    window.open(routes.run.view.createPath(response.run.run_id));
                });
        },
    });

    const handleUpdateScriptList = useCallback(() => {
        scenarioService
            .getLastRunStatusScenario(scenarioId!)
            .then((response) => {
                setScenarioRunStatus(response.last_run_status);
                setLastRunId(response.last_run_id);
            })
            .catch((e) => {
                snackbarService.addSnack({
                    palette: 'danger',
                    title: e.message ?? 'Error while fetching scenarios',
                });
            });
    }, [scenarioId]);

    useEffect(() => {
        handleUpdateScriptList();
        const interval = setInterval(handleUpdateScriptList, PROJECT_LIST_INTERVAL);
        return () => clearInterval(interval);
    }, [handleUpdateScriptList]);

    const changeDurationLevel = (op: 'increase' | 'decrease', value: number) => {
        const current = formik.values.percentage;
        if (op === 'increase') {
            formik.setFieldValue('percentage', Math.min(current + value, 1000));
        } else {
            formik.setFieldValue('percentage', Math.max(current - value, 10));
        }
    };

    return (
        <Box>
            {scenarioRunStatus === 'STATUS_STOPPED_UNSPECIFIED' || scenarioRunStatus === '' ? (
                <Popover
                    width={300}
                    position="bottom"
                    withArrow
                    shadow="md"
                    opened={opened}
                    onClose={close}
                >
                    <Popover.Target>
                        <Button bg={"#C2FD60"} h={48} onClick={toggle}>
                            <Play />
                        </Button>
                    </Popover.Target>
                    <Popover.Dropdown>
                        <form onSubmit={formik.handleSubmit}>
                            <Stack gap="sm" className={styles['dialog']}>
                                <Title order={4}>Set load level (%)</Title>
                                <Group justify="space-between">
                                    <IconButton
                                        icon={BigMinus}
                                        iconProps={{ size: 'l' }}
                                        onClick={() => changeDurationLevel('decrease', 5)}
                                    />
                                    <NumberInput
                                        name="percentage"
                                        value={formik.values.percentage}
                                        onChange={(value) =>
                                            formik.setFieldValue('percentage', value === null ? 100 : value)
                                        }
                                        onBlur={() => {
                                            if (formik.values.percentage.toString() === '') {
                                                formik.setFieldValue('percentage', 100);
                                            }
                                        }}
                                        min={10}
                                        max={1000}
                                        styles={{ input: { textAlign: 'center', border: 0 } }}
                                        hideControls
                                        style={{ flexGrow: 1 }}
                                    />
                                    <IconButton
                                        icon={BigPlus}
                                        iconProps={{ size: 'l' }}
                                        onClick={() => changeDurationLevel('increase', 5)}
                                    />
                                </Group>

                                <Group grow>
                                    {[10, 30, 50].map((value) => (
                                        <SimpleButton
                                            key={value}
                                            size="sm"
                                            onClick={() => formik.setFieldValue('percentage', value)}
                                        >
                                            {value}%
                                        </SimpleButton>
                                    ))}
                                </Group>

                                <Group grow>
                                    <ActionButton type="submit" disabled={formik.values.percentage < 1}>
                                        RUN
                                    </ActionButton>
                                    <SimpleButton type="button" onClick={close}>
                                        Cancel
                                    </SimpleButton>
                                </Group>
                            </Stack>
                        </form>
                    </Popover.Dropdown>
                </Popover>
            ) : (
                <ActionButton
                    style={{background: '#fe2722'}}
                    onClick={() => {
                        window.open(routes.run.view.createPath(lastRunId));
                    }}
                >
                    <Loader className={styles['loader']} />
                </ActionButton>
            )}
        </Box>
    );
};

export { RunButton };
