import { TabsVertical } from '../../vendor/TabsVertical/TabsVertical';

type RunScriptsGeneralModalProps = {
    runId: number
    scriptName: string
    close: VoidFunction;
};

// eslint-disable-next-line max-len
export const RunScriptsGeneralModal: React.FC<RunScriptsGeneralModalProps> = (
    // eslint-disable-next-line no-empty-pattern
    { runId, scriptName, close}
    // eslint-disable-next-line arrow-body-style
) => {
    return (
        <TabsVertical
            runId={runId}
            scriptName={scriptName}
            close={close}
        />
    );
};
