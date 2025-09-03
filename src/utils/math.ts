export function average(nums: number[]) {
	if (nums.length === 0) {
		return 0;
	}
	return Math.ceil(
		nums.reduce((a: number, b: number) => a + b) / nums.length
	);
}

export function sum(nums: number[]) {
	if (nums.length === 0) {
		return 0;
	}
	return nums.reduce((a: number, b: number) => a + b);
}

export function percentile(arr: number[], p: number): number {
	if (arr.length === 0) return 0;
	if (p <= 0) return -1;
	if (p >= 1) return arr[arr.length - 1];

	// Сортировка массива
	arr = arr.slice().sort((a, b) => a - b);

	const index = (arr.length - 1) * p;
	const lower = Math.floor(index);
	const upper = lower + 1;
	const weight = index % 1;

	// Проверка на границы
	if (upper >= arr.length) return arr[lower];

	// Линейная интерполяция
	return arr[lower] * (1 - weight) + arr[upper] * weight;
}

export function roundSmart(num: number): number {
	if (num >= 1) {
		// Если число больше или равно 1, округляем вверх до целого
		return Math.ceil(num);
	} else if (num > 0) {
		// Если число больше 0, но меньше 1, округляем до первого значащего знака
		const decimalPlaces = Math.abs(Math.floor(Math.log10(num)));
		const factor = 10 ** decimalPlaces;
		return Math.ceil(num * factor) / factor;
	} else {
		// Если число меньше или равно 0, просто возвращаем его (предполагаем, что оно неотрицательное)
		return num;
	}
}
