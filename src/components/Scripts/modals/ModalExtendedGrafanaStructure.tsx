import { Button, Checkbox, Loader, ScrollArea, Stack, TextInput } from "@mantine/core";
import { hasLength, useForm } from "@mantine/form";
import { useCallback, useState } from "react";
import { scenarioService } from "../../../services/api";
import { ModalGrafana } from "./ModalGrafanaStructure";
import { modals } from "@mantine/modals";
import { Scenario } from "../../../types/ScenarioTypes";
import styles from "./modal.module.css";

type ModalExtendedGrafanaStructureProps = {
    scenariosMap: Record<Scenario['scenario_id'], Scenario['title']>;
};

export const ModalExtendedGrafanaStructure = ({ scenariosMap }: ModalExtendedGrafanaStructureProps) => {
    const [isLoading, setIsLoading] = useState<boolean>(false);

    const form = useForm({
        mode: 'uncontrolled',
        initialValues: {
            projectName: '',
            selectedScenarios: Object.fromEntries(
                Object.keys(scenariosMap).map((id) => [id, true])
            ) as Record<string, boolean>,
        },
        validate: {
            projectName: hasLength({ min: 3 }, 'Must be at least 3 characters'),
        },
    });

    const handleExportGrafana = useCallback((values: typeof form.values) => {
        setIsLoading(true);
        const filteredKeys = Object.entries(values.selectedScenarios)
            // Step 2: Filter the pairs where the value is true
            .filter(([_, value]) => value === true)
            // Step 3: Extract the keys from the filtered pairs
            .map(([key]) => key);
        scenarioService.generateGrafanaStructureByIds(filteredKeys, values.projectName)
            .then((res) => {
                modals.closeAll();
                modals.open({
                    title: 'Grafana structure',
                    size: 'xl',
                    radius: 'md',
                    children: <ModalGrafana content={res.message} />,
                });
            })
            .finally(() => {
                form.reset();
                setIsLoading(false);
            });
    }, [form]);

    return (
        <form onSubmit={form.onSubmit(handleExportGrafana)}>
            <Stack>
                <TextInput
                    label="Project Name"
                    key={form.key('projectName')}
                    error={form.errors["projectName"]}
                    {...form.getInputProps('projectName')}
                />
                <ScrollArea style={{ height: 300 }}>
                    {Object.entries(scenariosMap).map(([id, title]) => (
                        <Checkbox
                            label={title}
                            style={{ marginBottom: 10 }}
                            key={`selectedScenarios.${id}`}
                            {...form.getInputProps(`selectedScenarios.${id}`, { type: 'checkbox' })}
                        />
                    ))}
                </ScrollArea>
                <Button
                    className={styles["export-button"]}
                    type="submit"
                >
                    {isLoading ? <Loader size="sm" /> : "Export"}
                </Button>
            </Stack>
        </form>
    );
};
