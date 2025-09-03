import { Project } from "../../../types/ProjectTypes";
import {
    PreExtendedScript,
    PreSimpleScript,
    Script,
    SimpleScript,
    UpdateScriptResponse,
    UpdateSimpleScriptResponse
} from "../../../types/ScriptTypes";
import { useCallback, useEffect, useMemo, useState } from "react";
import { MRT_ColumnDef } from "material-react-table";
import { routes } from "../../../router/routes";
import {
    extendedScriptToPreExtendedScript,
    runService,
    scenarioService,
    scriptService,
    simpleScriptToPreSimpleScript
} from "../../../services/api";
import { useModals } from "@mantine/modals";
import { ModalScriptClone } from "../modals/ModalScriptClone";
import { ScriptDeleteModal } from "../modals";
import { SimpleScriptGeneralModal } from "../modals/SimpleScriptGeneralModal";
import { Button, Container, Flex, Group, Popover, Text, Switch, rem, Tooltip } from "@mantine/core";
import { TABLE_TEXT_LENGTH } from "../../../constants";
import { TooltipText } from "../../shared/TooltipText";
import { ModalImportCurl } from "../modals/ModalImportCurl";
import { ExtendedScriptGeneralModal } from "../modals/ExtendedScriptGeneralModal";

import styles from './TableScripts.module.css';
import { StepsControlButton } from "../../shared/Buttons/StepsControlButton";
import { DurationProjectControlButton } from "../../shared/Buttons/DurationControlButton";
import { HistoryButton } from "../../shared/Buttons/HistoryButton";
import { RunButton } from "../../shared/Buttons/RunButton";
import { IconButton } from "../../shared/Buttons/IconButton";
import { Trash, Copy } from '../../../assets/svg';
import { AddButton } from "../../shared/Buttons/AddButton";
import { MaterialTable } from "../../shared/Table/MaterialTable";
import { LoadTagButton } from "../../shared/Buttons/LoadTagButton";
import { IconBrandGoogleAnalytics } from "@tabler/icons-react";
import SvgGrafana from "../../../assets/svg/sources/Grafana";

export interface ITableScenariosProps {
    projectId: Project['id'];
    scripts: Script[];
    simpleScripts: SimpleScript[];
    scenarioId: number;
    callback: VoidFunction;
}

type ScriptState = (Script | SimpleScript)[];

