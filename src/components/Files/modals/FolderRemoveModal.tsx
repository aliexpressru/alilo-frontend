import {
    Flex,
    Text,
    Button,
    Space,
} from '@mantine/core';
import { useForm } from '@mantine/form';
import { filesService } from "../../../services/api/filesService";

type FolderRemoveModalProps = {
    path: string;
    callback: VoidFunction;
    close: VoidFunction;
};

export const FolderRemoveModal: React.FC<FolderRemoveModalProps> = (
    { path, callback, close }
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
                newValues.folderName,
                fileProcessedPath,
                folderFile
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
                        <Text c={"gray"}>For remove folder you must remove each file on folder</Text>
                    </Flex>
                    <Space h="xs" />
                    <Button fullWidth color="gray"
                            onClick={() => close()}
                    >Cancel</Button>
                </Flex>
            </form>
        </>
    );
};
