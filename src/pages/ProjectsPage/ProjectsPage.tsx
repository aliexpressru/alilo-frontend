import { FC, useCallback, useEffect, useState } from 'react';

import { projectService } from '../../services/api';
import type { Project } from '../../types/ProjectTypes';
import { Page } from '../../components/shared/Page';
import { notifications } from '@mantine/notifications';
import TableProjects from "../../components/Projects/TableProjects/TableProjects";
import { MRT_PaginationState } from "material-react-table";
import { useMRTPagination } from "../../hooks/useMRTPagination";
import { PAGINATION_SETTINGS_KEY } from "../../constants";

const ProjectsPage: FC = () => {
    const [projects, setProjects] = useState<Project[]>([]);
    const { currentPageSize, setCurrentPageSize } = useMRTPagination();
    const [loader, setLoader] = useState<boolean>(false);
    const [totalProjectCountPages, setTotalProjectCount] = useState<number>(0);
    const [pagination, setPagination] = useState<MRT_PaginationState>({
        pageIndex: 0,
        pageSize: currentPageSize.CurrentProjectPage,
    });

    const handleUpdateProjectsList = useCallback(() => {
        setLoader(true);

        currentPageSize.CurrentProjectPage = pagination.pageSize;
        localStorage.setItem(PAGINATION_SETTINGS_KEY, JSON.stringify(currentPageSize));
        setCurrentPageSize(currentPageSize);

        projectService
            .getAllProjects(pagination.pageSize, pagination.pageIndex + 1)
            .then((p) => {
                setProjects(p.projects);
                setTotalProjectCount(p.totalPages);
            })
            .catch((e) => {
                notifications.show({
                    title: 'Error',
                    message: e.message ?? 'Eror while fetching projects',
                    autoClose: 3000,
                    withCloseButton: false,
                    radius: 'md'
                });
            })
            .finally(() => {
                setLoader(false);
            });
    }, [pagination, currentPageSize, setCurrentPageSize]);

    useEffect(() => {
        handleUpdateProjectsList();
    }, [handleUpdateProjectsList]);

    return (
        <>
            <Page
                title="Projects"
                loading={loader}>
                <TableProjects
                    totalCountPages={totalProjectCountPages}
                    setPagination={setPagination}
                    data={projects}
                    callback={handleUpdateProjectsList}
                    pagination={pagination}/>
            </Page>
        </>
    );
};

export { ProjectsPage };
