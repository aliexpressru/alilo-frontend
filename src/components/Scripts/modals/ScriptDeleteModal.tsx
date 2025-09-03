import {Script, SimpleScript} from '../../../types/ScriptTypes';

import {MODAL_CALLBACK_INTERVAL} from '../../../constants';
import {TextInput} from "../../vendor/TextInput/TextInput";
import {Space, Button, Text, Flex} from "@mantine/core";
import {useForm} from "@mantine/form";
import {scriptService} from "../../../services/api";

type ScriptDeleteModalProps = {
    script: Script | SimpleScript;
    close: VoidFunction;
    callback: VoidFunction;
};

export const ScriptDeleteModal: React.FC<ScriptDeleteModalProps> = (
    {script, close, callback}
) => {
    const form = useForm({
        initialValues: {
            script_id: script.script_id,
            scenario_id: script.scenario_id,
            name: '',
        },
        validate: {
            name: (value) => (value === script.name ? null : 'Your text does not match with script name!'),
        },
    });
    const handleSubmitForm = form.onSubmit(async (anyScript) => {
        if ((script as SimpleScript).http_method) {
            await scriptService.deleteSimpleScript(anyScript.script_id);
        } else {
            await scriptService.deleteScript(anyScript.script_id);
        }
        setTimeout(callback, MODAL_CALLBACK_INTERVAL);
        close();
    });

    return (
        <>
            <form
                onSubmit={handleSubmitForm}
            >
                <Flex gap="sm" direction="column">
                    <Flex gap="xs" direction="row">
                        <Text size="md">Confirm for delete script</Text>
                        <Text fw={700}>
                            {script.name}
                        </Text>
                    </Flex>
                    <TextInput
                        label={`Type ${script.name}`}
                        key={form.key('name')}
                        {...form.getInputProps('name', {type: 'input'})}
                    />
                    <Space h="xs"/>
                    <Flex direction="row" gap="sm">
                        <Button radius="md" size="md" variant="filled" color="#D63426" type="submit" fullWidth
                                style={{color: "#FFFFFF"}}>DELETE</Button>
                        <Button radius="md" size="md" variant="filled" color="#f3f4f67c" fullWidth
                                onClick={() => close()}
                                style={{color: "#1d1d1d"}}>Cancel</Button>
                    </Flex>
                </Flex>
            </form>
        </>
    );
};
