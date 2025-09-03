import styles from './AddButton.module.css';
import { IconPlus } from "@tabler/icons-react";
import { Button } from "@mantine/core";

type IAddButton = {
    onClick: VoidFunction;
    visible?: boolean;
    children?: React.ReactNode;
};

const AddButton = ({visible, children, ...rest}: IAddButton) => {

    return (
        <>
            <Button
                {...rest}
                className={styles['addButton']}>
                <IconPlus
                    color={"var(--mantine-color-black)"}
                    size={24}/>
            </Button>
        </>
    );
};

export { AddButton };
