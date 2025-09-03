import React, { useCallback, useEffect, useMemo, useState } from "react";
import { MaterialReactTable, MRT_ColumnDef, useMaterialReactTable, } from "material-react-table";
import { Divider, Flex, Group, Paper, rem, Stack, Text, Title, } from "@mantine/core";
import { ScriptRun, ScriptRunType } from "../../../types/RunTypes";
import { RunScriptsGeneralModal } from "../modals/RunScriptsGeneralModal";
import { modals } from "@mantine/modals";
import { GroupedScriptRun, groupScriptRunsByType, } from "../../../utils/groupObjByName";
import { sum } from "lodash";
import { average } from "../../../utils/math";
import { StatusBageLight } from "../StatusBage/StatusBageLight";
import { datetimeToMKS } from "../../../utils/dates";
import { IconBrandGoogleAnalytics } from "@tabler/icons-react";
import { Time } from "../../../assets/svg";
import { LoadAdjustmentButton } from "../../vendor/LoadAdjustmentButton/LoadAdjustmentButton";
import { StopButton } from "../../shared/Buttons/StopButton";
import { runService } from "../../../services/api";
import { RUN_PAGE_INTERVAL } from "../../../constants";
import styles from "./TableRun.module.css";

export interface ITableScriptRunProps {
    scriptRuns: ScriptRun[];
    runStatus?: string;
    startTime: string;
    testDuration?: string;
    loadLevel: number;
    launchedBy: string;
    runId: number;
}

