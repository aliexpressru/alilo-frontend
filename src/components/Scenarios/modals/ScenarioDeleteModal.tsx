import {
    Flex as FlexMantine,
    // TextInput as TextInputMantine,
    Button as ButtonMantine,
    Space as SpaceMantine,
    Text as TextMantine
} from '@mantine/core';

import { useForm as useFormMantine } from '@mantine/form';

import { snackbarService } from '../../../services/snackbarService';
import { scenarioService } from '../../../services/api';
import { Scenario } from '../../../types/ScenarioTypes';
import { TextInput } from '../../vendor/TextInput/TextInput';
import { MODAL_CALLBACK_INTERVAL } from '../../../constants';

type ScenarioDeleteModalProps = {
    scenario: Scenario;
    close: VoidFunction;
    callback: VoidFunction;
};

export const ScenarioDeleteModal: React.FC<ScenarioDeleteModalProps> = (
    { scenario, close, callback }
) => {

    const form = useFormMantine({
        initialValues: {
            scenario_id: scenario.scenario_id,
            project_id: scenario.project_id,
            title: '',
            descrip: scenario.descrip,
        },
        validate: {
            title: (value) => (value === scenario.title ? null : 'Title of scenario must be equal scenario title'),
        },
    });

    const handleSubmitForm = form.onSubmit((deletedScenario) => {
        scenarioService
            .deleteScenario(deletedScenario.scenario_id)
            .catch((e) => {
                snackbarService.addSnack({
                    palette: 'danger',
                    title: e.message ?? 'Error delete scenario',
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
                    <FlexMantine gap="xs" direction="row">
                        <TextMantine size="md">Confirm for delete scenario </TextMantine>
                        <TextMantine fw={700}>{scenario.title}</TextMantine>
                    </FlexMantine>
                    <TextInput
                        // radius="md"
                        // size="md"
                        // placeholder={`Type ${scenario.title}`}
                        label={`Type ${scenario.title}`}
                        key={form.key('title')}
                        {...form.getInputProps('title', { type: 'input' })}
                    />
                    <SpaceMantine h="xs" />
                    <FlexMantine direction="row" gap="sm">
                        <ButtonMantine radius="md" size="md" variant="filled" color="#D63426" type="submit" fullWidth style={{ color: "#FFFFFF" }}>DELETE</ButtonMantine>
                        <ButtonMantine radius="md" size="md" variant="filled" color="#f3f4f67c" fullWidth
                            onClick={() => close()}
                            style={{ color: "#1d1d1d" }}>Cancel</ButtonMantine>
                    </FlexMantine>
                </FlexMantine>
            </form>
        </>
    );
};
