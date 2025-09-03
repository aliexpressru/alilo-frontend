export function groupBy<K, V>(array: V[], grouper: (item: V) => K) {
	return array.reduce((store, item) => {
		const key = grouper(item);
		if (store.has(key)) {
			store.get(key)?.push(item);
		} else {
			store.set(key, [item]);
		}
		return store;
	}, new Map<K, V[]>());
}

export const groupTags = (tags: string[]) => {
	const groups = [];
	let remainingTags = [...tags]; // Clone the original array to avoid mutation

	// 1. Main Environments Group
	const mainEnvironments = remainingTags.filter((tag) =>
		['prod-z9', 'prod', 'dev', 'stg'].includes(tag)
	);
	if (mainEnvironments.length > 0) {
		groups.push({
			group: 'Main',
			items: mainEnvironments
		});
		// Remove these tags from remainingTags
		remainingTags = remainingTags.filter((tag) =>
			!mainEnvironments.includes(tag)
		);
	}

	// 2. Zone Prefixes Group (prod-z1, prod-z3, etc.)
	const zonePrefixes = remainingTags.filter((tag) =>
		(/^(dev|prod|stg)-z\d+$/).test(tag)
	);
	if (zonePrefixes.length > 0) {
		groups.push({
			group: 'Zone',
			items: zonePrefixes
		});
		remainingTags = remainingTags.filter((tag) =>
			!zonePrefixes.includes(tag)
		);
	}

	// // 3. Numbered Zones Group (prod-z9-1, prod1-1z1, etc.)
	// const numberedZones = remainingTags.filter((tag) =>
	// 	(/^(dev|prod|stg)\d*(-\d+z\d+|\w*-\d+)/).test(tag)
	// );
	// if (numberedZones.length > 0) {
	// 	groups.push({
	// 		group: 'Numbered',
	// 		items: numberedZones
	// 	});
	// 	remainingTags = remainingTags.filter((tag) =>
	// 		!numberedZones.includes(tag)
	// 	);
	// }

	// 4. Other Tags Group (remaining unmatched tags)
	if (remainingTags.length > 0) {
		groups.push({
			group: 'Other',
			items: remainingTags
		});
	}

	return groups;
};
