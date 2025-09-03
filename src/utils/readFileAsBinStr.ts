export function readFileAsBinString(file: File) {
	return new Promise((resolve, reject) => {
		const reader = new FileReader();
		reader.addEventListener('loadend', (e) => {
			const splitter = ',';
			const str = String(e.target?.result);
			const result = str.substring(
				str.indexOf(splitter) + splitter.length
			);

			resolve(result);
		});
		reader.addEventListener('error', reject);
		reader.readAsDataURL(file);
	});
}
