import React, { SVGProps } from 'react';

export interface TagProps {
    /**
     * Добавляет дополнительный HTML атрибут class
     */
    className?: string;

    /**
     * Размер тега
     */
    size?: 'xs' | 's';

    /**
     * Цвет тега
     */
    color?: 'default' | 'purple' | 'orange' | 'green' | 'black' | 'pink' | 'lightgreen' | 'yellow' | 'brand';

    /**
     * Курсивный текст
     */
    italic?: boolean;

    /**
     * Текст тега
     */
    text?: string;

    /**
     * Иконка
     */
    icon?: React.FC<SVGProps<SVGSVGElement>>;

    /**
     * Назначить цвет фона вручную
     */
    backgroundColor?: string;

    /**
     * Назначить цвет текста вручную
     */
    textColor?: string;

    /**
     * Круглый или стандартный
     */
    circle?: boolean;
}
