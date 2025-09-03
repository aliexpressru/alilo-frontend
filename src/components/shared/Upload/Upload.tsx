import { useId, useState } from 'react';
import UploadIcon from '../../../assets/svg/Cloud';
import styles from './Upload.module.css';
import cn from 'classnames/bind';
const cx = cn.bind(styles);

type InputUploadProps = {
	onChange: (file: File) => void;
	fileName?: string;
	children?: React.ReactNode;
	disabled?: boolean;
};

export const InputUpload: React.FC<InputUploadProps> = (props) => {
	const { onChange, children, disabled } = props;
	const id = useId();
	const [_, setFile] = useState<File>();
	const [drop, setDrop] = useState(false);

	// const getFileNameFromUrl = (url: string | undefined) => {
	// 	if (!url) {
	// 		return "";
	// 	}
	// 	return url.substring(url.lastIndexOf('/') + 1);
	// };

	const onDragLeave = (e: React.DragEvent<HTMLElement>) => {
		if (disabled) return;
		e.preventDefault();
		setDrop(false);
	};

	const onDragOver = (e: React.DragEvent<HTMLElement>) => {
		if (disabled) return;
		e.preventDefault();
		setDrop(true);
	};

	const handleDrop = (e: React.DragEvent<HTMLElement>) => {
		if (disabled) return;
		e.preventDefault();
		const droppedFile = e.dataTransfer.files[0];
		setDrop(false);
		setFile(droppedFile);
		onChange(droppedFile);
	};
	const handleFileSelected = (
		event: React.ChangeEvent<HTMLInputElement>
	): void => {
		const file: File | null = event.currentTarget.files![0];
		setFile(file);

		if (file) {
			onChange(file);
		}
	};

	return (
		<div
			className={styles['root']}
			onDrop={handleDrop}
			onDragOver={onDragOver}
			onDragLeave={onDragLeave}
		>
			<label
				htmlFor={id}
				className={cx(styles['upload-label'], drop && styles['drop'])}
			>
				{/* {file || fileName ? (
					<div>{getFileNameFromUrl(fileName)}</div>
				) : (
					<>
						{children}
						<UploadIcon width={'2rem'} height={'2rem'} />
					</>
				)} */}
				<>
					{children}
					<UploadIcon width={'2rem'} height={'2rem'} />
				</>
				<input
					disabled={disabled}
					className={styles['upload-input']}
					type="file"
					onChange={handleFileSelected}
					id={id}
				/>
			</label>
		</div>
	);
};
