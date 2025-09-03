import {
    CloseButton,
    Container,
    Divider,
    Flex,
    Group,
    Loader,
    rem,
    ScrollArea,
    SimpleGrid,
    Tabs,
    Text,
} from '@mantine/core';
import { StatsField } from '../StatsField';
import classes from './TabsVertical.module.css';

import { IconExternalLink } from '@tabler/icons-react';
import { useCallback, useEffect, useState } from 'react';
import { runService } from '../../../services/api';
import { ScriptRunInfo, scriptRunToScriptRunInfo } from '../../../types/RunTypes';
import { StatusBageLight } from '../../Runs/StatusBage/StatusBageLight';

interface ITabsVertical {
    runId: number
    scriptName: string
    close: VoidFunction
}

export function TabsVertical(
    {
        runId,
        scriptName,
        close
    }: ITabsVertical
) {
    const [scriptsRunInfo, setScriptsRunInfo] = useState<ScriptRunInfo[]>();
    const handleGetScriptRun = useCallback(
        () => {
            runService
                .getScriptRun(runId, scriptName)
                .then((response) =>
                    response.script_runs.map(
                        (sc) => scriptRunToScriptRunInfo(sc)
                    )
                )
                .then((res) => {
                    setScriptsRunInfo(res);
                }
                );
        },
        [runId, scriptName]
    );

    const getLogUrl = (head: boolean, sr?: ScriptRunInfo) => {
        if (sr && sr.agent) {
            return `http://${sr.agent?.host_name}:8888/api/v1/getTaskLogs?name=${sr.log_file_name}&head=${head}&len=10000`;
        }

        return "";
    };

    useEffect(() => {
        handleGetScriptRun();
        const interval = setInterval(
            handleGetScriptRun,
            5000
        );
        return () => clearInterval(interval);
    }, [handleGetScriptRun]);

    return (
        <>{
            scriptsRunInfo
                ? (
                    <>
                        <Tabs defaultValue={scriptsRunInfo[0].run_script_id.toString()} orientation="vertical"
                            classNames={{
                                root: classes['root'],
                                list: classes['list'],
                                panel: classes['panel'],
                                tab: classes['tab'],
                                tabLabel: classes['tabLabel'],
                                tabSection: classes['tabSection']
                            }}
                        >
                            <Tabs.List>
                                {scriptsRunInfo.map((sr) => (
                                    <Tabs.Tab value={
                                        sr.run_script_id.toString()
                                    }
                                    >
                                        <Group align="center">
                                            <StatusBageLight
                                                status={sr.status}
                                                withoutLabel={true}
                                            />
                                            <Text>{sr.agent ? sr.agent.host_name : 'not found'}</Text>
                                        </Group>
                                    </Tabs.Tab>
                                ))}
                            </Tabs.List>
                            {scriptsRunInfo.map((sr) => (
                                <Tabs.Panel value={sr.run_script_id.toString()}
                                >
                                    <Container ml={0} style={{
                                        display: "flex",
                                        paddingLeft: rem(-20),
                                        paddingTop: "20px",
                                        justifyContent: "space-between",
                                        marginRight: "-30px",
                                    }}>
                                        <Flex direction={"column"} gap={"xs"}>
                                            <Text fw={700} size="lg">{scriptsRunInfo[0]._script_name}</Text>
                                            <Text fw={400} size="xs">{scriptsRunInfo[0]._description}</Text>
                                        </Flex>
                                        <CloseButton
                                            style={{
                                                position: "absolute",
                                                top: "13px",
                                                right: "13px!important"
                                            }}
                                            radius={"md"} onClick={close} right={5} />
                                    </Container>
                                    <Divider my="md" />
                                    <ScrollArea h={600} offsetScrollbars>
                                        <Flex direction={"column"} gap={"md"}>
                                            <SimpleGrid cols={{ base: 1, sm: 3 }}>
                                                <StatsField label="RPS" stats={sr.metrics.rps} />
                                                <StatsField label="Fail rate" stats={sr.metrics.failed_rate} />
                                                <StatsField label="VUs (active/init)"
                                                    stats=<>{sr.metrics.active_vus_count} / {sr.metrics.vus}</> />
                                            </SimpleGrid>
                                            <SimpleGrid cols={{ base: 1, sm: 4 }}>
                                                <StatsField label="RT 90th" stats={sr.metrics.rt90p} />
                                                <StatsField label="RT 95th" stats={sr.metrics.rt95p} />
                                                <StatsField label="RT 99th" stats={sr.metrics.rt99p} />
                                                <StatsField label="RT Max" stats={sr.metrics.rt_max} />
                                            </SimpleGrid>
                                            <SimpleGrid cols={{ base: 1, sm: 3 }}>
                                                <StatsField label="Total / Failed"
                                                    stats=<>{sr.metrics.full_iteration_count} / {sr.metrics.failed}</> />
                                                <StatsField label="Checks" stats={sr.metrics.checks} />
                                                <StatsField label="Dropped iter." stats={sr.metrics.dropped_iterations} />
                                            </SimpleGrid>
                                            <SimpleGrid cols={{ base: 1, sm: 3 }}>
                                                <StatsField label="Steps" stats={sr._steps} />
                                                <StatsField label="Duration (planed)" stats={sr._duration} />
                                                <StatsField label="Duration (current)"
                                                    stats={sr.metrics.current_test_run_duration} />
                                            </SimpleGrid>
                                            <SimpleGrid cols={{ base: 1, sm: 3 }}>
                                                <StatsField label="Script" stats={
                                                    <Group gap={"2"}>
                                                        <a href={sr._script_link} target="_blank">File link</a>
                                                        <IconExternalLink
                                                            style={
                                                                {
                                                                    // eslint-disable-next-line max-len
                                                                    width: rem(20),
                                                                    // eslint-disable-next-line max-len
                                                                    height: rem(20)
                                                                }
                                                            }
                                                            stroke={1.5}
                                                        />
                                                    </Group>
                                                } />
                                                <StatsField label="Uniq. URLs count" stats={sr.metrics.variety_ts} />
                                                <StatsField label="Logs" stats={
                                                    <Flex direction={"row"} gap={"md"}>
                                                        <Group gap={"2"}>
                                                            <a
                                                                // eslint-disable-next-line max-len
                                                                href={getLogUrl(true, sr)}
                                                                target="_blank"
                                                            >Head</a>
                                                            <IconExternalLink
                                                                style={
                                                                    {
                                                                        // eslint-disable-next-line max-len
                                                                        width: rem(20),
                                                                        // eslint-disable-next-line max-len
                                                                        height: rem(20)
                                                                    }
                                                                }
                                                                stroke={1.5}
                                                            />
                                                        </Group>
                                                        <Group gap={"2"}>
                                                            <a
                                                                // eslint-disable-next-line max-len
                                                                href={getLogUrl(false, sr)}
                                                                target="_blank"
                                                            >Tail</a>
                                                            <IconExternalLink
                                                                style={
                                                                    {
                                                                        // eslint-disable-next-line max-len
                                                                        width: rem(20),
                                                                        // eslint-disable-next-line max-len
                                                                        height: rem(20)
                                                                    }
                                                                }
                                                                stroke={1.5}
                                                            />
                                                        </Group>
                                                    </Flex>
                                                } />
                                            </SimpleGrid>
                                            <SimpleGrid cols={{ base: 1, sm: 3 }}>
                                                <StatsField label="Agent Host"
                                                    stats={sr.agent ? sr.agent.host_name : 'not found'} />
                                                <StatsField label="Exxec status"
                                                    stats={sr.metrics.execution_status} />
                                            </SimpleGrid>
                                            <SimpleGrid cols={{ base: 1, sm: 1 }}>
                                                <StatsField label="Progress" stats={sr.metrics.progress_bar} />
                                            </SimpleGrid>
                                        </Flex>
                                    </ScrollArea>
                                </Tabs.Panel>
                            ))}
                        </Tabs>
                    </>
                )
                : (
                    <Container h={400}>
                        <CloseButton
                            style={{
                                position: "absolute",
                                top: "13px",
                                right: "13px!important"
                            }}
                            radius={"md"} onClick={close} right={5} />
                        <Loader color="red" type="dots" style={{ position: "absolute", top: "50%", left: "50%" }} />
                    </Container>
                )
        }
        </>
    );
}
