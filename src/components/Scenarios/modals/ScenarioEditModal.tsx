import {
    Flex as FlexMantine,
    // TextInput as TextInputMantine,
    Button as ButtonMantine,
    Space as SpaceMantine,
} from '@mantine/core';

import { useForm as useFormMantine } from '@mantine/form';

import { scenarioService } from '../../../services/api';
import { snackbarService } from '../../../services/snackbarService';
import { Scenario } from '../../../types/ScenarioTypes';
import { TextInput } from '../../vendor/TextInput/TextInput';
import { MODAL_CALLBACK_INTERVAL } from '../../../constants';

type ScenarioEditModalProps = {
    scenario: Scenario;
    close: VoidFunction;
    callback: VoidFunction;
};

export const ScenarioEditModal: React.FC<ScenarioEditModalProps> = (
    { scenario, close, callback }
) => {

    const form = useFormMantine({
        initialValues: {
            scenario_id: scenario.scenario_id,
            project_id: scenario.project_id,
            title: scenario.title,
            descrip: scenario.descrip,
        },
        validate: {
            title: (value) => (value.length >= 3 ? null : 'Scenario title must be more 3 charters'),
        },
    });

    const handleSubmitForm = form.onSubmit((editedScenario) => {

        scenarioService
            .updateScenario(
                editedScenario.scenario_id,
                editedScenario.project_id,
                editedScenario.title,
                editedScenario.descrip
            )
            .catch((e) => {
                snackbarService.addSnack({
                    palette: 'danger',
                    title: e.message ?? 'Error edit scenario',
                });
            });
        setTimeout(callback, MODAL_CALLBACK_INTERVAL);
        close();
    });

    return (
        <>
            <form
                onSubmit={handleSubmitForm}
            >
                <FlexMantine gap="sm" direction="column">
                    <TextInput
                        label="Title"
                        key={form.key('title')}
                        {...form.getInputProps('title', { type: 'input' })}
                    />
                    <TextInput
                        // radius="md"
                        // size="md"
                        // placeholder="Description"
                        label="Description"
                        key={form.key('descrip')}
                        {...form.getInputProps('descrip', { type: 'input' })}
                    />
                    <SpaceMantine h="xs" />
                    <FlexMantine direction="row" gap="sm">
                        <ButtonMantine radius="md" size="md" variant="filled" color="#C2FD60" type="submit" fullWidth style={{ color: "#1d1d1d" }}>EDIT</ButtonMantine>
                        <ButtonMantine radius="md" size="md" variant="filled" color="#f3f4f67c" fullWidth
                            onClick={() => close()}
                            style={{ color: "#1d1d1d" }}>Cancel</ButtonMantine>
                    </FlexMantine>
                </FlexMantine>
            </form>
        </>
    );
};