const TableRun = ({
    scriptRuns,
    runId,
    runStatus,
    testDuration,
    launchedBy,
    loadLevel,
    startTime,
}: ITableScriptRunProps) => {
    // Используем React для удовлетворения noUnusedLocals
    console.log('React version:', React.version);
    const [data, setData] = useState<GroupedScriptRun[]>([]);
    const [totalRunRPS, setTotalRunRPS] = useState<string>("");

    useEffect(() => {
        if (scriptRuns) {
            setData(groupScriptRunsByType(scriptRuns));
        }
    }, [scriptRuns]);

    const textFailedRate = (group: GroupedScriptRun) => {
        const sumResult = sum(
            group.scripts
                .filter((sr) => sr.status === "STATUS_RUNNING")
                .map((sr) => Math.ceil(Number.parseFloat(sr.metrics.failed)))
        );

        if (sumResult > 0) {
            return <Text c="red">{sumResult}</Text>;
        }

        return (
            <Flex align="center" gap="xs">
                <Text>{group.scripts.length}</Text>
                <Text c="dimmed">/</Text>
                <Text>{sumResult}</Text>
            </Flex>
        );
    };

    const handleFetchTotalRunRPS = useCallback(() => {
        runService.getTotalRunRPS(runId).then((r) => setTotalRunRPS(r.rps));
    }, [runId]);

    useEffect(() => {
        handleFetchTotalRunRPS();
        const interval = setInterval(handleFetchTotalRunRPS, RUN_PAGE_INTERVAL);
        return () => clearInterval(interval);
    }, [handleFetchTotalRunRPS]);

    const openCreateRunScriptsModal = (runId: number, scriptName: string) =>
        modals.open({
            size: "1200",
            withCloseButton: false,
            radius: "md",
            padding: "0",
            children: (
                <RunScriptsGeneralModal
                    runId={runId}
                    scriptName={scriptName}
                    close={modals.closeAll}
                />
            ),
        });

    const columns = useMemo<MRT_ColumnDef<GroupedScriptRun>[]>(
        () => [
            {
                accessorFn: (res) => res.name,
                Cell: ({ cell, row }) => (
                    <Text
                        onClick={() => {
                            openCreateRunScriptsModal(runId, row.original.name);
                        }}
                        size="md"
                        style={{ cursor: "pointer" }}
                    >
                        {cell.getValue<string>()}
                    </Text>
                ),
                header: "Title",
                size: 150,
            },
            {
                accessorFn: (res) => res.name,
                Cell: ({ row }) => (
                    <Text
                        onClick={() => {
                            openCreateRunScriptsModal(runId, row.original.name);
                        }}
                    >
                        {sum(
                            row.original.scripts
                                .filter((sr) => sr.status === "STATUS_RUNNING")
                                .map((sr) => Math.ceil(Number.parseFloat(sr.metrics.rps)))
                        )}
                    </Text>
                ),
                header: "RPS",
            },
            {
                accessorFn: (res) => res.name,
                Cell: ({ row }) => (
                    <Text
                        onClick={() => {
                            openCreateRunScriptsModal(runId, row.original.name);
                        }}
                    >
                        {textFailedRate(row.original)}
                    </Text>
                ),
                header: "Total/Failed",
            },
            {
                accessorFn: (res) => res.name,
                Cell: ({ row }) => (
                    <Text
                        onClick={() => {
                            openCreateRunScriptsModal(runId, row.original.name);
                        }}
                    >
                        {average(
                            row.original.scripts
                                .filter((sr) => sr.status === "STATUS_RUNNING")
                                .map((sr) => Number.parseInt(sr.metrics.rt95p, 10))
                        )}
                    </Text>
                ),
                header: "Response Time, ms",
            },
            {
                accessorFn: (res) => res.name,
                Cell: ({ row }) => (
                    <Text
                        onClick={() => {
                            openCreateRunScriptsModal(runId, row.original.name);
                        }}
                    >
                        {row.original.scripts
                            .filter((sr) => {
                                if (sr.type_script_run === ScriptRunType.TYPE_SCRIPT_RUN_SIMPLE) {
                                    return sr.simple_script !== null;
                                } else {
                                    return sr.script !== null && sr.script.options !== null;
                                }
                            })
                            .map((sr) =>
                                sr.type_script_run === ScriptRunType.TYPE_SCRIPT_RUN_SIMPLE
                                    ? sr.simple_script?.duration
                                    : sr.script?.options.duration
                            )
                            .map((s) => {
                                if (!s) return 0;
                                const durationValue = s.slice(0, -1);
                                return Number.parseInt(durationValue, 10) || 0;
                            })
                            .reduce((prev, curr) => (prev >= curr ? prev : curr))}
                    </Text>
                ),
                header: "Duration, min",
            },
            {
                accessorFn: (res) => res.name,
                Cell: ({ row }) => (
                    <Text
                        onClick={() => {
                            openCreateRunScriptsModal(runId, row.original.name);
                        }}
                    >
                        {row.original.scripts.filter((t) => t.status === "STATUS_RUNNING").length}
                    </Text>
                ),
                header: "Threads count",
            },
        ],
        [runId]
    );

    const table = useMaterialReactTable({
        columns,
        data,
        enableColumnFilters: false,
        enableColumnActions: false,
        enableDensityToggle: false,
        enableHiding: false,
        enableFullScreenToggle: false,
        enablePagination: false,
        enableGlobalFilter: false,
        enableRowSelection: false,
        enableTableFooter: false,
        enableStickyFooter: false,
        enableTopToolbar: true,
        renderTopToolbarCustomActions: () => (
            <Paper className={styles["panelWrapper"]} radius="md" shadow="xs" p="sm">
                <Stack gap="sm" w="100%">
                    <Flex justify="space-between" wrap="wrap" gap="xl">
                        <Stack gap="xs" align="flex-start" w="100%">
                            <StatusBageLight status={runStatus} />
                            <Group align="end" gap="md">
                                <Title order={3}>Test control</Title>
                                <Text size="sm">Start time {datetimeToMKS(startTime)}</Text>
                                <Text size="sm">
                                    Launched by <Text span fw={700}>{launchedBy}</Text>
                                </Text>
                            </Group>
                        </Stack>
                        <Group justify="flex-end" gap="md">
                            <LoadAdjustmentButton runId={runId} initLoadLevel={loadLevel} />
                            <StopButton groupId={runId} runStatus={runStatus} />
                        </Group>
                    </Flex>

                    <Divider size="xs" />

                    <Flex justify="space-between" align="center" wrap="wrap" gap="xl">
                        <Group gap="xl">
                            <Group gap="xs">
                                <Time width={16} height={16} />
                                <Text size="sm">{testDuration} min</Text>
                            </Group>
                            <Group gap="xs">
                                <IconBrandGoogleAnalytics
                                    style={{ width: rem(18), height: rem(18) }}
                                    stroke={0.8}
                                />
                                <Text size="sm">{totalRunRPS} RPS</Text>
                            </Group>
                        </Group>

                        <Group gap="sm">
                            <Text size="sm">All({scriptRuns?.length ?? 0})</Text>
                            <Text size="sm">
                                Running({
                                    scriptRuns?.filter((sr) => sr.status === "STATUS_RUNNING").length ?? 0
                                })
                            </Text>
                            <Text size="sm">
                                Stopped({
                                    scriptRuns?.filter((sr) => sr.status === "STATUS_STOPPED_UNSPECIFIED").length ?? 0
                                })
                            </Text>
                            <Text size="sm">
                                Stopping({
                                    scriptRuns?.filter((sr) => sr.status === "STATUS_STOPPING").length ?? 0
                                })
                            </Text>
                            <Text size="sm">
                                Failed({
                                    scriptRuns?.filter((sr) => sr.status === "STATUS_FAILED").length ?? 0
                                })
                            </Text>
                        </Group>
                    </Flex>
                </Stack>
            </Paper>
        ),
        defaultColumn: {
            minSize: 5,
            maxSize: 1000,
            size: 10,
        },
        muiBottomToolbarProps: {
            sx: {
                boxShadow: "none",
            },
        },
        muiTableProps: {
            sx: {
                borderCollapse: "collapse",
            },
        },
        muiTableBodyCellProps: {
            sx: {
                borderBottom: "1px solid #f3f4f6",
            },
        },
        muiTablePaperProps: {
            elevation: 0,
            sx: {
                marginBottom: "100px",
                borderRadius: "8px",
            },
        },
        muiTableContainerProps: {
            sx: {
                padding: "15px",
            },
        },
        muiTableHeadRowProps: {
            sx: {
                backgroundColor: "#F3F4F6",
                boxShadow: "none",
            },
        },
        muiTableBodyRowProps: {
            hover: false,
        },
        muiTableHeadCellProps: (row) => ({
            sx: {
                border: "none",
                borderTopLeftRadius: row.column.getIsFirstColumn() ? "8px" : "",
                borderBottomLeftRadius: row.column.getIsFirstColumn() ? "8px" : "",
                borderTopRightRadius: row.column.getIsLastColumn() ? "8px" : "",
                borderBottomRightRadius: row.column.getIsLastColumn() ? "8px" : "",
            },
        }),
    });

    return <MaterialReactTable table={table} />;
};

export default TableRun;
