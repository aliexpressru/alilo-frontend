import { useCallback, useEffect, useState } from "react";
import { agentService, scenarioService } from "../../../../services/api";
import { Select } from "../../../vendor/Select/Select";
import { Button, Container, Flex, Popover, Text } from "@mantine/core";
import styles from "../LoadTagButton/LoadTagButton.module.css";

export interface ILoadTagProps {
    scenarioId: number;
    changeAllTagsCallback: (newTag: string) => void;
    currentTags: string[];
}

export const LoadTagButton = ({scenarioId, changeAllTagsCallback, currentTags}: ILoadTagProps) => {
    const [tags, setTags] = useState<string[]>([]);
    const [currentTag, setCurrentTag] = useState<string>('');
    const [opened, setOpened] = useState(false);

    const handleGetTags = useCallback(() => {
        agentService
            .getAgentAllTags()
            .then((res) => {
                const tags = res.tags;
                setTags(tags);
                const defaultTag = currentTags.length > 0 &&
                currentTags.every((t) => t === currentTags[0])
                    ? currentTags[0]
                    : '';
                setCurrentTag(defaultTag);
            });
    }, [currentTags]);

    useEffect(() => {
        handleGetTags();
    }, [handleGetTags]);

    const handleUpdateScenarioTag = useCallback(() => {
        scenarioService.updateTag(scenarioId, currentTag)
            .then(() => {
                changeAllTagsCallback(currentTag);
                setOpened(false);
            });
    }, [currentTag, scenarioId, changeAllTagsCallback]);

    return (
        <Popover opened={opened} width={300} position="bottom" withArrow shadow="md">
            <Popover.Target>
                <Button
                    onClick={() => setOpened(!opened)}
                    className={styles['control-button']}
                >
                    <Text key={'load_tag_button'}>Set tag</Text>
                </Button>
            </Popover.Target>
            <Popover.Dropdown>
                <Container>
                    <Select size={"md"}
                            mt={"-16px"}
                            searchable
                            value={currentTag}
                            label="Load tag"
                            onChange={async (tagName) => {
                                if (!tagName) {
                                    return;
                                }
                                setCurrentTag(tagName);
                            }}
                            data={tags}
                    />
                    <Flex direction="row" mt={20} gap="sm">
                        <Button radius="md" size="md" variant="filled" color="#C2FD60" fullWidth
                                style={{color: "#1d1d1d"}}
                                onClick={handleUpdateScenarioTag}>OK</Button>
                        <Button radius="md" size="md" variant="filled" color="#f3f4f67c" fullWidth
                                onClick={() => setOpened(false)}
                                style={{color: "#1d1d1d"}}>Cancel</Button>
                    </Flex>
                </Container>
            </Popover.Dropdown>
        </Popover>
    );
};
