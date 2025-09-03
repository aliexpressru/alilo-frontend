import { Select } from '@mantine/core';
import { HttpMethodType } from '../../../types/ScriptTypes';
import styles from './SelectHttpMethod.module.css';
import cn from 'classnames/bind';

const cx = cn.bind(styles);

type SelectHttpMethodProps = {
	onChange: (value: HttpMethodType | null) => void;
	value: HttpMethodType;
};

const methods: HttpMethodType[] = ['post', 'get'];

export const SelectHttpMethod: React.FC<SelectHttpMethodProps> = ({ onChange, value }) => {
	const data = methods.map((method) => ({
		label: method.toUpperCase(),
		value: method,
	}));

	const getColorByMethod = (methodValue: string) => {
		switch (methodValue.toLowerCase()) {
			case 'get':
				return styles['http-select-get'];
			case 'post':
				return styles['http-select-post'];
			default:
				return styles['http-select-get'];
		}
	};

	return (
		<Select
			classNames={{
				root: cx(styles['http-select'], getColorByMethod(value)),
			}}
			data={data}
			value={value}
			onChange={(val) => onChange(val as HttpMethodType)}
			clearable={false}
			w={120} // width="xs" ≈ 120px in Mantine
		/>
	);
};
