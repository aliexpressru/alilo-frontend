import { useMemo } from 'react';
import {
    MaterialReactTable,
    type MRT_ColumnDef,
    MRT_Row,
    MRT_ToggleGlobalFilterButton,
    useMaterialReactTable,
} from 'material-react-table';
import { Group, rem, Text } from '@mantine/core';
import {
    IconCopy,
    IconFile,
    IconFileOff,
    IconFileUpload,
    IconFolderFilled,
    IconFolderPlus,
    IconRefresh
} from '@tabler/icons-react';
import { Box, Divider, IconButton, ListItemIcon, MenuItem } from '@mui/material';
import { filesize } from "filesize";
import { useClipboard } from '@mantine/hooks';
import { modals } from '@mantine/modals';

import { FolderAddModal } from "../modals/FolderAddModal";
import { FileUploadModal } from "../modals/FileUploadModal";
import { FileDeleteModal } from "../modals/FileDeleteModal";

import { ObjectNode, ObjectType } from "../../../types/FileTypes";

interface IFilesTable {
    data: ObjectNode[],
    bucket: string,
    callback: VoidFunction,
}

const FilesTable = ({ data, bucket, callback }: IFilesTable) => {
    const clipboard = useClipboard({ timeout: 500 });

    const makeIdent = (n: number) => `${n * 15}px`;

    const openFileUploadModal = (_path: string, _bucket: string) =>
        modals.open({
            title: 'Upload file',
            size: 'xl',
            radius: 'md',
            children: <FileUploadModal
                path={_path}
                bucket={_bucket}
                callback={() => {
                    callback();
                }}
                close={() => modals.closeAll()
                }
            />
        });

    const openFolderAddModal = (_path: string, _bucket: string) =>
        modals.open({
            title: 'Create folder',
            size: 'xl',
            radius: 'md',
            children: <FolderAddModal
                path={_path}
                bucket={_bucket}
                callback={() => {
                    callback();
                }}
                close={() => modals.closeAll()
                }
            />
        });

    const openFileDeleteModal = (_path: string, _bucket: string) =>
        modals.open({
            title: 'Delete file',
            size: 'xl',
            radius: 'md',
            children: <FileDeleteModal
                pathToFile={_path}
                bucket={_bucket}
                callback={() => {
                    callback();
                }}
                close={() => modals.closeAll()
                }
            />
        });

    // todo if need add remove folder
    // const openFolderRemoveModal = (_path: string, _bucket: string) =>
    //     modals.open({
    //         title: 'Delete folder',
    //         size: 'xl',
    //         radius: 'md',
    //         children: <FolderRemoveModal
    //             path={_path}
    //             callback={() => {
    //                 callback();
    //             }}
    //             close={() => modals.closeAll()
    //             }
    //         />
    //     });

    const actionMenuForDir = (
        closeMenu: () => void,
        row: MRT_Row<ObjectNode>
    ) => [
        <MenuItem
            key={2}
            onClick={() => {
                closeMenu();
                openFileUploadModal(
                    row.original.path,
                    bucket,
                );
            }}
            sx={{ m: 0 }}
        >
            <ListItemIcon>
                <IconFileUpload type="file"/>
            </ListItemIcon>
            Upload file
        </MenuItem>,
        <Divider/>,
        <MenuItem
            key={3}
            onClick={() => {
                closeMenu();
                openFolderAddModal(
                    row.original.path,
                    bucket,
                );
            }}
            sx={{ m: 0 }}
        >
            <ListItemIcon>
                <IconFolderPlus/>
            </ListItemIcon>
            Add folder
        </MenuItem>
    ];

    const actionMenuForFile = (
        closeMenu: () => void,
        row: MRT_Row<ObjectNode>
    ) => [
        <MenuItem
            key={1}
            onClick={() => {
                clipboard.copy(`${bucket}/${row.original.storage_object?.key}`);
                closeMenu();
            }}
            sx={{ m: 0 }}
        >
            <ListItemIcon>
                <IconCopy/>
            </ListItemIcon>
            Copy link
        </MenuItem>,
        <Divider/>,
        <MenuItem
            key={4}
            onClick={() => {
                closeMenu();
                openFileDeleteModal(
                    row.original.path,
                    bucket,
                );
            }}
            sx={{ m: 0 }}
        >
            <ListItemIcon>
                <IconFileOff
                />
            </ListItemIcon>
            Remove file
        </MenuItem>
    ];

    const columns = useMemo<MRT_ColumnDef<ObjectNode>[]>(
        () => [
            {
                accessorFn: (row) => row.name,
                header: 'Name',
                size: 400,
                Cell: ({ renderedCellValue, row }) => {
                    switch (row.original.type) {
                        case ObjectType.Dir:
                            return (
                                <Group style={{ paddingLeft: makeIdent(row.original.level) }}>
                                    <IconFolderFilled style={{ width: rem(36), height: rem(36) }}/>
                                    <Text size="md">{renderedCellValue}</Text>
                                </Group>
                            );
                        case ObjectType.File:
                            return (
                                <Group style={{ paddingLeft: makeIdent(row.original.level) }}>
                                    <IconFile style={{ width: rem(36), height: rem(36) }} stroke={"1.5"}/>
                                    <Text size="md">{renderedCellValue}</Text>
                                </Group>
                            );
                        case ObjectType.Empty:
                            return (<p>Empty</p>);
                        default:
                            return (<></>);
                    }
                },
            },
            {
                accessorFn: (res) => {
                    switch (res.type) {
                        case ObjectType.File:
                            // return (<Text size="md">{res.StorageObject?.Size}</Text>);
                            return (<Text size="md">{filesize(res.storage_object ? res.storage_object.size : 0)}</Text>);
                        default:
                            return (<></>);
                    }
                },
                id: 'size',
                header: 'Size',
                size: 50
            },
        ],
        [],
    );

    const table = useMaterialReactTable({
        columns,
        data,
        enableExpandAll: false,
        enableExpanding: true,
        filterFromLeafRows: true,
        enableRowActions: true,
        enableDensityToggle: false,
        enableFullScreenToggle: false,
        getSubRows: (row) => row.children,
        initialState: {
            density: 'compact'
        },
        positionActionsColumn: "last",
        paginateExpandedRows: false,
        muiSearchTextFieldProps: {
            sx: {
                backgroundColor: "red",
            }
        },
        muiTablePaperProps: {
            elevation: 0,
            sx: {
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
        muiTableHeadCellProps: (row) => ({
            sx: {
                border: "none",
                borderTopLeftRadius: row.column.getIsFirstColumn() ? '8px' : '',
                borderBottomLeftRadius: row.column.getIsFirstColumn() ? '8px' : '',
                borderTopRightRadius: row.column.getIsLastColumn() ? '8px' : '',
                borderBottomRightRadius: row.column.getIsLastColumn() ? '8px' : '',
            }
        }),
        renderToolbarInternalActions: () => (
            <Box>
                <MRT_ToggleGlobalFilterButton table={table}/>
                <IconButton
                    onClick={() => {
                        openFolderAddModal(
                            "/",
                            bucket,
                        );
                    }}
                >
                    <IconFolderPlus/>
                </IconButton>
                <IconButton
                    onClick={() => {
                        openFileUploadModal(
                            "/",
                            bucket,
                        );
                    }}
                >
                    <IconFileUpload/>
                </IconButton>
                <IconButton
                    onClick={() => {
                        callback();
                    }}
                >
                    <IconRefresh/>
                </IconButton>

            </Box>
        ),

        renderRowActionMenuItems: ({
                                       closeMenu,
                                       row
                                   }) => row.original.type === ObjectType.Dir ? actionMenuForDir(closeMenu, row) : actionMenuForFile(closeMenu, row),
    });

    return <MaterialReactTable table={table}/>;
};

export default FilesTable;
