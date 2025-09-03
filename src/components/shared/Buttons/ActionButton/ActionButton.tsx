import {ButtonHTMLAttributes} from 'react';
import styles from './ActionButton.module.css';

type ActionButtonProps = ButtonHTMLAttributes<HTMLButtonElement>&{
    width?: string; // если ты сам добавил width, определи его здесь
};

const ActionButton: React.FC<ActionButtonProps> = ({ width, style, ...rest }) => {
    return (
        <button
            {...rest}
            className={styles['action-button']}
        />
    );
};

export {ActionButton};
