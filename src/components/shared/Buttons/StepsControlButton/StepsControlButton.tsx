import { Box, Button, Popover, Text, } from '@mantine/core';
import {useDisclosure} from '@mantine/hooks';
import {useFormik} from 'formik';

import {scenarioService} from '../../../../services/api';
import {Project} from '../../../../types/ProjectTypes';
import {Scenario} from '../../../../types/ScenarioTypes';
import {snackbarService} from "../../../../services/snackbarService";
import {IncreaseButton} from "../../IncreaseButton";

type StepsControlButtonProps = {
    projectId?: Project['id'];
    scenarioId?: Scenario['scenario_id'];
    callback: VoidFunction;
};

type StepsProps = {
    steps: number;
};

export const StepsControlButton = ({
                                       projectId,
                                       scenarioId,
                                       callback,
                                   }: StepsControlButtonProps) => {
    const [opened, {open, close}] = useDisclosure(false);

    const formik = useFormik<StepsProps>({
        initialValues: {
            steps: 1,
        },
        onSubmit: (e) => {
            const params: {
                projectId?: number|null;
                scenarioId?: number|null;
            } = {
                projectId: null,
                scenarioId: null,
            };

            if (projectId) {
                params.projectId = Number.parseInt(projectId, 10);
            }

            if (scenarioId) {
                params.scenarioId = Number.parseInt(scenarioId, 10);
            }

            scenarioService
                .setStepsScenario(`${e.steps}`, params.projectId, params.scenarioId)
                .then((response) => {
                    if (response.status) {
                        snackbarService.addSnack({
                            palette: 'success',
                            title: 'Steps updated',
                        });
                    } else {
                        snackbarService.addSnack({
                            palette: 'danger',
                            title: 'Error updating steps duration',
                        });
                    }
                });
            callback();
        },
    });

    return (
        <Box>
            <Popover opened={opened} onClose={close} width={300} position="bottom" withArrow shadow="md">
                <Popover.Target>
                    <Button
                        h={47}
                        bg="#f3f4f6"
                        variant="light"
                        onClick={open}
                        style={{ padding: '0 16px', fontWeight: 500 }}
                    >
                        <Text>Steps</Text>
                    </Button>
                </Popover.Target>
                <Popover.Dropdown>
                    <form onSubmit={formik.handleSubmit}>
                        <IncreaseButton
                            value={formik.values.steps}
                            onChange={(val) => formik.setFieldValue('steps', val)}
                            onSubmit={formik.submitForm}
                            onCancel={close}
                        />
                    </form>
                </Popover.Dropdown>
            </Popover>
        </Box>
    );
};
