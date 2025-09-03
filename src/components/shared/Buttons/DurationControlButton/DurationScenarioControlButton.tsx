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
import {useDisclosure} from '@mantine/hooks';
import {useFormik} from 'formik';
import {IconMinus, IconPlus} from '@tabler/icons-react';

import {scenarioService} from '../../../../services/api';
import {Scenario} from '../../../../types/ScenarioTypes';
import {snackbarService} from '../../../../services/snackbarService';

type DurationScenarioControlButtonProps = {
    scenarioId: Scenario['scenario_id'];
    callback: VoidFunction;
};

type DurationProps = {
    duration: number;
};

const DurationScenarioControlButton = ({
                                           scenarioId,
                                           callback,
                                       }: DurationScenarioControlButtonProps) => {
    const [opened, {open, close}] = useDisclosure(false);

    const changeDurationLevel = (
        op: 'increase'|'decrease',
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
                break;
        }
    };

    const formik = useFormik<DurationProps>({
        initialValues: {duration: 5},
        onSubmit: (e) => {
            scenarioService
                .setDurationScenario(scenarioId, `${e.duration}m`)
                .then((response) => {
                    if (response.status) {
                        snackbarService.addSnack({
                            palette: 'success',
                            title: 'Duration updated',
                        });
                    } else {
                        snackbarService.addSnack({
                            palette: 'danger',
                            title: 'Error update duration',
                        });
                    }
                });
            callback();
        },
    });

    return (
        <Box>
            <Popover opened={opened} onClose={close} position="bottom" withArrow>
                <Popover.Target>
                    <Button variant="default" onClick={open}>
                        <Text>Duration</Text>
                    </Button>
                </Popover.Target>
                <Popover.Dropdown>
                    <form onSubmit={formik.handleSubmit}>
                        <Stack gap="md">
                            <Title order={5}>Set total duration (minutes)</Title>
                            <Group align="center" grow>
                                <Button
                                    variant="subtle"
                                    onClick={() => changeDurationLevel('decrease', 5)}
                                >
                                    <IconMinus size={20}/>
                                </Button>
                                <NumberInput
                                    name="duration"
                                    min={5}
                                    max={1500}
                                    value={formik.values.duration}
                                    onChange={(value) =>
                                        formik.setFieldValue('duration', value as number)
                                    }
                                    styles={{input: {textAlign: 'center'}}}
                                />
                                <Button
                                    variant="subtle"
                                    onClick={() => changeDurationLevel('increase', 5)}
                                >
                                    <IconPlus size={20}/>
                                </Button>
                            </Group>
                            <Group grow>
                                <Button
                                    type="submit"
                                    onClick={() => {
                                        formik.submitForm();
                                        close();
                                    }}
                                >
                                    OK
                                </Button>
                                <Button variant="outline" onClick={close}>
                                    Cancel
                                </Button>
                            </Group>
                        </Stack>
                    </form>
                </Popover.Dropdown>
            </Popover>
        </Box>
    );
};

export {DurationScenarioControlButton};
