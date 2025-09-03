import {
    Flex as FlexMantine,
    // TextInput as TextInputMantine,
    Button as ButtonMantine,
    Space as SpaceMantine,
    Text as TextMantine
} from '@mantine/core';

import { useForm as useFormMantine } from '@mantine/form';

import { snackbarService } from '../../../services/snackbarService';
import { Project } from '../../../types/ProjectTypes';
import { projectService } from '../../../services/api';
import { TextInput } from '../../vendor/TextInput/TextInput';
import { MODAL_CALLBACK_INTERVAL } from '../../../constants';

type ProjectDeleteModalProps = {
    project: Project;
    close: VoidFunction;
    callback: VoidFunction;
};

export const ProjectDeleteModal: React.FC<ProjectDeleteModalProps> = (
    { project, close, callback }
) => {

    const form = useFormMantine({
        initialValues: {
            id: project.id,
            title: '',
            descrip: project.descrip,
        },
        validate: {
            title: (value) => (value === project.title ? null : 'Title of project must be equal project title'),
        },
    });

    const handleSubmitForm = form.onSubmit((deletedProject) => {
        // callback();
        projectService
            .deleteProject(deletedProject.id)
            .catch((e) => {
                snackbarService.addSnack({
                    palette: 'danger',
                    title: e.message ?? 'Error delete project',
                });
            })
            .finally(() => {
                window.location.reload();
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
                        <TextMantine size="md">Confirm for delete project </TextMantine>
                        <TextMantine fw={700}>{project.title}</TextMantine>
                    </FlexMantine>
                    {/* <TextInputMantine
                        radius="md"
                        size="md"
                        placeholder={`Type ${project.title}`}
                        key={form.key('title')}
                        {...form.getInputProps('title', { type: 'input' })}
                    /> */}
                    <TextInput
                        label={`Type ${project.title}`}
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
