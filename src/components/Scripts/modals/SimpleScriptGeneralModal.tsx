import React, { useCallback, useEffect, useState } from 'react';

import { useForm as useFormMantine } from '@mantine/form';

import {
    Button as ButtonMantine,
    Flex as FlexMantine,
    Group as GroupMantine,
    JsonInput as JsonInputMantine,
    Radio,
    ScrollArea,
    Space as SpaceMantine,
    Tabs,
    TextInput as TextInputMantine,
} from '@mantine/core';
import { CreatePreSimpleScriptEmpty, PreSimpleScript } from '../../../types/ScriptTypes';

import { agentService, scriptService } from '../../../services/api';
import { Ammo, ammoService } from '../../../services/api/ammoService';
import { readFileAsBinString } from '../../../utils/readFileAsBinStr';
import { IconButton } from '../../shared/Buttons/IconButton';
import { Trash } from '../../../assets/svg';
import { InputUpload } from '../../shared/Upload/Upload';
import { TextInput } from '../../vendor/TextInput/TextInput';
import { Select } from '../../vendor/Select/Select';
import { MODAL_CALLBACK_INTERVAL, STATIC_AMMO_TOTAL_CHARS_AVAILABLE } from '../../../constants';
import { groupTags } from "../../../utils/groupBy";

type SimpleScriptGeneralModalProps = {
    projectId: number;
    scenarioId: number;
    preSimpleScript?: PreSimpleScript;
    close: VoidFunction;
    callback: VoidFunction;
};

