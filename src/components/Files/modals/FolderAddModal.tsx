import {
    Flex,
    Text,
    Button,
    Space,
    TextInput,
    Grid,
} from '@mantine/core';
import { useForm } from '@mantine/form';
import { filesService } from "../../../services/api/filesService";

type FolderAddModalProps = {
    path: string;
    bucket: string;
    callback: VoidFunction;
    close: VoidFunction;
};

export const FolderAddModal: React.FC<FolderAddModalProps> = (
    { path, bucket, callback, close }
) => {
    const folderFile: File = new File(["system"], ".fs", {
        type: "text/plain",
    });

    const form = useForm({
        mode: 'uncontrolled',
        initialValues: {
            folderName: '',

        }
    });

    const handleSubmitForm = form.onSubmit((newValues) => {
        const fileProcessedPath = path.substring(1) + newValues.folderName + '/' + folderFile.name;

        filesService
            .upload(
                newValues.folderName + "/.fs",
                fileProcessedPath,
                folderFile
            );
        // todo make as promise
        setTimeout(callback, 1000);
        close();
    });

    return (
        <>
            <form
                onSubmit={handleSubmitForm}
            >
                <Flex gap="sm" direction="column">
                    <Flex direction="column">
                        <Text size={"14px"} fw={500}>Path to create folder</Text>
                        <Text c={"gray"}>{bucket + path}</Text>
                    </Flex>
                    <TextInput
                        label="Folder name"
                        placeholder={"Type new folder name"}
                        key={form.key('folderName')}
                        {...form.getInputProps('folderName', { type: 'input' })}
                    />
                    <Space h="xs" />
                    <Grid align="flex-end">
                        <Grid.Col span={6}>
                            <Button type="submit" color={"#EE762F"}
                                    fullWidth>Create</Button>
                        </Grid.Col>
                        <Grid.Col span={6}>
                            <Button fullWidth color="gray"
                                    onClick={() => close()}
                            >Cancel</Button>
                        </Grid.Col>
                    </Grid>
                </Flex>
            </form>
        </>
    );
};
