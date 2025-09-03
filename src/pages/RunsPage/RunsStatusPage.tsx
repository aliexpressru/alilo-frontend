import { FC, useEffect, useState } from 'react';

import { runService } from '../../services/api';
import { Page } from '../../components/shared/Page';
import { Run } from '../../types/RunTypes';
import TableRunsStatus from "../../components/Runs/TableRunsStatus/TableRunsStatus";
import { Flex } from "@mantine/core";
import { MRT_PaginationState } from "material-react-table";
import { useMRTPagination } from "../../hooks/useMRTPagination";
import { PAGINATION_SETTINGS_KEY } from "../../constants";

const RunsStatusPage: FC = () => {
    const [runsPrepared, setRunsPrepared] = useState<Run[]>([]);
    const { currentPageSize, setCurrentPageSize } = useMRTPagination();

    const [totalStoppedRunsCountPages, setTotalScenarioCount] = useState<number>(0);
    const [stoppedRunsPagination, setStoppedRunsPagination] = useState<MRT_PaginationState>({
        pageIndex: 0,
        pageSize: currentPageSize.CurrentStoppedRunPage,
    });

    function fetchPreparedRuns() {
        runService
            .getByStatus(
                'STATUS_PREPARED',
                0,
                0
            )
            .then((resp) => {
                setRunsPrepared(resp.runs);
            });
    }

    const [runsRunning, setRunsRunning] = useState<Run[]>([]);

    function fetchRunningRuns() {
        runService
            .getByStatus(
                'STATUS_RUNNING',
                30,
                0
            )
            .then((resp) => {
                setRunsRunning(resp.runs);
            });
    }

    const [runsStoping, setRunsStopping] = useState<Run[]>([]);

    function fetchStoppingRuns() {
        runService
            .getByStatus(
                'STATUS_STOPPING',
                0,
                0
            )
            .then((resp) => {
                setRunsStopping(resp.runs);
            });
    }

    useEffect(() => {
        fetchPreparedRuns();
        fetchRunningRuns();
        fetchStoppingRuns();
    }, []);

    const [runsStopped, setRunsStopped] = useState<Run[]>([]);
    useEffect(() => {
        currentPageSize.CurrentStoppedRunPage = stoppedRunsPagination.pageSize;
        localStorage.setItem(PAGINATION_SETTINGS_KEY, JSON.stringify(currentPageSize));
        setCurrentPageSize(currentPageSize);
        runService
            .getByStatus(
                'STATUS_STOPPED_UNSPECIFIED',
                stoppedRunsPagination.pageSize,
                stoppedRunsPagination.pageIndex + 1
            )
            .then((resp) => {
                setTotalScenarioCount(+resp.total_pages);
                setRunsStopped(resp.runs);
            });
    }, [stoppedRunsPagination, currentPageSize, setCurrentPageSize]);

    return (
        <>
            <Page
                title="Runs"
                loading={false}>
                {runsStopped && (
                    <Flex style={{marginBottom: 100}} gap="30px" justify="flex-start" direction="column">
                        <TableRunsStatus title={"Preparing"} data={runsPrepared}/>
                        <TableRunsStatus title={"Running"} data={runsRunning}/>
                        <TableRunsStatus title={"Stopping"} data={runsStoping}/>
                        <TableRunsStatus
                            enablePagination={true}
                            pagination={stoppedRunsPagination}
                            setPagination={setStoppedRunsPagination}
                            totalCountPages={totalStoppedRunsCountPages}
                            title={"Stopped"}
                            data={runsStopped}/>
                    </Flex>
                )}
            </Page>
        </>
    );
};

export { RunsStatusPage };