export const TableScripts = ({ projectId, scripts, simpleScripts, scenarioId, callback }: ITableScenariosProps) => {
    const [data, setData] = useState<ScriptState>([]);
    const [showPopoverDropdown, setShowPopoverDropdown] = useState(false);
    const [loadingScripts, setLoadingScripts] = useState<{ [key: number]: boolean }>({});
    const [totalRpsCount, setTotalRpsCount] = useState<string>('');
    const modals = useModals();
    const handleGetTotalRps = useCallback(() => {
        scenarioService.getTotalRpsCount(scenarioId).then((res) => {
            setTotalRpsCount(res.rps);
        });
    }, [scenarioId]);

    useEffect(() => {
        setData([...scripts, ...simpleScripts]);
    }, [scripts, simpleScripts]);

    useEffect(() => {
        handleGetTotalRps();
    }, [handleGetTotalRps]);

    const sortedAllScripts = (s: Script[], ss: SimpleScript[]) =>
        [...s, ...ss].sort((a, b) => a.script_id - b.script_id);

    const handleUpdateScript = async (s: Script): Promise<UpdateScriptResponse> => {
        return scriptService.updateScript(extendedScriptToPreExtendedScript(s));
    };
    const handleUpdateSimpleScript = async (ss: SimpleScript): Promise<UpdateSimpleScriptResponse> => {
        return scriptService.updateSimpleScript(ss);
    };

    const handleSwitchScript = useCallback(
        async (anyScript: Script | SimpleScript) => {
            setLoadingScripts((prevLoadingScripts) => ({
                ...prevLoadingScripts,
                [anyScript.script_id]: true,
            }));

            if ((anyScript as SimpleScript).http_method) {
                const switchedSimpleScript = anyScript as SimpleScript;
                switchedSimpleScript.enabled = !switchedSimpleScript.enabled;
                // eslint-disable-next-line max-len
                const response = await handleUpdateSimpleScript(switchedSimpleScript);
                if (!response.status) {
                    // eslint-disable-next-line max-len
                    switchedSimpleScript.enabled = !switchedSimpleScript.enabled;
                }
            } else {
                const switchedScript = anyScript as Script;
                switchedScript.enabled = !switchedScript.enabled;
                const response = await handleUpdateScript(switchedScript);
                if (!response.status) {
                    switchedScript.enabled = !switchedScript.enabled;
                }
            }
            setLoadingScripts((prevLoadingScripts) => ({
                ...prevLoadingScripts,
                [anyScript.script_id]: false,
            }));
            handleGetTotalRps();
        },
        [handleGetTotalRps]
    );

    const onScriptDeleteModalOpen = (
        anyScript: Script | SimpleScript
    ) => {
        modals.openModal({
            title: 'Script delete',
            size: 'xl',
            radius: 'md',
            children: <ScriptDeleteModal
                script={anyScript}
                close={modals.closeAll}
                callback={callback}
            />
        });
    };

    const onScriptCloneModalOpen = (anyScript: Script | SimpleScript) =>
        modals.openModal({
            title: 'Script clone',
            size: 'xl',
            radius: 'md',
            children: <ModalScriptClone
                script={anyScript}
                close={modals.closeAll}
                callback={callback}
            />
        });

    const onScriptSmokeRun = (scriptId: number) => {
        runService
            .startScriptRun(scriptId)
            .then((resp) => {
                if (resp.run) {
                    window.open(
                        routes.run.view.createPath(resp.run.run_id)
                    );
                }
            });
    };

    const onSimpleScriptSmokeRun = (scriptId: number) => {
        runService
            .startSimpleScriptRun(scriptId)
            .then((resp) => {
                if (resp.run) {
                    window.open(
                        routes.run.view.createPath(resp.run.run_id)
                    );
                }
            });
    };

    const openSimpleScriptCreateModal = () =>
        modals.openModal({
            title: 'Simple script create',
            size: '70%',
            radius: 'md',
            children: <SimpleScriptGeneralModal
                projectId={Number.parseInt(projectId, 10)}
                scenarioId={scenarioId}
                close={modals.closeAll}
                callback={callback}
            />
        });

    const openExtendedScriptCreateModal = () =>
        modals.openModal({
            title: 'Extended script create',
            size: '70%',
            radius: 'md',
            children: <ExtendedScriptGeneralModal
                projectId={Number.parseInt(projectId, 10)}
                scenarioId={Number.parseInt(scenarioId.toString(), 10)}
                close={modals.closeAll}
                callback={callback}
            />
        });

    const onImportCurlScriptModalOpen = () => {
        modals.openModal({
            title: 'Import cURL Script', // optional, or omit if ModalImportCurl has a header
            size: '70%',
            radius: 'md',
            children: (
                <ModalImportCurl
                    onClose={() => modals.closeAll()}
                    scenarioId={scenarioId.toString()}
                    projectId={projectId}
                />
            ),
            withCloseButton: false,
            centered: true,
        });
    };

    const openSimpleScriptEditModal = useCallback((preSimpleScript: PreSimpleScript) => {
        modals.openModal({
            title: 'Simple script edit',
            size: '70%',
            radius: 'md',
            children: <SimpleScriptGeneralModal
                projectId={Number.parseInt(projectId, 10)}
                scenarioId={scenarioId}
                // eslint-disable-next-line max-len
                preSimpleScript={preSimpleScript}
                close={modals.closeAll}
                callback={callback}
            />
        });

    }, [projectId, scenarioId, callback, modals]);

    const openExtendedScriptEditModal = useCallback((preExtendedScript: PreExtendedScript) => {
        modals.openModal({
            title: 'Extended script edit',
            size: '70%',
            radius: 'md',
            children: <ExtendedScriptGeneralModal
                projectId={Number.parseInt(projectId, 10)}
                scenarioId={scenarioId}
                // eslint-disable-next-line max-len
                preExtendedScript={preExtendedScript}
                close={modals.closeAll}
                callback={callback}
            />
        });
    }, [projectId, scenarioId, modals, callback]);

    const openHistoryPage = (projectId: string, scenarioId: string) => {
        window.open(
            routes.runs.viewScenario.createPath(projectId, scenarioId)
        );
    };

    const renderRowActions = (anyScript: Script | SimpleScript) => (
        <Flex className={styles['rowActionsWrapper']} gap={".4rem"}>
            <IconButton
                icon={Copy}
                iconProps={{ size: "l" }}
                onClick={() => onScriptCloneModalOpen(anyScript)}>
            </IconButton>

            <IconButton
                icon={Trash}
                iconProps={{ size: "l" }}
                onClick={() => onScriptDeleteModalOpen(anyScript)}>
            </IconButton>

            <Button
                variant="outline" color="gray" size="xs" radius="md"
                style={{ marginTop: '4px', fontWeight: '100' }}
                onClick={() =>
                    (anyScript as SimpleScript).http_method
                        ? onSimpleScriptSmokeRun(
                            (anyScript as SimpleScript).script_id
                        )
                        : onScriptSmokeRun(
                            (anyScript as Script).script_id
                        )
                }>
                Check Script
            </Button>
            {(anyScript.selectors.cmt_rps ||
                anyScript.selectors.cmt_err ||
                anyScript.selectors.cmt_rt) && <Tooltip
                    label={
                        <ul>
                            {
                                <>
                                    {anyScript.selectors.cmt_rps && <li>rps expr: {anyScript.selectors.expr_rps}</li>}
                                    {anyScript.selectors.cmt_rt && <li>rt expr: {anyScript.selectors.expr_rt}</li>}
                                    {anyScript.selectors.cmt_err && <li>err expr: {anyScript.selectors.expr_err}</li>}
                                </>
                            }
                        </ul>
                    }
                    styles={{
                        tooltip: {
                            display: 'flex',
                            padding: '10px',
                        },
                    }}
                >
                    <Text>
                        <SvgGrafana />
                    </Text>
                </Tooltip>}
        </Flex>
    );

    const handleSwitchTotalScripts = useCallback(
        (newValue: boolean) => {
            sortedAllScripts(scripts, simpleScripts).forEach((anyScript) => {
                if ((anyScript as SimpleScript).http_method) {
                    const switchedSimpleScript = anyScript as SimpleScript;
                    switchedSimpleScript.enabled = !newValue;
                    handleUpdateSimpleScript(switchedSimpleScript);
                } else {
                    const switchedScript = anyScript as Script;
                    switchedScript.enabled = !newValue;
                    handleUpdateScript(switchedScript);
                }
            });
            handleGetTotalRps();
            setTimeout(callback, 500);
        },
        [callback, scripts, simpleScripts, handleGetTotalRps]
    );

    const changeAllTags = (newTag: string) => {
        setData((prevState: (Script | SimpleScript)[]) =>
            prevState.map((sc) => ({
                ...sc,
                tag: newTag
            }))
        );
    };

    const renderTopToolbarCustomActions = () => {
        return (
            <Container className={styles['fullWidthContainer']}>
                <Flex justify="space-between">
                    <Flex gap={".6rem"}>
                        <Popover
                            width={200}
                            classNames={{ dropdown: styles['dropdown'] }}
                            opened={showPopoverDropdown}
                            onChange={setShowPopoverDropdown}
                            position="bottom"
                            withArrow
                            shadow="md">
                            <Popover.Target>
                                <Group className={styles['AddButtonWrapper']}>
                                    <AddButton
                                        onClick={() => setShowPopoverDropdown(!showPopoverDropdown)}>
                                    </AddButton>
                                </Group>
                            </Popover.Target>
                            <Popover.Dropdown className={styles['popover']}>
                                <Button
                                    className={styles['popoverButton']}
                                    onClick={() => {
                                        setShowPopoverDropdown(false);
                                        openSimpleScriptCreateModal();
                                    }}>
                                    Simple Script
                                </Button>
                                <Button
                                    className={styles['popoverButton']}
                                    onClick={() => {
                                        setShowPopoverDropdown(false);
                                        openExtendedScriptCreateModal();
                                    }}>
                                    Extended Script
                                </Button>
                                <Button
                                    className={styles['popoverButton']}
                                    onClick={() => {
                                        setShowPopoverDropdown(false);
                                        onImportCurlScriptModalOpen();
                                    }}>
                                    Import cURL
                                </Button>
                            </Popover.Dropdown>
                        </Popover>
                        <Flex style={{ alignItems: "center" }} gap={2}>
                            <IconBrandGoogleAnalytics
                                style={
                                    {
                                        // eslint-disable-next-line max-len
                                        width: rem(18),
                                        // eslint-disable-next-line max-len
                                        height: rem(18)
                                    }
                                }
                                stroke={0.8}
                            />
                            <Text size="s">{totalRpsCount} RPS</Text>
                        </Flex>
                    </Flex>
                    <Flex gap={".6rem"} className={styles['runWrapper']}>
                        <LoadTagButton currentTags={data.map((d) => d.tag)} scenarioId={scenarioId} changeAllTagsCallback={changeAllTags} />
                        <StepsControlButton scenarioId={scenarioId.toString()} callback={callback} />
                        <DurationProjectControlButton scenarioId={scenarioId.toString()} callback={callback} />
                        <HistoryButton onClick={() => openHistoryPage(projectId!, scenarioId.toString())} />
                        <RunButton scenarioId={scenarioId.toString()} />
                    </Flex>
                </Flex>
            </Container>
        );
    };

    const columns = useMemo<MRT_ColumnDef<Script | SimpleScript>[]>(
        () => [
            {
                accessorKey: 'enabled',
                header: 'switch',
                Header: () => (
                    <Switch
                        checked={data.every((anyScript) => anyScript.enabled)}
                        onChange={() => {
                            const allEnabled = data.every((anyScript) => anyScript.enabled);
                            handleSwitchTotalScripts(allEnabled);
                        }}
                        color="#D63426"
                        size="md"
                        onLabel="ALL"
                    />
                ),
                Cell: ({ row }) => (
                    <Switch
                        onChange={() => handleSwitchScript(row.original)}
                        disabled={loadingScripts[row.original.script_id]}
                        color="#D63426"
                        checked={row.original.enabled}
                    />
                ),
                maxSize: 10,
                enableSorting: false,
            },
            {
                accessorFn: (res) => res.title,
                Cell: ({ cell, row }) => (
                    (row.original as SimpleScript).http_method ? (
                        <Flex direction={"column"}>
                            <Group gap={2}>
                                <Text
                                    className={styles['scriptLinkName']}
                                    onClick={() =>
                                        openSimpleScriptEditModal(simpleScriptToPreSimpleScript(row.original as SimpleScript))
                                    }>
                                    <TooltipText text={cell.getValue<string>()} size={TABLE_TEXT_LENGTH} />
                                </Text>
                            </Group>
                            <Text onClick={() =>
                                openSimpleScriptEditModal(simpleScriptToPreSimpleScript(row.original as SimpleScript))
                            }
                                size={"xs"}>{(row.original as SimpleScript).description}</Text>
                        </Flex>
                    ) : (
                        <Flex direction={"column"}>
                            <Group gap={2}>
                                <Text
                                    className={styles['scriptLinkName']}
                                    onClick={() =>
                                        openExtendedScriptEditModal(extendedScriptToPreExtendedScript(row.original as Script))
                                    }>
                                    <TooltipText text={cell.getValue<string>()} size={TABLE_TEXT_LENGTH} />
                                </Text>
                            </Group>
                            <Text className={styles['scriptLinkName']}
                                onClick={() =>
                                    openExtendedScriptEditModal(extendedScriptToPreExtendedScript(row.original as Script))
                                } size={"xs"}>{(row.original as Script).descrip}</Text>
                        </Flex>
                    )
                ),
                header: 'Title',
                maxSize: TABLE_TEXT_LENGTH
            },
            {
                accessorFn: (anyScript) => (anyScript as SimpleScript).http_method
                    ? (anyScript as SimpleScript).rps
                    : (anyScript as Script).options.rps,
                Cell: ({ cell }) => (
                    <Text size="md">{cell.getValue<string>()}</Text>
                ),
                header: 'RPS',
                maxSize: 10
            },
            {
                accessorFn: (anyScript) => (anyScript as SimpleScript).http_method
                    ? (anyScript as SimpleScript).steps
                    : (anyScript as Script).options.steps,
                Cell: ({ cell }) => (
                    <Text size="md">{cell.getValue<string>()}</Text>
                ),
                maxSize: 10,
                header: 'Steps',
            },
            {
                accessorFn: (anyScript) => (anyScript as SimpleScript).http_method
                    ? (anyScript as SimpleScript).duration.slice(0, -1)
                    : (anyScript as Script).options.duration.slice(0, -1),
                Cell: ({ cell }) => (
                    <Text size="md">{cell.getValue<string>()}</Text>
                ),
                maxSize: 13,
                header: 'Dur., min',
            },
            {
                accessorFn: (anyScript) => (anyScript as SimpleScript).http_method
                    ? (anyScript as SimpleScript).tag
                    : (anyScript as Script).tag,
                Cell: ({ cell }) => (
                    <Text size="md">{cell.getValue<string>()}</Text>
                ),
                maxSize: 14,
                header: 'Load tag',
            },
            {
                accessorFn: (anyScript) => (anyScript as SimpleScript).http_method
                    ? 'Simple'
                    : 'Extended',
                Cell: ({ cell }) => (
                    <Group>
                        <Text size="md">{cell.getValue<string>()}</Text>
                    </Group>
                ),
                maxSize: 8,
                header: 'Type',
            },
        ], [data, openSimpleScriptEditModal,
        openExtendedScriptEditModal, handleSwitchScript,
        loadingScripts, handleSwitchTotalScripts]
    );


    return (<MaterialTable<Script | SimpleScript>
        data={data}
        columns={columns}
        renderRowActions={renderRowActions}
        renderTopToolbarCustomActions={renderTopToolbarCustomActions}
    />);
};

