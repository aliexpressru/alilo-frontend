import {Box, Group, NumberInput, Stack, Title} from '@mantine/core';
import styles from './IncreaseButton.module.css';
import {ActionButton} from "../Buttons/ActionButton";
import {SimpleButton} from "../Buttons/SimpleButton";
import {IconButton} from "../Buttons/IconButton";
import {BigMinus, BigPlus} from '../../../assets/svg';


type IncreaseButtonProps = {
    value: number;
    onChange: (val: number) => void;
    onSubmit: () => void;
    onCancel: () => void;
};

export const IncreaseButton = ({
                                   value,
                                   onChange,
                                   onSubmit,
                                   onCancel,
                               }: IncreaseButtonProps) => {
    const handleChange = (op: 'increase' | 'decrease') => {
        let updated = value;
        if (op === 'increase') updated = Math.min(1500, updated + 1);
        if (op === 'decrease') updated = Math.max(1, updated - 1);
        onChange(updated);
    };

    return (
        <Stack className={styles['dialog']}>
            <Title order={5}>Set total duration (minutes)</Title>

            <Group className={styles['elements']} grow>
                <Box className={styles['minus-button']}>
                    <IconButton
                        icon={BigMinus}
                        iconProps={{ size: 'l' }}
                        onClick={() => handleChange('decrease')}
                    />
                </Box>

                <NumberInput
                    name="duration"
                    min={5}
                    max={1500}
                    value={value}
                    onChange={(val) => onChange(val as number)}
                    styles={{ input: { background: 'transparent', textAlign: 'center' } }}
                    w="100%"
                    hideControls
                />

                <Box className={styles['plus-button']}>
                    <IconButton
                        icon={BigPlus}
                        iconProps={{ size: 'l' }}
                        onClick={() => handleChange('increase')}
                    />
                </Box>
            </Group>

            <Group w="100%">
                <ActionButton
                    style={{ flex: 1 }}
                    onClick={onSubmit}
                    disabled={value < 0}
                    type="submit"
                >
                    OK
                </ActionButton>
                <SimpleButton style={{ flex: 1 }} onClick={onCancel}>
                    Cancel
                </SimpleButton>
            </Group>
        </Stack>
    );
};