// eslint-disable-next-line max-len
export const SimpleScriptGeneralModal: React.FC<SimpleScriptGeneralModalProps> = (
    { projectId, scenarioId, preSimpleScript, close, callback }
) => {
    const form = useFormMantine({
        // eslint-disable-next-line max-len
        initialValues: preSimpleScript ?? CreatePreSimpleScriptEmpty(projectId, scenarioId),
        onValuesChange: () => {
            setIsBodyTabEnabled(form.getValues().http_method === "get");
        },
        validateInputOnChange: true,
        validate: {
            name: (value) => {
                if (!(/^[a-zA-Z0-9_]+$/).test(value)) {
                    return 'Name must only contain Latin letters, digits and underscore';
                }
                return null;
            },
            static_ammo: (value) => {
                if (value && value.length > STATIC_AMMO_TOTAL_CHARS_AVAILABLE) {
                    // eslint-disable-next-line max-len
                    return `Maximum ${STATIC_AMMO_TOTAL_CHARS_AVAILABLE} characters allowed (current: ${value.length})`;
                }
                return null;
            }
        },
    });

    // eslint-disable-next-line max-len
    const [isStaticAmmo, setIsStaticAmmo] = useState<boolean>(form.getValues().is_static_ammo);
    const [isBodyTabEnabled, setIsBodyTabEnabled] = useState<boolean>(form.getValues().http_method === "get");
    const handleSubmitForm = form.onSubmit((newDataForm) => {
        if (preSimpleScript) {
            scriptService
                .updateSimpleScript2(newDataForm);
        } else {
            scriptService
                .createSimpleScript2(newDataForm);
        }
        setTimeout(callback, MODAL_CALLBACK_INTERVAL);
        close();
    });

    const handleUploadFile = useCallback(async (file: File) => {
        const binStr = await readFileAsBinString(file);

        const ammo: Ammo = {
            name: file.name,
            bucket_name: 'ammo',
            description: '',
            ammo_file: binStr as string,
            project_title: String(projectId),
            scenario_title: String(scenarioId),
            content_type: '',
        };

        return ammoService
            .upload(ammo)
            .then(({ ammo_file }) => {
                form.setFieldValue('ammo_url', ammo_file.s3_url);
            });
    },

        [form, projectId, scenarioId]);

    const [tags, setTags] = useState<string[]>([preSimpleScript?.tag ?? ""]);

    const handleGetTags = useCallback(() => {
        agentService
            .getAgentAllTags()
            .then((data) => {
                setTags(data.tags);
            });
    }, []);

    useEffect(() => {
        handleGetTags();
    }, [handleGetTags]);

    const groupedTags = groupTags(tags);

    return (<form
        onSubmit={handleSubmitForm}
    >
        <FlexMantine direction={"column"} gap={"xs"}>
            <TextInput
                label="Title"
                key={form.key(`title`)}
                {...form.getInputProps(`title`, { type: 'input' })}
            />
            <TextInput
                label="Description"
                key={form.key(`description`)}
                {...form.getInputProps(`description`, { type: 'input' })}
            />
            <GroupMantine>
                <Select
                    label="Method"
                    data={['post', 'get']}
                    flex={1}
                    key={form.key(`http_method`)}
                    {...form.getInputProps(`http_method`, { type: 'input' })}
                />
                <TextInput
                    flex={8}
                    // radius="md"
                    // size="md"
                    label="URL path"
                    key={form.key(`path`)}
                    {...form.getInputProps(`path`, { type: 'input' })}
                />
            </GroupMantine>

            <SpaceMantine h="xs" />
            <Tabs defaultValue="loadParams">
                <Tabs.List>
                    <Tabs.Tab value="loadParams">
                        Load params
                    </Tabs.Tab>
                    <Tabs.Tab value="queryParams">
                        Query params
                    </Tabs.Tab>
                    <Tabs.Tab value="headers">
                        Headers
                    </Tabs.Tab>
                    <Tabs.Tab value="body" disabled={isBodyTabEnabled}>
                        Body
                    </Tabs.Tab>
                    <Tabs.Tab value="additional_env">
                        Additional env
                    </Tabs.Tab>
                </Tabs.List>

                {/* LOAD PARAMS TAB */}

                <Tabs.Panel value="loadParams">
                    <SpaceMantine h="xs" />
                    <ScrollArea h={250} offsetScrollbars>
                        <GroupMantine>
                            <TextInput
                                flex={1}
                                label="RPS"
                                key={form.key(`rps`)}
                                {...form.getInputProps(`rps`, { type: 'input' })}
                            />
                            <TextInput
                                flex={1}
                                label="Steps"
                                key={form.key(`steps`)}
                                {...form.getInputProps(`steps`, { type: 'input' })}
                            />
                            <TextInput
                                flex={1}
                                label="Duration"
                                key={form.key(`duration`)}
                                {...form.getInputProps(`duration`, { type: 'input' })}
                            />
                            <TextInput
                                flex={1}
                                label="Max VUs"
                                key={form.key(`max_v_us`)}
                                {...form.getInputProps(`max_v_us`, { type: 'input' })}
                            />
                            <Select
                                searchable
                                label="Load tag"
                                data={groupedTags}
                                flex={1}
                                key={form.key(`tag`)}
                                {...form.getInputProps(`tag`, { type: 'input' })}
                            />
                        </GroupMantine>
                    </ScrollArea>
                </Tabs.Panel>

                {/* QUERY PARAMS TAB */}

                <Tabs.Panel value="queryParams">
                    <SpaceMantine h="xs" />
                    <ScrollArea h={250} offsetScrollbars>
                        {form.getValues().query_params.map((_, idx) => <GroupMantine key={idx}>
                            <TextInputMantine
                                variant="unstyled"
                                style={{
                                    borderBottom: "1px solid #D9D9D9",
                                    borderBottomLeftRadius: 0,
                                    borderBottomRightRadius: 0
                                }}
                                flex={1}
                                radius="md"
                                size="md"
                                // eslint-disable-next-line max-len
                                key={form.key(`query_params.${idx}.key`)}
                                {...form.getInputProps(`query_params.${idx}.key`, { type: 'input' })}
                            />
                            <TextInputMantine
                                variant="unstyled"
                                style={{
                                    borderBottom: "1px solid #D9D9D9",
                                    borderBottomLeftRadius: 0,
                                    borderBottomRightRadius: 0
                                }}
                                flex={1}
                                radius="md"
                                size="md"
                                // eslint-disable-next-line max-len
                                key={form.key(`query_params.${idx}.value`)}
                                {...form.getInputProps(`query_params.${idx}.value`, { type: 'input' })}
                            />
                            <IconButton
                                icon={Trash}
                                iconProps={{ size: "l" }}
                                onClick={() => form.removeListItem('query_params', (idx))}
                            />
                        </GroupMantine>)}
                    </ScrollArea>
                    <ButtonMantine variant="transparent"
                        onClick={() => form.insertListItem('query_params', { key: '', value: '' })}>+ add
                        param</ButtonMantine>
                </Tabs.Panel>

                {/* HEADERS TAB */}

                <Tabs.Panel value="headers">
                    <SpaceMantine h="xs" />
                    <ScrollArea h={250} offsetScrollbars>
                        {// eslint-disable-next-line max-len
                            form.getValues().headers.map((_, idx) => <GroupMantine key={idx}>
                                <TextInputMantine
                                    variant="unstyled"
                                    style={{
                                        borderBottom: "1px solid #D9D9D9",
                                        borderBottomLeftRadius: 0,
                                        borderBottomRightRadius: 0
                                    }}
                                    flex={1}
                                    radius="md"
                                    size="md"
                                    // eslint-disable-next-line max-len
                                    // key={form.key(`headers.${idx}.key`)}
                                    {...form.getInputProps(`headers.${idx}.key`, { type: 'input' })}
                                />
                                <TextInputMantine
                                    variant="unstyled"
                                    style={{
                                        borderBottom: "1px solid #D9D9D9",
                                        borderBottomLeftRadius: 0,
                                        borderBottomRightRadius: 0
                                    }}
                                    flex={1}
                                    radius="md"
                                    size="md"
                                    // eslint-disable-next-line max-len
                                    // key={form.key(`headers.${idx}.value`)}
                                    {...form.getInputProps(`headers.${idx}.value`, { type: 'input' })}
                                />
                                <IconButton
                                    icon={Trash}
                                    iconProps={{ size: "l" }}
                                    onClick={() => form.removeListItem('headers', (idx))}
                                />
                            </GroupMantine>)}
                    </ScrollArea>
                    <ButtonMantine variant="transparent"
                        onClick={() => form.insertListItem('headers', { key: '', value: '' })}>
                        + add header
                    </ButtonMantine>
                </Tabs.Panel>

                {/* BODY TAB */}

                <Tabs.Panel value="body">
                    <SpaceMantine h="xs" />
                    <FlexMantine direction={"column"} gap={"xs"}>
                        <SpaceMantine h="xs" />
                        <GroupMantine>
                            <Radio
                                color="#D63426"
                                size="md"
                                checked={isStaticAmmo}
                                onChange={() => {
                                    setIsStaticAmmo(true);
                                    form.setFieldValue('is_static_ammo', true);
                                }} label="JSON"
                            />
                            <Radio
                                color="#D63426"
                                size="md"
                                checked={!isStaticAmmo}
                                onChange={() => {
                                    setIsStaticAmmo(false);
                                    form.setFieldValue('is_static_ammo', false);
                                }} label="File Content"
                            />
                        </GroupMantine>
                        <SpaceMantine h="xs" />
                        {isStaticAmmo ? (<JsonInputMantine
                            size="md"
                            radius="md"
                            rows={5}
                            label="JSON ammo"
                            placeholder="Input ammo JSON here"
                            key={form.key(`static_ammo`)}
                            {...form.getInputProps(`static_ammo`, { type: 'input' })}
                        />) : (<FlexMantine direction={"column"} gap={"xs"}>
                            <TextInputMantine
                                flex={1}
                                radius="md"
                                size="md"
                                label="Ammo URL"
                                // eslint-disable-next-line max-len
                                key={form.key(`ammo_url`)}
                                {...form.getInputProps(`ammo_url`, { type: 'input' })}
                            />
                            <InputUpload
                                onChange={handleUploadFile}
                                fileName={form.getInputProps(`ammo_url`, { type: 'input' }).value}
                            />
                        </FlexMantine>)}
                    </FlexMantine>
                </Tabs.Panel>

                {/* ADDITIONAL ENV TAB */}
                <Tabs.Panel value="additional_env">
                    <SpaceMantine h="xs" />
                    <ScrollArea h={250} offsetScrollbars>
                        {// eslint-disable-next-line max-len
                            form.getValues().additional_env.map((_, idx) => <GroupMantine key={idx}>
                                <TextInputMantine
                                    variant="unstyled"
                                    style={{
                                        borderBottom: "1px solid #D9D9D9",
                                        borderBottomLeftRadius: 0,
                                        borderBottomRightRadius: 0
                                    }}
                                    flex={1}
                                    radius="md"
                                    size="md"
                                    // eslint-disable-next-line max-len
                                    key={form.key(`additional_env.${idx}.key`)}
                                    {...form.getInputProps(`additional_env.${idx}.key`, { type: 'input' })}
                                />
                                <TextInputMantine
                                    variant="unstyled"
                                    style={{
                                        borderBottom: "1px solid #D9D9D9",
                                        borderBottomLeftRadius: 0,
                                        borderBottomRightRadius: 0
                                    }}
                                    flex={1}
                                    radius="md"
                                    size="md"
                                    // eslint-disable-next-line max-len
                                    // key={form.key(`headers.${idx}.value`)}
                                    {...form.getInputProps(`additional_env.${idx}.value`, { type: 'input' })}
                                />
                                <IconButton
                                    icon={Trash}
                                    iconProps={{ size: "l" }}
                                    onClick={() => form.removeListItem('additional_env', (idx))}
                                />
                            </GroupMantine>)}
                    </ScrollArea>
                    <ButtonMantine variant="transparent"
                        onClick={() => form.insertListItem('additional_env', { key: '', value: '' })}>
                        + add env field
                    </ButtonMantine>
                </Tabs.Panel>
            </Tabs>

        </FlexMantine>
        <SpaceMantine h="xs" />
        <FlexMantine direction="row" gap="sm">
            <ButtonMantine radius="md" size="md" variant="filled" color="#C2FD60" type="submit" fullWidth
                style={{ color: "#1d1d1d" }}>OK</ButtonMantine>
            <ButtonMantine radius="md" size="md" variant="filled" color="#f3f4f67c" fullWidth
                onClick={() => close()}
                style={{ color: "#1d1d1d" }}>Cancel</ButtonMantine>
        </FlexMantine>
    </form>);
};
