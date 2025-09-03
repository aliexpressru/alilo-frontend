import {
    Flex as FlexMantine,
    Button as ButtonMantine,
    Space as SpaceMantine,
    Text as TextMantine
} from '@mantine/core';

import { useForm as useFormMantine } from '@mantine/form';

import { snackbarService } from '../../../services/snackbarService';
import { agentService } from '../../../services/api';
import { Agent } from '../../../types/AgentTypes';

type AgentDeleteModalProps = {
    agent: Agent;
    close: VoidFunction;
};

export const AgentDeleteModal: React.FC<AgentDeleteModalProps> = (
    { agent, close }
) => {

    const form = useFormMantine({
        initialValues: agent,
    });

    const handleSubmitForm = form.onSubmit((deletedAgent) => {
        agentService
            .deleteAgent(deletedAgent.agent_id)
            .catch((e) => {
                snackbarService.addSnack({
                    palette: 'danger',
                    title: e.message ?? 'Error delete scenario',
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
                    <FlexMantine gap="xs" direction="row">
                        <TextMantine size="md">Confirm for delete agent </TextMantine>
                        <TextMantine fw={700}>{agent.host_name}</TextMantine>
                    </FlexMantine>
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
