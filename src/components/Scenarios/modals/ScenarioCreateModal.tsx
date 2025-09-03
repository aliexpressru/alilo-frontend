import {
    Flex as FlexMantine,
    // TextInput as TextInputMantine,
    Button as ButtonMantine,
    Space as SpaceMantine,
} from '@mantine/core';

import { useForm as useFormMantine } from '@mantine/form';

import { snackbarService } from '../../../services/snackbarService';
import { ScenarioEmpty } from '../../../types/ScenarioTypes';
import { scenarioService } from '../../../services/api';
import { TextInput } from '../../vendor/TextInput/TextInput';
import { MODAL_CALLBACK_INTERVAL } from '../../../constants';

type ScenarioCreateModalProps = {
    projectId: string;
    close: VoidFunction;
    callback: VoidFunction;
};

export const ScenarioCreateModal: React.FC<ScenarioCreateModalProps> = (
    { projectId, close, callback }
) => {

    const form = useFormMantine({
        initialValues: ScenarioEmpty(projectId),
        validate: {
            title: (value) => (value.length >= 3 ? null : 'Scenario title must be more 3 charters'),
        },
    });

    const handleSubmitForm = form.onSubmit((newScenario) => {
        scenarioService
            .createScenario(
                newScenario.project_id,
                newScenario.title,
                newScenario.descrip
            )
            .catch((e) => {
                snackbarService.addSnack({
                    palette: 'danger',
                    title: e.message ?? 'Error create scenario',
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
                        // radius="md"
                        // size="md"
                        // placeholder="Title"
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
                        <ButtonMantine radius="md" size="md" variant="filled" color="#C2FD60" type="submit" fullWidth style={{ color: "#1d1d1d" }}>CREATE</ButtonMantine>
                        <ButtonMantine radius="md" size="md" variant="filled" color="#f3f4f67c" fullWidth
                            onClick={() => close()}
                            style={{ color: "#1d1d1d" }}>Cancel</ButtonMantine>
                    </FlexMantine>
                </FlexMantine>
            </form>
        </>
    );
};
