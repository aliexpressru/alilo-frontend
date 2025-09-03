import {
    Flex,
    Text,
    Button,
    Space,
    TextInput,
    FileButton,
    Grid,
} from '@mantine/core';
import { useForm } from '@mantine/form';
import { useState } from 'react';
import { useClipboard } from '@mantine/hooks';
import { filesService } from "../../../services/api/filesService";

type FileUploadModalProps = {
    path: string;
    bucket: string;
    callback: VoidFunction;
    close: VoidFunction;
};

export const FileUploadModal: React.FC<FileUploadModalProps> = (
    { path, bucket, callback, close }
) => {
    const clipboard = useClipboard({ timeout: 500 });
    const isFile = () => file === null;
    const [file, setFile] = useState<File | null>(null);
    const copyPathToClipboard = () => {
        clipboard.copy(`/${bucket}${path}${file?.name}`);
    };

    const form = useForm({
        mode: 'uncontrolled',
        initialValues: {
            fileName: '',
        }
    });

    const handleSubmitForm = form.onSubmit((newValues) => {
        const fileName = newValues.fileName === "" ? file?.name : newValues.fileName;
        const fileProcessedPath = path.substring(1) + fileName;

        if (file && fileName) {
            filesService
                .upload(
                    fileName,
                    fileProcessedPath,
                    file
                );
        }
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
                        <Text size={"14px"} fw={500}>Path to upload</Text>
                        <Text c={"gray"}>{bucket + path}</Text>
                    </Flex>
                    <Grid align="flex-end">
                        <Grid.Col span={8}>
                            <TextInput
                                label="File name"
                                placeholder={file?.name ?? "Select file to change name"}
                                disabled={isFile()}
                                key={form.key('fileName')}
                                {...form.getInputProps('fileName', { type: 'input' })}
                            />
                        </Grid.Col>
                        <Grid.Col span={4}>
                            <FileButton
                                onChange={setFile}
                                accept="*/*"
                            >
                                {(props) => <Button {...props} fullWidth>Select a file</Button>}
                            </FileButton>
                        </Grid.Col>
                    </Grid>
                    <Space h="xs" />
                    <Grid align="flex-end">
                        <Grid.Col span={3}>
                            <Button type="submit" color={"#EE762F"} disabled={isFile()} fullWidth>Upload</Button>
                        </Grid.Col>
                        <Grid.Col span={3}>
                            <Button type="submit" color={"#EE762F"} variant="light" disabled={isFile()} onClick={() => copyPathToClipboard()} fullWidth>Upload & Copy</Button>
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
