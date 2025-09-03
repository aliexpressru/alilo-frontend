import {
    Flex as FlexMantine,
    // TextInput as TextInputMantine,
    Button as ButtonMantine,
    Space as SpaceMantine,
} from '@mantine/core';

import { useForm as useFormMantine } from '@mantine/form';

import { projectService } from '../../../services/api';
import { ProjectEmpty } from '../../../types/ProjectTypes';
import { snackbarService } from '../../../services/snackbarService';
import { TextInput } from '../../vendor/TextInput/TextInput';
import { MODAL_CALLBACK_INTERVAL } from '../../../constants';

type ProjectCreateModalProps = {
    close: VoidFunction;
    callback: VoidFunction;
};

export const ProjectCreateModal: React.FC<ProjectCreateModalProps> = (
    { close, callback }
) => {

    const form = useFormMantine({
        initialValues: ProjectEmpty,
        validate: {
            title: (value) => (value.length >= 3 ? null : 'Project title must be more 3 charters'),
        },
    });

    const handleSubmitForm = form.onSubmit((newProject) => {
        projectService
            .createProject(newProject.title, newProject.descrip)
            .catch((e) => {
                snackbarService.addSnack({
                    palette: 'danger',
                    title: e.message ?? 'Error create project',
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
