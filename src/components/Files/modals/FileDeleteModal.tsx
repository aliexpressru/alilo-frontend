import {
    Flex,
    Text,
    Button,
    Space,
    Grid,
} from '@mantine/core';
import { useForm } from '@mantine/form';
import { filesService } from "../../../services/api/filesService";

type FileDeleteModalProps = {
    pathToFile: string;
    bucket: string;
    callback: VoidFunction;
    close: VoidFunction;
};

export const FileDeleteModal: React.FC<FileDeleteModalProps> = (
    { pathToFile, bucket, callback, close }
) => {
    const form = useForm({
        mode: 'uncontrolled',
        initialValues: {
            fileName: '',

        }
    });

    const handleSubmitForm = form.onSubmit(() => {
        const fileProcessedPath = pathToFile.substring(1);
        filesService
            .deleteFile(
                bucket,
                fileProcessedPath,
            );

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
                        <Text size={"14px"} fw={500}>Path to remove file</Text>
                        <Text c={"gray"}>{bucket + pathToFile}</Text>
                    </Flex>
                    <Space h="xs" />
                    <Grid align="flex-end">
                        <Grid.Col span={6}>
                            <Button type="submit" color={"#BF3F39"}
                                fullWidth>Delete</Button>
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
