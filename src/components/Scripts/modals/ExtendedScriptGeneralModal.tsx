import React, { useCallback, useEffect, useState } from "react";
import { useForm as useFormMantine } from "@mantine/form";
import {
    Button as ButtonMantine,
    Space as SpaceMantine,
    Group as GroupMantine,
    Tabs,
    Flex as FlexMantine,
    ScrollArea,
    Button,
    Popover,
    TextInput as TextInputMantine,
    Group,
} from "@mantine/core";

import {
    CreatePreExtendedScriptEmpty,
    PreExtendedScript,
} from "../../../types/ScriptTypes";
import { agentService, scriptService } from "../../../services/api";
import { Ammo, ammoService } from "../../../services/api/ammoService";
import { readFileAsBinString } from "../../../utils/readFileAsBinStr";
import { InputUpload } from "../../shared/Upload/Upload";
import { TextInput } from "../../vendor/TextInput/TextInput";
import { Select } from "../../vendor/Select/Select";
import { MODAL_CALLBACK_INTERVAL } from "../../../constants";
import { IconButton } from "../../shared/Buttons/IconButton";
import { Trash } from "../../../assets/svg";
import { groupTags } from "../../../utils/groupBy";

type ExtendedScriptGeneralModalProps = {
    projectId: number;
    scenarioId: number;
    preExtendedScript?: PreExtendedScript;
    close: VoidFunction;
    callback: VoidFunction;
};

export const ExtendedScriptGeneralModal: React.FC<
    ExtendedScriptGeneralModalProps
