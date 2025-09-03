// https://mantine.dev/styles/styles-api/ - styling Input
import {
    useCallback,
    useEffect,
    useState,
    // useCallback,
    // useState
} from 'react';

import { Select } from '../../../components/vendor/Select/Select';
import {
    useForm as useFormMantine,
} from '@mantine/form';
import { runService } from '../../../services/api';
import {
    formatTextDateValue,
    parseTextDateValue,
    // addHours, formatDateValue, parseTextDateValue
} from '../../../utils/dates';

type RunComboboxItem = {
    label: string,
    value: string
}

interface ISelectCompletedRun {
    setStartTime: (st: Date) => void;
    setEndTime: (et: Date) => void;
}
const SelectCompletedRun: React.FC<ISelectCompletedRun> = (
    { setStartTime, setEndTime }: ISelectCompletedRun
) => {
    const [
        runComboboxItems, setRunComboboxItems
    ] = useState<RunComboboxItem[]>([]);

    const form = useFormMantine({
        initialValues: {
            label: "",
            value: ""
        },
        onValuesChange: async (newVlaue) => {
            const [
                startTime, endTime
            ] = await handleGetTimesOfRun(newVlaue.value);

            // startTime.setHours(startTime.getHours() + 3);
            // endTime.setHours(endTime.getHours() + 3);

            setStartTime(startTime);
            setEndTime(endTime);
        }
    });

    const handleGetTimesOfRun = async (runId: string) => {
        const numRunId = Number.parseInt(runId, 10);

        const times = await runService
            .getRun(numRunId)
            .then((res) => {
                if (res.run === null) {
                    return [new Date(), new Date()];
                }
                return [
                    parseTextDateValue(res.run.created_at),
                    parseTextDateValue(res.run.updated_at)
                ];
            });
        return times;
    };

    const handleGetStoppedRuns = useCallback(() => {
        runService
            .getByStatus('STATUS_STOPPED_UNSPECIFIED', 0, 0)
            .then((res) => {
                const runs = res.runs.map((run) => {
                    // const startDate = parseTextDateValue(run.created_at);
                    const item: RunComboboxItem = {
                        label: `${run.title} ${formatTextDateValue(run.created_at, 0)}`,
                        value: run.run_id.toString(),
                    };
                    return item;
                });
                setRunComboboxItems(runs);
            });
    }, []);

    useEffect(() => {
        handleGetStoppedRuns();
    }, [handleGetStoppedRuns]);

    return (
        <form>
            <Select
                label="Select completed test"
                data={runComboboxItems}
                // flex={1}
                searchable
                w={500}
                key={form.key(`label`)}
                {...form.getInputProps(`value`, { type: 'input' })}
            />
        </form>
    );
};

export { SelectCompletedRun };

