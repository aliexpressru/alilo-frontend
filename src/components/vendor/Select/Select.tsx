import {
    SelectProps,
    Select as SelectMantine,
} from '@mantine/core';
import classes from './Select.module.css';
import { useState } from 'react';

export function Select(
    {
        onFocus,
        onBlur,
        ...rest
    }: SelectProps
) {
    const [focused, setFocused] = useState(false);

    const floating =
        String(rest.value).trim().length !== 0
        || focused
        // eslint-disable-next-line no-undefined
        || undefined;

    return (
        <>
            <SelectMantine
                size="xl"
                radius="md"
                labelProps={{ 'data-floating': floating }}
                classNames={{
                    root: classes['root'],
                    input: classes['input'],
                    label: classes['label'],
                    option: classes['option'],
                    dropdown: classes['dropdown']
                }}
                onFocus={(e) => {
                    setFocused(true);
                    onFocus?.(e);
                }}
                onBlur={(e) => {
                    setFocused(false);
                    onBlur?.(e);
                }}
                {...rest}
            />
        </>
    );
}
