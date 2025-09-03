import {
    MaterialReactTable,
    MaterialReactTableProps,
    MRT_ColumnDef, MRT_PaginationState,
    MRT_RowData,
    MRT_TableInstance,
    useMaterialReactTable
} from "material-react-table";
import { Box } from "@mui/material";
import { ReactNode, useEffect, useMemo, useState } from "react";
import { getQueryParams, updateQueryParams } from "../../../utils/queryParams";

// TODO: Переделать через Omit
type MaterialTableProps<T extends MRT_RowData> = Pick<MaterialReactTableProps<T>, "renderDetailPanel" | "muiRowDragHandleProps" | "enableRowOrdering" | "initialState" | "enableSorting"> & {
    columns: MRT_ColumnDef<T>[];
    data: T[];
    totalCountPages?: number;
    pagination?: MRT_PaginationState;
    setPagination?: (
        updaterOrValue: MRT_PaginationState | (
            (prev: MRT_PaginationState) => MRT_PaginationState
        )
    ) => void;
    renderRowActions?: (row: T) => ReactNode;
    actionSize?: number;
    renderTopToolbarCustomActions?: (props: {
        table: MRT_TableInstance<T>
    }) => ReactNode;

    enableExpanding?: boolean;
    enableRowActions?: boolean;
};

const MaterialTable = <T extends MRT_RowData>({
    columns,
    data,
    totalCountPages,
    pagination,
    enableExpanding = false,
    actionSize,
    enableRowActions = true,
    setPagination = () => { },
    renderRowActions = () => <></>,
    renderTopToolbarCustomActions = () => <></>,
    ...rest
}: MaterialTableProps<T>) => {
    const initialPagination = useMemo(() => {
        const queryParams = getQueryParams();
        return {
            pageIndex: (queryParams.page ? Number(queryParams.page) - 1 : pagination?.pageIndex) ?? 0,
            pageSize: (queryParams.pageSize ? Number(queryParams.pageSize) : pagination?.pageSize) ?? 10,
        };
    }, [pagination?.pageIndex, pagination?.pageSize]); // Only recreate when these values change

    // State to track if we've initialized from URL params
    const [hasInitialized, setHasInitialized] = useState(false);

    useEffect(() => {
        if (!hasInitialized && setPagination) {
            setPagination(initialPagination);
            setHasInitialized(true);
        }
    }, [hasInitialized, initialPagination, setPagination]);

    const handlePaginationChange = (updaterOrValue: MRT_PaginationState | ((prev: MRT_PaginationState) => MRT_PaginationState)) => {
        const newPagination = typeof updaterOrValue === 'function'
            ? updaterOrValue(pagination || initialPagination)
            : updaterOrValue;

        updateQueryParams({
            page: newPagination.pageIndex + 1, // +1 because pageIndex is 0-based
            pageSize: newPagination.pageSize,
        });

        if (setPagination) {
            setPagination(newPagination);
        }
    };

    const getRowCount = () => {
        // Check if totalCountPages or pagination are falsy (null, undefined, etc.)
        if (!totalCountPages || !pagination) {
            return 0;
        }

        // Calculate row count if totalCountPages and pagination are truthy
        return totalCountPages * (pagination.pageSize || 10);
    };

    const table = useMaterialReactTable({
        columns,
        data,
        // CONFIG
        enableColumnFilters: false,
        enableColumnActions: false,
        enableDensityToggle: false,

        enableColumnVirtualization: true,
        enableExpanding,

        enableHiding: false,
        enableFullScreenToggle: false,
        enableGlobalFilter: false,
        enableRowSelection: false,
        enableTableFooter: false,
        enableStickyFooter: false,
        // PAGINATION
        enablePagination: !!totalCountPages,
        manualPagination: true,
        pageCount: totalCountPages ?? 0,
        rowCount: getRowCount(),
        onPaginationChange: handlePaginationChange,
        paginationDisplayMode: 'pages',
        state: {
            pagination: pagination ?? { pageIndex: 0, pageSize: 10 },
            // isLoading: true
        },
        // STYLING
        muiBottomToolbarProps: {
            sx: {
                zIndex: 0,
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
                overflowX: 'hidden',
                paddingLeft: "15px",
                paddingRight: "15px",
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
        muiTableHeadCellProps: (props) => {
            if (props.column.columnDef.id === "mrt-row-actions") {
                return {
                    align: "center",
                    sx: {
                        border: "none",
                        borderTopLeftRadius: props.column.getIsFirstColumn() ? '8px' : '',
                        borderBottomLeftRadius: props.column.getIsFirstColumn() ? '8px' : '',
                        borderTopRightRadius: props.column.getIsLastColumn() ? '8px' : '',
                        borderBottomRightRadius: props.column.getIsLastColumn() ? '8px' : '',
                    }
                };
            }

            return {
                sx: {
                    border: "none",
                    borderTopLeftRadius: props.column.getIsFirstColumn() ? '8px' : '',
                    borderBottomLeftRadius: props.column.getIsFirstColumn() ? '8px' : '',
                    borderTopRightRadius: props.column.getIsLastColumn() ? '8px' : '',
                    borderBottomRightRadius: props.column.getIsLastColumn() ? '8px' : '',
                }
            };
        },
        // ACTIONS COLUMN
        enableRowActions,
        displayColumnDefOptions: {
            'mrt-row-actions': {
                size: actionSize ?? 5,
                header: 'Actions',
            },
            'mrt-row-drag': {
                header: "",
            },
        },
        positionActionsColumn: 'last',
        renderRowActions: ({ row }) =>
            <Box sx={{ justifyContent: "center", width: '100%', display: 'flex', flexWrap: 'nowrap', gap: '8px' }}>
                {renderRowActions ? renderRowActions(row.original) : null}
            </Box>,
        enableTopToolbar: true,
        renderTopToolbarCustomActions,
        ...rest
    });

    return <MaterialReactTable table={table} />;
};

export { MaterialTable };
