import { Project } from "../../../types/ProjectTypes";
import { useMemo } from "react";
import { MRT_ColumnDef, MRT_PaginationState } from "material-react-table";
import { Flex, Group, Text } from "@mantine/core";
import { modals } from '@mantine/modals';
import { ProjectCreateModal, ProjectDeleteModal, ProjectEditModal } from "../modals";
import { Link } from 'react-router-dom';
import { IconButton } from '../../shared/Buttons/IconButton';
import { Pencil, Trash } from '../../../assets/svg';
import { routes } from "../../../router/routes";
import { MaterialTable } from "../../shared/Table/MaterialTable";
import { AddButton } from "../../shared/Buttons/AddButton";

export interface ITableProjectsProps {
    data: Project[];
    callback: VoidFunction;
    setPagination: (updaterOrValue: MRT_PaginationState | ((prev: MRT_PaginationState) => MRT_PaginationState)) => void;
    pagination: MRT_PaginationState;
    totalCountPages: number;
}

const TableProjects = ({data, callback, setPagination, pagination, totalCountPages}: ITableProjectsProps) => {
    const openEditModal = (editedProject: Project) =>
        modals.open({
            title: 'Project edit',
            size: 'xl',
            radius: 'md',
            children: <ProjectEditModal
                close={modals.closeAll}
                project={editedProject}
                callback={callback}
            />
        });

    const openCreateModal = () =>
        modals.open({
            title: 'Project create',
            size: 'xl',
            radius: 'md',
            children: <ProjectCreateModal
                close={modals.closeAll}
                callback={callback}
            />
        });

    const openDeleteModal = (editedProject: Project) =>
        modals.open({
            title: 'Project edit',
            size: 'xl',
            radius: 'md',
            children: <ProjectDeleteModal
                close={modals.closeAll}
                project={editedProject}
                callback={callback}
            />
        });

    const columns = useMemo<MRT_ColumnDef<Project>[]>(
        () => [
            {
                accessorFn: (res) => res.title,
                Cell: ({cell, row}) => (
                    <Link to={routes.project.view.createPath(row.original.id)}>
                        <Text size="md">{cell.getValue<string>()}</Text>
                        <Text size="xs">{row.original.title}</Text>
                    </Link>
                ),
                header: 'Title',
                maxSize: 100,
            }
        ], []
    );

    const renderRowActions = (row: Project) => (
        <Flex direction={'row'} gap={'md'}>
            <IconButton icon={Pencil} iconProps={{size: "l"}} onClick={() => openEditModal(row)}/>
            <IconButton icon={Trash} iconProps={{size: "l"}} onClick={() => openDeleteModal(row)}/>
        </Flex>
    );


    return (<MaterialTable<Project>
        data={data}
        columns={columns}
        renderRowActions={renderRowActions}
        renderTopToolbarCustomActions={() => (
            <Group>
                <AddButton onClick={openCreateModal}/>
            </Group>)}
        totalCountPages={totalCountPages}
        pagination={pagination}
        setPagination={setPagination}
    />);
};

export default TableProjects;