> = ({ projectId, scenarioId, preExtendedScript, close, callback }) => {
    const form = useFormMantine({
        initialValues:
            preExtendedScript ?? CreatePreExtendedScriptEmpty(projectId, scenarioId),
        validateInputOnChange: true,
        validate: {
            name: (value) => {
                if (!(/^[a-zA-Z0-9_]+$/).test(value)) {
                    return 'Name must only contain Latin letters, digits and underscore';
                }
                return null;
            },
        },
    });

    const [validUrl, setValidUrl] = useState("");
    const [showConfirmPopover, setShowConfirmPopover] = useState(false);

    const handleSubmitForm = form.onSubmit((newDataForm) => {
        if (preExtendedScript) {
            scriptService.updateScript(newDataForm);
        } else {
            scriptService.createScript(newDataForm);
        }
        setTimeout(callback, MODAL_CALLBACK_INTERVAL);
        close();
    });

    const handleUploadAmmo = useCallback(
        async (file: File) => {
            const binStr = await readFileAsBinString(file);

            const ammo: Ammo = {
                name: file.name,
                bucket_name: "test-data",
                description: "",
                ammo_file: binStr as string,
                project_title: String(projectId),
                scenario_title: String(scenarioId),
                content_type: "",
            };

            return ammoService.upload(ammo).then(({ ammo_file }) => {
                form.setFieldValue("ammo_id", ammo_file.s3_url);
            });
        },
        [form, projectId, scenarioId]
    );

    const handleUploadScript = useCallback(
        async (file: File) => {
            const binStr = await readFileAsBinString(file);

            const ammo: Ammo = {
                name: file.name,
                bucket_name: "test-data",
                description: "",
                ammo_file: binStr as string,
                project_title: String(projectId),
                scenario_title: String(scenarioId),
                content_type: "",
            };

            return ammoService.upload(ammo).then(({ ammo_file }) => {
                form.setFieldValue("script_file", ammo_file.s3_url);
            });
        },
        [form, projectId, scenarioId]
    );

    const [tags, setTags] = useState<string[]>([preExtendedScript?.tag ?? ""]);
    const groupedTags = groupTags(tags);

    const handleGetTags = useCallback(() => {
        agentService.getAgentAllTags().then((data) => {
            setTags(data.tags);
        });
    }, []);

    useEffect(() => {
        handleGetTags();
    }, [handleGetTags]);

    return (
        <form onSubmit={handleSubmitForm}>
            <FlexMantine direction="column" gap="xs">
                <TextInput
                    label="Title"
                    key={form.key("title")}
                    {...form.getInputProps("title", { type: "input" })}
                />
                <TextInput
                    label="Description"
                    key={form.key("descrip")}
                    {...form.getInputProps("descrip", { type: "input" })}
                />
                <SpaceMantine h="xs" />

                <Tabs defaultValue="loadParams">
                    <Tabs.List>
                        <Tabs.Tab value="loadParams">Load params</Tabs.Tab>
                        <Tabs.Tab value="body">Body</Tabs.Tab>
                        <Tabs.Tab value="script">Script</Tabs.Tab>
                        <Tabs.Tab value="additional_env">Additional env</Tabs.Tab>
                    </Tabs.List>

                    {/* LOAD PARAMS */}
                    <Tabs.Panel value="loadParams">
                        <SpaceMantine h="xs" />
                        <ScrollArea h={250} offsetScrollbars>
                            <GroupMantine>
                                <TextInput
                                    flex={1}
                                    label="RPS"
                                    key={form.key("options.rps")}
                                    {...form.getInputProps("options.rps", { type: "input" })}
                                />
                                <TextInput
                                    flex={1}
                                    label="Steps"
                                    key={form.key("options.steps")}
                                    {...form.getInputProps("options.steps", { type: "input" })}
                                />
                                <TextInput
                                    flex={1}
                                    label="Duration"
                                    key={form.key("options.duration")}
                                    {...form.getInputProps("options.duration", { type: "input" })}
                                />
                                <Select
                                    searchable
                                    label="Load tag"
                                    data={groupedTags}
                                    flex={1}
                                    key={form.key("tag")}
                                    {...form.getInputProps("tag", { type: "input" })}
                                />
                            </GroupMantine>
                        </ScrollArea>
                    </Tabs.Panel>

                    {/* BODY */}
                    <Tabs.Panel value="body">
                        <SpaceMantine h="xs" />
                        <ScrollArea h={250} offsetScrollbars>
                            <FlexMantine direction="column" gap="xs">
                                <TextInput
                                    flex={1}
                                    label="Ammo link URL"
                                    key={form.key("ammo_id")}
                                    {...form.getInputProps("ammo_id", { type: "input" })}
                                />
                                <InputUpload
                                    onChange={handleUploadAmmo}
                                    fileName={form.values.ammo_id}
                                />
                            </FlexMantine>
                        </ScrollArea>
                    </Tabs.Panel>

                    {/* SCRIPT */}
                    <Tabs.Panel value="script">
                        <SpaceMantine h="xs" />
                        <ScrollArea h={250} offsetScrollbars>
                            <FlexMantine direction="column" gap="xs">
                                <Popover
                                    withArrow
                                    trapFocus
                                    shadow="md"
                                    opened={showConfirmPopover}
                                    onChange={setShowConfirmPopover}
                                    closeOnClickOutside={false}
                                >
                                    <Popover.Target>
                                        <FlexMantine direction="column">
                                            <TextInput
                                                {...form.getInputProps("script_file", { type: "input" })}
                                                label="Script link URL"
                                            />
                                        </FlexMantine>
                                    </Popover.Target>
                                    <Popover.Dropdown bg="var(--mantine-color-body)">
                                        <Group justify="center">
                                            <Button
                                                size="compact-xs"
                                                onClick={() => {
                                                    if (validUrl.length > 0) {
                                                        form.setFieldValue("script_file", validUrl);
                                                        setValidUrl("");
                                                    }
                                                    setShowConfirmPopover(false);
                                                }}
                                            >
                                                Convert
                                            </Button>
                                            </Group>
                                    </Popover.Dropdown>
                                </Popover>

                                <InputUpload
                                    onChange={handleUploadScript}
                                    fileName={form.values.script_file}
                                />
                            </FlexMantine>
                        </ScrollArea>
                    </Tabs.Panel>

                    {/* ADDITIONAL ENV */}
                    <Tabs.Panel value="additional_env">
                        <SpaceMantine h="xs" />
                        <ScrollArea h={250} offsetScrollbars>
                            {form.values.additional_env.map((_, idx) => (
                                <GroupMantine key={idx}>
                                    <TextInputMantine
                                        variant="unstyled"
                                        style={{ borderBottom: "1px solid #D9D9D9" }}
                                        flex={1}
                                        radius="md"
                                        size="md"
                                        key={form.key(`additional_env.${idx}.key`)}
                                        {...form.getInputProps(`additional_env.${idx}.key`, {
                                            type: "input",
                                        })}
                                    />
                                    <TextInputMantine
                                        variant="unstyled"
                                        style={{ borderBottom: "1px solid #D9D9D9" }}
                                        flex={1}
                                        radius="md"
                                        size="md"
                                        {...form.getInputProps(`additional_env.${idx}.value`, {
                                            type: "input",
                                        })}
                                    />
                                    <IconButton
                                        icon={Trash}
                                        iconProps={{ size: "l" }}
                                        onClick={() =>
                                            form.removeListItem("additional_env", idx)
                                        }
                                    />
                                </GroupMantine>
                            ))}
                        </ScrollArea>
                        <ButtonMantine
                            variant="transparent"
                            onClick={() =>
                                form.insertListItem("additional_env", { key: "", value: "" })
                            }
                        >
                            + add env field
                        </ButtonMantine>
                    </Tabs.Panel>
                </Tabs>
            </FlexMantine>

            <SpaceMantine h="xs" />
            <FlexMantine direction="row" gap="sm">
                <ButtonMantine
                    radius="md"
                    size="md"
                    variant="filled"
                    color="#C2FD60"
                    type="submit"
                    fullWidth
                    style={{ color: "#1d1d1d" }}
                    disabled={showConfirmPopover}
                >
                    OK
                </ButtonMantine>
                <ButtonMantine
                    radius="md"
                    size="md"
                    variant="filled"
                    color="#f3f4f67c"
                    fullWidth
                    onClick={() => close()}
                    style={{ color: "#1d1d1d" }}
                >
                    Cancel
                </ButtonMantine>
            </FlexMantine>
        </form>
    );
};
