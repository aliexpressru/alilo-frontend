import {useMemo} from "react";
import {
    MaterialReactTable,
    MRT_ColumnDef,
    MRT_PaginationState,
    useMaterialReactTable,
} from "material-react-table";
import {Box, Text, Title, Paper, Stack} from "@mantine/core";
import {Link} from "react-router-dom";
import {routes} from "../../../router/routes";
import {Run} from "../../../types/RunTypes";
import {NoData} from "../../shared/NoData";
import {StatusBage} from "../StatusBage/StatusBage";
import {datetimeToMKS} from "../../../utils/dates";

export interface ITableRunsStatusProps {
    data: Run[];
    title: string;
    enablePagination?: boolean;
    setPagination?: (
        updaterOrValue:
            |MRT_PaginationState
            |((prev: MRT_PaginationState) => MRT_PaginationState)
    ) => void;
    pagination?: MRT_PaginationState;
    totalCountPages?: number;
}

const TableRunsStatus = ({
                             title,
                             data,
                             enablePagination,
                             setPagination,
                             pagination,
                             totalCountPages,
                             ...rest
                         }: ITableRunsStatusProps) => {
    const columns = useMemo<MRT_ColumnDef<Run>[]>(
        () => [
            {
                accessorFn: (res) => res.title,
                Cell: ({cell, row}) => (
                    <Link to={routes.run.view.createPath(row.original.run_id)}>
                        <Text size="md">{cell.getValue<string>()}</Text>
                    </Link>
                ),
                header: "Title",
                size: 80,
            },
            {
                accessorFn: (res) => res.run_id,
                Cell: ({cell, row}) => (
                    <Link to={routes.run.view.createPath(row.original.run_id)}>
                        <Text size="md">{cell.getValue<string>()}</Text>
                    </Link>
                ),
                header: "Run ID",
                size: 10,
            },
            {
                accessorFn: (res) => res.percentage_of_target,
                Cell: ({cell, row}) => (
                    <Link to={routes.run.view.createPath(row.original.run_id)}>
                        <Text size="md">{cell.getValue<string>()}</Text>
                    </Link>
                ),
                header: "Target, %",
                size: 10,
            },
            {
                accessorFn: (res) => res.status,
                Cell: ({cell, row}) => (
                    <Link to={routes.run.view.createPath(row.original.run_id)}>
                        <StatusBage status={cell.getValue<string>()}/>
                    </Link>
                ),
                header: "Status",
                size: 150,
            },
            {
                accessorFn: (res) => res.created_at,
                Cell: ({cell, row}) => (
                    <Link to={routes.run.view.createPath(row.original.run_id)}>
                        {datetimeToMKS(cell.getValue<string>())}
                    </Link>
                ),
                header: "Created at",
                maxSize: 10,
            },
            {
                accessorFn: (res) => res.updated_at,
                Cell: ({cell, row}) => (
                    <Link to={routes.run.view.createPath(row.original.run_id)}>
                        {datetimeToMKS(cell.getValue<string>())}
                    </Link>
                ),
                header: "Updated at",
                maxSize: 10,
            },
            {
                accessorFn: (res) => res.user_name,
                Cell: ({cell, row}) => (
                    <Link to={routes.run.view.createPath(row.original.run_id)}>
                        <Text size="md">{cell.getValue<string>()}</Text>
                    </Link>
                ),
                header: "Launched by",
                maxSize: 10,
            },
        ],
        []
    );

    const table = useMaterialReactTable({
        columns,
        data,
        enableTopToolbar: false,
        enableColumnFilters: false,
        enableColumnActions: false,
        enableDensityToggle: false,
        enableHiding: false,
        enableFullScreenToggle: false,
        defaultColumn: {
            minSize: 5,
            maxSize: 1000,
        },
        enablePagination: Boolean(enablePagination),
        manualPagination: true,
        pageCount: totalCountPages ?? 1,
        rowCount: (totalCountPages ?? 1) * (pagination?.pageSize ?? 1),
        onPaginationChange: setPagination ?? (() => {
        }),
        state: pagination
            ? {pagination}
            : {pagination: {pageIndex: 0, pageSize: 10}},
        enableGlobalFilter: false,
        enableRowSelection: false,
        enableTableFooter: false,
        enableStickyFooter: false,
        paginationDisplayMode: "pages",
        // STYLING
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
        muiBottomToolbarProps: {
            sx: {
                boxShadow: "none",
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

    return (
        <Paper shadow="xs" radius="md" p="md" withBorder>
            <Stack gap="xs" {...rest}>
                <Title order={3} style={{marginLeft: 15, marginBottom: 15}}>
                    {title}
                </Title>
                <Box>
                    {data.length === 0 ? <NoData /> : <MaterialReactTable table={table} />}
                </Box>
            </Stack>
        </Paper>
    );
};

export default TableRunsStatus;
