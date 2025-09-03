import {
    Flex as FlexMantine,
    TextInput as TextInputMantine,
    Button as ButtonMantine,
    Space as SpaceMantine,
    TagsInput as TagsInputMantine
} from '@mantine/core';

import { useForm as useFormMantine } from '@mantine/form';

import { Agent } from '../../../types/AgentTypes';
import { agentService } from '../../../services/api';
import { snackbarService } from '../../../services/snackbarService';

type AgentEditModalProps = {
    agent: Agent;
    close: VoidFunction;
};

export const AgentEditModal: React.FC<AgentEditModalProps> = (
    { agent, close }
) => {

    const form = useFormMantine({
        initialValues: agent,
        validate: {
            host_name: (value) => (value.length >= 3 ? null : 'Host name must be more 3 charters'),
            port: (value) => (value.length < 65536 ? null : 'Port number must be in 0-65535 range'),
        },
    });

    const handleSubmitForm = form.onSubmit((editedAgent) => {
        agentService
            .updateAgent(editedAgent)
            .catch((e) => {
                snackbarService.addSnack({
                    palette: 'danger',
                    title: e.message ?? 'Error create scenario',
                });
            })
            .finally(() => {
                window.location.reload();
            });
        close();
    });

    return (
        <>
            <form
                onSubmit={handleSubmitForm}
            >
                <FlexMantine gap="sm" direction="column">
                    <TextInputMantine
                        radius="md"
                        size="md"
                        placeholder="Hostname"
                        key={form.key('host_name')}
                        {...form.getInputProps('host_name', { type: 'input' })}
                    />
                    <TextInputMantine
                        radius="md"
                        size="md"
                        placeholder="Port"
                        key={form.key('port')}
                        type="number"
                        {...form.getInputProps('port', { type: 'input' })}
                    />
                    <SpaceMantine h="xs" />
                    <TagsInputMantine
                        radius="md"
                        size="md"
                        placeholder="Enter tag"
                        key={form.key('tags')}
                        {...form.getInputProps('tags', { type: 'input' })}
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
