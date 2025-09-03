import { Select } from "../../vendor/Select/Select";
import { TextInput } from "../../vendor/TextInput/TextInput";
import { Box, Group, Loader } from "@mantine/core";
import { StatsField } from "../../vendor/StatsField";
import React, { useCallback, useEffect, useState } from "react";
import { UseFormReturnType } from "@mantine/form";
import { IconCheck, IconX } from "@tabler/icons-react";
import { debounce } from "lodash";
import { metrixService } from "../../../services/api/metrixService";
import { percentile } from "../../../utils/math";
import { DataSource } from "../../../types/MetrixTypes";


type MonitoringControlProps<T> = {
    form: UseFormReturnType<T,
        (values: T) => T>;
    expressionKeyName: string;
    expressionLabel: string;
    selectKeyName: string;
    sourceLabel: string;
    statsFieldKeyName: string;
    statsLabel: string;
    statsField: "cmt_rps" | "cmt_rt" | "cmt_err";
};

enum ExprStatus {
    Failed = "failed",
    Success = "success",
    Loading = "loading",
    None = "none"
}

export const MonitoringControl: React.FC<MonitoringControlProps<any>> = ({
                                                                        form,
                                                                        expressionKeyName,
                                                                        selectKeyName,
                                                                        statsFieldKeyName,
                                                                        sourceLabel,
                                                                        statsLabel,
                                                                        expressionLabel,
                                                                        statsField
                                                                    }) => {
    const [exprStatus, setExprStatus] = useState<ExprStatus>(ExprStatus.None);
    const [exprIsDisabled, setExprIsDisabled] = useState<boolean>(form.getInputProps(selectKeyName).value === "");
    const [dataSources, setDataSources] = useState<DataSource[]>([]);

    const handleGetDataSources = useCallback(() => {
        metrixService.getDataSource()
            .then((data) => {
                setDataSources(data);
            });
    }, []);

    useEffect(() => {
        handleGetDataSources();
    }, [handleGetDataSources]);

    const expressionOnChange = (fieldName: string) => (event: React.ChangeEvent<HTMLInputElement>) => {
        const fieldValue = event.currentTarget.value;
        form.getInputProps(fieldName).onChange(event);
        debouncedOnValueChange(fieldValue);
    };

    // eslint-disable-next-line react-hooks/exhaustive-deps
    const debouncedOnValueChange = useCallback(debounce(async (fieldValue: string) => {
        setExprStatus(ExprStatus.Loading);
        if (!form) {
            setExprStatus(ExprStatus.None);
            return;
        }

        const directUrl = form.getInputProps(selectKeyName).value;
        const response = await metrixService
            .getMetrixExpr(fieldValue, directUrl);

        switch (response.status) {
            case "failed":
                setExprStatus(ExprStatus.Failed);
                break;
            case "success":
                setExprStatus(ExprStatus.Success);
                // eslint-disable-next-line no-case-declarations
                const data = response.data?.result.map((res) => {
                    return res.values.map((v) => parseFloat(v.data));
                }).flat();
                if (!data) {
                    break;
                }
                if (data.length === 0) {
                    form.setFieldValue(statsFieldKeyName, "-");
                    break;
                }
                // eslint-disable-next-line no-case-declarations
                const percentileValue = percentile(data, 0.6);
                form.setFieldValue(statsFieldKeyName, percentileValue.toString());
                break;
            default:
                setExprStatus(ExprStatus.None);
        }
    }, 500), [form, selectKeyName, statsFieldKeyName, setExprStatus, metrixService, percentile]);

    const getExprRightSection = () => {
        if (exprStatus === ExprStatus.Loading) {
            return <Loader size={18}/>;
        }
        if (exprStatus === ExprStatus.Failed) {
            return <IconX color="red" size={18}/>;
        }
        if (exprStatus === ExprStatus.Success) {
            return <IconCheck color="green" size={18}/>;
        }
        return null;
    };

    return (<Group>
        <Select key={form.key(selectKeyName)}
                flex={2}
                data={dataSources
                    .map((ds) => ({
                        label: ds.name,
                        value: ds.json_data.direct_url,
                    }))
                }
                label={sourceLabel}
                searchable
                allowDeselect={false}
                {...form.getInputProps(selectKeyName)}
                onChange={(value) => {
                    if (value !== null) {
                        setExprIsDisabled(false);
                        form.setFieldValue(selectKeyName, value);
                        return;
                    }

                    setExprIsDisabled(true);
                }}
        />
        <TextInput
            disabled={exprIsDisabled}
            {...form.getInputProps(expressionKeyName)}
            onChange={expressionOnChange(expressionKeyName)}
            rightSection={getExprRightSection()}
            flex={4}
            label={expressionLabel}
            key={form.key(expressionKeyName)}
        />
        <Box flex={1}
             style={{
                 height: 'var(--input-height-xl)', marginTop: 'var(--mantine-spacing-md)'
             }}
             hidden={form.values.selectors[statsField] === ""}>
            <StatsField
                key={form.key(statsFieldKeyName)}
                label={statsLabel}
                stats={form.getValues().selectors[statsField]}
                {...form.getInputProps(statsFieldKeyName, {type: 'input'})}/>
        </Box>
    </Group>);
};
