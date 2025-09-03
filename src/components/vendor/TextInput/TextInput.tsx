import { useState } from 'react';
import {
    TextInput as TextInputMantine,
    TextInputProps,
} from '@mantine/core';
import classes from './TextInput.module.css';

export function TextInput(
    {
        onFocus,
        onBlur,
        ...rest
    }: TextInputProps
) {
    const [focused, setFocused] = useState(false);
    const floating =
        String(rest.value).trim().length !== 0
        || focused
        // eslint-disable-next-line no-undefined
        || undefined;

    return (
        <TextInputMantine
            classNames={{
                root: classes['root'],
                input: classes['input'],
                label: classes['label'],
            }}
            size="xl"
            radius="md"
            onFocus={(e) => {
                setFocused(true);
                onFocus?.(e);
            }}
            onBlur={(e) => {
                setFocused(false);
                onBlur?.(e);
            }}
            mt="md"
            autoComplete="nope"
            data-floating={floating}
            labelProps={{ 'data-floating': floating }}
            {...rest}
        />
    );
}
