import React from 'react';
import { Flex } from '@mantine/core';
import styles from './Tag.module.css';
import cn from 'classnames';

type ITag = {
    text: string;
    children?: React.ReactNode;
};

export const Tag: React.FC<ITag> = ({ text, children }) => {
    const tagStyle = text?.charAt(0) ?? 'z';

    return (
        <Flex
            className={cn(styles['tag'], styles[tagStyle])}
            justify="center"
            align="center"
        >
            {children ?? text}
        </Flex>
    );
};
