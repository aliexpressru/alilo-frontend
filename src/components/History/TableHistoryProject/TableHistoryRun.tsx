import { routes } from '../../../router/routes';
import { Link } from 'react-router-dom';

import { Run } from '../../../types/RunTypes';
import { StatusBage } from '../../Runs/StatusBage/StatusBage';
import { TABLE_TEXT_LENGTH } from '../../../constants';
import { TooltipText } from '../../shared/TooltipText';
import { datetimeToMKS } from '../../../utils/dates';
import { useEffect, useMemo, useState } from "react";
import { MaterialReactTable, MRT_ColumnDef, useMaterialReactTable } from "material-react-table";
import { Text } from "@mantine/core";

type TableHistoryRunProps = {
	runs: Run[];
	callback: VoidFunction;
};

export const TableHistoryRun: React.FC<TableHistoryRunProps> = ({
	runs
}) => {
	const [data, setData] = useState<Run[]>([]);

	useEffect(() => {
		setData(runs);
	}, [runs]);

	const columns = useMemo<MRT_ColumnDef<Run>[]>(
		() => [
			{
				accessorFn: (res) => res.title,
				Cell: ({cell, row}) => (
					<Link to={routes.run.view.createPath(row.original.run_id)}>
						<TooltipText text={cell.getValue<string>()} size={TABLE_TEXT_LENGTH}/>
					</Link>
				),
				header: 'Name',
			},
			{
				accessorFn: (res) => res.percentage_of_target,
				Cell: ({ cell }) => (
					<Text
						size="md">{cell.getValue<string>()}
					</Text>
				),
				header: 'Target, %',
				maxSize: 15,
			},
			{
				accessorFn: (res) => res.run_id,
				Cell: ({ cell }) => (
					<Text
						size="md">{cell.getValue<string>()}
					</Text>
				),
				header: 'Run ID',
				maxSize: 15,
			},
			{
				accessorFn: (res) => res.status,
				Cell: ({ cell }) => (
					<StatusBage status={cell.getValue<string>()}/>
				),
				header: 'Status',
				maxSize: 15,
			},
			{
				accessorKey: 'start_time',
				accessorFn: (res) => datetimeToMKS(res.created_at),
				Cell: ({cell}) => (
					<Text
						size="md">{cell.getValue<string>()}
					</Text>
				),
				header: 'Start time',
			},
			{
				accessorKey: 'updated_at',
				accessorFn: (res) => datetimeToMKS(res.updated_at),
				Cell: ({cell}) => (
					<Text
						size="md">{cell.getValue<string>()}
					</Text>
				),
				header: 'End time',
			},
			{
				accessorKey: 'launched by',
				accessorFn: (res) => res.user_name,
				Cell: ({cell}) => (
					<Text
						size="md">{cell.getValue<string>()}
					</Text>
				),
				header: 'Launched by',
			},
		], []
	);

	const table = useMaterialReactTable({
		columns,
		initialState: {
			sorting: [
				{
					id: 'start_time',
					desc: true,
				},
			],
		},
		data,
		// CONFIG
		enableColumnFilters: false,
		enableColumnActions: false,
		enableDensityToggle: false,
		enableHiding: false,
		enableFullScreenToggle: false,
		enableGlobalFilter: false,
		enableTableFooter: false,
		enableStickyFooter: false,
		// STYLING
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
		muiBottomToolbarProps: {
			sx: {
				boxShadow: "none"
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
				paddingLeft: "15px",
				paddingRight: "15px",
				paddingTop: "8px",
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
		positionActionsColumn: 'last',
		enableTopToolbar: true,
	});

	return (
		<MaterialReactTable table={table} />
	);
};
