import styles from './IconButton.module.css';

import { SimpleButton } from '../SimpleButton';
import { ActionIcon } from "@mantine/core";
import React, { FC, SVGProps } from "react";

type IIconButton = React.ButtonHTMLAttributes<HTMLButtonElement> & {
    icon: FC<SVGProps<SVGSVGElement>>;
    iconProps?: any;
    onClick?: VoidFunction;
    disabled?: boolean;
};

const IconButton = ({icon,iconProps, onClick, disabled, ...rest}: IIconButton) => {
    return (
        <SimpleButton className={`${styles['icon-button']} ${styles['resetBg']}`}
                      onClick={onClick} {...rest}>
            <ActionIcon disabled={disabled ?? false} variant="default" className={styles['icon']}>
                        {React.createElement(icon, {...iconProps, style: {width: '24px', height: '24px'}})}
            </ActionIcon>
        </SimpleButton>
    );
};

export { IconButton };
