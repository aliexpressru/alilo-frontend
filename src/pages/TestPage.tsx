import {
    FC,
    useCallback,
    useEffect,
    useMemo,
    useState,
} from 'react';

import { Page } from '../components/shared/Page';
import { Flex, Grid, Text } from '@mantine/core';
import { MaterialReactTable, MRT_ColumnDef, useMaterialReactTable } from 'material-react-table';
import { runService } from '../services/api';
import { Run } from '../types/RunTypes';
import { datetimeToMKS } from '../utils/dates';
import { DateTimePicker, DateValue } from '@mantine/dates';

const TestPage: FC = () => {

    const [stoppedRuns, setStoppedRuns] = useState<Run[]>([]);
    const [currentDateTime, setCurrentDateTime] = useState<DateValue>();

    const handleGetRunStopped = useCallback(() => {

        runService
            .getByStatus(
                'STATUS_STOPPED_UNSPECIFIED',
                30,
                1
            )
            .then((resp) => {
                setStoppedRuns(resp.runs);
            });

    }, []);

    useEffect(() => {
        handleGetRunStopped();

    }, [handleGetRunStopped]);

    const columns = useMemo<MRT_ColumnDef<Run>[]>(
        () => [
            {
                accessorFn: (res) => res.title,
                // row
                Cell: ({ cell }) => (
                    <Text
                        size="md" style={{ cursor: "pointer" }}>{cell.getValue<string>()}
                    </Text>),
                header: 'Title',
                size: 150,
            },
            {
                accessorFn: (res) => res.status,
                Cell: ({ row }) => (
                    <Text>
                        {row.original.status}
                    </Text>),
                header: 'Status',
            },
            {
                accessorFn: (res) => res.updated_at,
                Cell: ({ row }) => (
                    <Text>
                        {datetimeToMKS(row.original.updated_at)}
                    </Text>),
                header: 'Date',
            },
            // {
            //     accessorFn: (res) => res.errors?.percent,
            //     Cell: ({ row }) => {
            //         const errorPercent = row.original.errors?.percent ?? 0;
            //         return (
            //             <Text c={errorPercent > 0 ? "red" : ""}>
            //                 {errorPercent}
            //             </Text>);
            //     },
            //     header: 'ERRORS, %',
            // },
        ], []
    );

    const table = useMaterialReactTable({
        columns,
        data: stoppedRuns,
        // CONFIG
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
        defaultColumn: {
            minSize: 5,
            maxSize: 1000,
            size: 10,
        },
        // STYLING
        muiBottomToolbarProps: {
            sx: {
                boxShadow: "none"
            }
        },
        muiTableProps: {
            sx: {
                borderCollapse: "collapse",
            }
        },
        muiTableBodyCellProps: {
            sx: {
                borderBottom: "1px solid #f3f4f6",
            }
        },
        muiTablePaperProps: {
            elevation: 0,
            sx: {
                marginBottom: '100px',
                borderRadius: '8px',
            },
        },
        muiTableContainerProps: {
            sx: {
                padding: "15px",
            }
        },
        muiTableHeadRowProps: {
            sx: {
                backgroundColor: "#F3F4F6",
                boxShadow: "none",
            },
            classes: {}
        },
        muiTableBodyRowProps: {
            hover: false
        },
        muiTableHeadCellProps: (row) => ({
            sx: {
                border: "none",
                borderTopLeftRadius: row.column.getIsFirstColumn() ? '8px' : '',
                borderBottomLeftRadius: row.column.getIsFirstColumn() ? '8px' : '',
                borderTopRightRadius: row.column.getIsLastColumn() ? '8px' : '',
                borderBottomRightRadius: row.column.getIsLastColumn() ? '8px' : '',
            }
        }),
        // renderTopToolbarCustomActions: () => (
        //     <p>Input</p>
        // ),
        renderTopToolbarCustomActions: () => (
            <Grid justify="space-between" align="flex-start">
                <Grid.Col span={6}>
                    <Flex style={{ border: "1px solid red" }}>
                        <DateTimePicker
                            // size="70px"
                            radius="md"
                            placeholder="Start date (MSK)"
                            // w={180}
                            onChange={(d) => {
                                // setStartDateFn(d);
                                setCurrentDateTime(d);
                            }}
                            classNames={{
                                // root: classes['root'],
                                // input: classes['input'],
                                // label: classes['label'],
                            }}
                        />
                    </Flex>
                </Grid.Col>
                <Grid.Col span={6}>
                    <Flex style={{ border: "1px solid red" }}>{currentDateTime instanceof Date ? currentDateTime.toDateString() : ""}</Flex>
                </Grid.Col>
            </Grid>
        ),
    });

    return (
        <>
            <Page
                title={""}
                loading={false}
            >
                <MaterialReactTable table={table} />
            </Page>
        </>
    );
};

export { TestPage };
