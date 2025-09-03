import {useState} from 'react';
import {Button, Flex, Stack, Text, Textarea} from '@mantine/core';
import {Script, SimpleScript} from '../../../types/ScriptTypes';
import styles from '../../../styles/common.module.css';
import {parsingService, scriptService} from '../../../services/api';
import {ParsedCUrl} from '../../../types/ParsingTypes';
import {snackbarService} from '../../../services/snackbarService';

type ModalImportCurlProps = {
    scenarioId: Script['scenario_id'];
    projectId: Script['project_id'];
    onClose: VoidFunction;
};

const ModalImportCurl = ({
                             onClose,
                             scenarioId,
                             projectId,
                         }: ModalImportCurlProps) => {
    const createEmptySimpleScripyByCurl = (curlArgs: ParsedCUrl): SimpleScript => ({
        name: curlArgs.url,
        description: '',
        script_id: 0,
        project_id: Number(projectId),
        scenario_id: Number(scenarioId),
        enabled: false,
        monitoring_links: [],
        tag: '',
        path: curlArgs.url,
        scheme: '',
        http_method: curlArgs.method.toLowerCase() === 'get' ? 'get' : 'post',
        query_params: curlArgs.query_params,
        headers: curlArgs.headers,
        static_ammo: curlArgs.body,
        ammo_url: '',
        is_static_ammo: true,
        rps: '1',
        duration: '5m',
        steps: '1',
        max_v_us: '300',
        script_file_url: '',
        options: '',
        selectors: {
            expr_rps: '',
            source_rps: '',
            cmt_rps: '',
            expr_rt: '',
            source_rt: '',
            cmt_rt: '',
            expr_err: '',
            source_err: '',
            cmt_err: '',
        },
        additional_env: {},
        title: curlArgs.url,
    });

    const [parseStatus, setParseStatus] = useState<string>('');
    const [parseResultJson, setParseResultJson] = useState<string>('');

    const handleParseCUrl = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
        parsingService.parseCUrl(event.currentTarget.value).then((resp) => {
            if (resp.status) {
                setParseStatus('Valid');
                setParseResultJson(resp.json);
            } else {
                setParseStatus(resp.message);
                setParseResultJson('');
            }
        });
    };

    const onCreateSimpleScript = (json: string) => {
        let simpleScript;

        try {
            simpleScript = createEmptySimpleScripyByCurl(JSON.parse(json));
        } catch (e) {
            snackbarService.addSnack({
                title: e.message ?? 'Wrong JSON',
                palette: 'danger',
            });
        }

        if (simpleScript) {
            scriptService
                .createSimpleScript(simpleScript)
                .then((resp) => {
                    if (resp.status) {
                        snackbarService.addSnack({
                            palette: 'success',
                            title: 'Script imported',
                        });
                    }
                    onClose();
                })
                .catch(() => {
                    snackbarService.addSnack({
                        palette: 'danger',
                        title: 'Error of creating script',
                    });
                });
        }
    };

    const handleSubmit = () => {
        onCreateSimpleScript(parseResultJson);
    };

    return (
        <Stack
        >
            <Textarea
                onChange={handleParseCUrl}
                className={styles['curl-area']}
                autosize
                minRows={13}
            />
            <Text color={parseStatus === 'Valid' ? 'green' : 'red'}>
                {parseStatus}
            </Text>
            <Flex gap="md" justify="stretch">
                <Button
                    fullWidth
                    disabled={parseResultJson.length === 0}
                    onClick={handleSubmit}
                >
                    OK
                </Button>
                <Button variant="default" fullWidth onClick={onClose}>
                    Cancel
                </Button>
            </Flex>
        </Stack>
    );
};

export {ModalImportCurl};
