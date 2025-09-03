export function sortByKey<T>(key: keyof T & string) {
	return (a: T, b: T) =>
		(a[key] as unknown as string).localeCompare(
			b[key] as unknown as string
		);
}
