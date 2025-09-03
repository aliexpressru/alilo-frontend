import { useCallback, useState } from "react";
import { PillsInput, Pill, ActionIcon, CopyButton, Flex, Loader } from '@mantine/core';
import { IconCheck, IconCopy, IconRefresh } from "@tabler/icons-react";
import { IconButton } from "@mui/material";
import styles from "./TracesInputTag.module.css";

interface IPillsInputProps {
    value: string[];
    onReloadClick: VoidFunction;
}

const TracesInputTag = ({ value, onReloadClick }: IPillsInputProps) => {
    const [isLoading, setIsLoading] = useState<boolean>(false);

    const handleCopyClick = (index: number) => value[index];

    const handleCopyAllClick = () => value.join(', ');

    const onReloadClickCallback = useCallback(async () => {
        setIsLoading(true);
        try {
            await onReloadClick();
        } finally {
            setIsLoading(false);
        }
    }, [onReloadClick]);

    return (
        <PillsInput
            radius={"md"}
            variant={"unstyled"}
            miw={"200px"}
            style={{ position: 'relative', border: '1px solid #dee2e6', borderRadius: 'calc(0.5rem * 1)', padding: 'calc(0.375rem* var(--mantine-scale))', backgroundColor: 'var(--mantine-color-body)' }}>
            <label className={styles['label']}>traces</label>
            <Pill.Group>
                <Flex gap={2} pos={"absolute"} top={0} right={0}>
                    <IconButton
                        disabled={isLoading}
                        onClick={onReloadClickCallback}>
                        {isLoading
                            ? <Loader size={7} />
                            : <IconRefresh size={14} />
                        }
                    </IconButton>
                    <CopyButton value={handleCopyAllClick()}>
                        {({ copied, copy }) => (
                            <ActionIcon color={copied ? 'teal' : 'gray'} variant="subtle" onClick={copy}>
                                {copied
                                    ? <IconCheck size={14} />
                                    : <IconCopy size={14} />
                                }
                            </ActionIcon>
                        )}
                    </CopyButton>
                </Flex>
                {value.map((pill, index) => (
                    <Pill
                        key={index}
                    >
                        <Flex>
                            <div>{pill}</div>
                            <CopyButton value={handleCopyClick(index)}>
                                {({ copied, copy }) => (
                                    <ActionIcon mt={-2} color={copied ? 'teal' : 'gray'} variant="subtle" onClick={copy}>
                                        {copied
                                            ? <IconCheck size={14} />
                                            : <IconCopy size={14} />
                                        }
                                    </ActionIcon>
                                )}
                            </CopyButton>
                        </Flex>
                    </Pill>
                ))}
            </Pill.Group>
        </PillsInput>
    );
};

export default TracesInputTag;
