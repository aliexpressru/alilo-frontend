import {
    Box,
    Button,
    Group,
    NumberInput,
    Popover,
    Stack,
    Text,
    Title,
} from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import { useFormik } from 'formik';

import { Project } from '../../../../types/ProjectTypes';
import { Scenario } from '../../../../types/ScenarioTypes';
import { scenarioService } from '../../../../services/api';

import { BigMinus, BigPlus } from '../../../../assets/svg';
import { IconButton } from '../IconButton';
import { SimpleButton } from '../SimpleButton';
import { ActionButton } from '../ActionButton';

import styles from './DurationControlButton.module.css';
import cn from 'classnames';
const cx = cn.bind(styles);

type DurationProjectControlButtonProps = {
    projectId?: Project['id'];
    scenarioId?: Scenario['scenario_id'];
    callback: VoidFunction;
};

type DurationProps = {
    duration: number;
};

const DurationProjectControlButton = ({
                                          projectId,
                                          scenarioId,
                                          callback,
                                      }: DurationProjectControlButtonProps) => {
    const [opened, { open, close }] = useDisclosure(false);

    const changeDurationLevel = (
        op: 'increase' | 'decrease',
        value: number
    ) => {
        switch (op) {
            case 'increase':
                formik.setFieldValue(
                    'duration',
                    Math.min(formik.values.duration + value, 1500)
                );
                break;
            case 'decrease':
                formik.setFieldValue(
                    'duration',
                    Math.max(formik.values.duration - value, 5)
                );
                break;
            default:
                console.warn(`Unknown operation type: ${op}`);
                break;
        }
    };

    const formik = useFormik<DurationProps>({
        initialValues: { duration: 5 },
        onSubmit: (e) => {
            const hasProjectId = typeof projectId === 'number';
            const hasScenarioId = typeof scenarioId === 'string';

            if (hasProjectId && !hasScenarioId) {
                scenarioService.setDurationProject(projectId!, `${e.duration}m`);
            } else if (!hasProjectId && hasScenarioId) {
                scenarioService.setDurationScenario(scenarioId!, `${e.duration}m`);
            } else if (hasProjectId && hasScenarioId) {
                console.error('Need to pass only projectId or scenarioId');
            } else {
                console.error('Need to set either projectId or scenarioId');
            }

            callback();
        },
    });

    return (
        <Box>
            <Popover opened={opened} onClose={close} position="bottom" withArrow>
                <Popover.Target>
                    <Button
                        variant="default"
                        onClick={open}
                        className={styles['control-button']}
                    >
                        <Text>
                            Duration
                        </Text>
                    </Button>
                </Popover.Target>

                <Popover.Dropdown>
                    <form onSubmit={formik.handleSubmit}>
                        <Stack className={cx(styles['dialog'])} gap="md">
                            <Title order={5}>Set total duration (minutes)</Title>
                            {/* todo refactor using IncreaseButton*/}
                            <Group className={styles['elements']} grow>
                                <Box className={styles['minus-button']}>
                                    <IconButton
                                        icon={BigMinus}
                                        iconProps={{ size: 'l' }}
                                        onClick={() => changeDurationLevel('decrease', 5)}
                                    />
                                </Box>

                                <NumberInput
                                    name="duration"
                                    min={5}
                                    max={1500}
                                    value={formik.values.duration}
                                    onChange={(value) =>
                                        formik.setFieldValue('duration', value as number)
                                    }
                                    styles={{ input: { textAlign: 'center', background: 'transparent' } }}
                                    w="100%"
                                    hideControls
                                />

                                <Box className={styles['plus-button']}>
                                    <IconButton
                                        icon={BigPlus}
                                        iconProps={{ size: 'l' }}
                                        onClick={() => changeDurationLevel('increase', 5)}
                                    />
                                </Box>
                            </Group>

                            <Group w="100%">
                                <ActionButton
                                    style={{ flex: 1 }}
                                    onClick={() => {
                                        formik.submitForm();
                                        close();
                                    }}
                                    type="submit"
                                    disabled={formik.values.duration < 1}
                                >
                                    OK
                                </ActionButton>
                                <SimpleButton style={{ flex: 1 }} onClick={close}>
                                    Cancel
                                </SimpleButton>
                            </Group>
                        </Stack>
                    </form>
                </Popover.Dropdown>
            </Popover>
        </Box>
    );
};

export { DurationProjectControlButton };
