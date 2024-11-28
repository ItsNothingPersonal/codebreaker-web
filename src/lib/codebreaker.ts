export function solveKeyString(keystring: string, numbers: number[]) {
	const cleanKeyString = keystring.toLowerCase().replaceAll(/[^a-z]/g, '');

	return numbers
		.map((n) => cleanKeyString[n - 1])
		.join('')
		.toLowerCase();
}

export function encodeKeyString(keystring: string, target: string) {
	const cleanKeyString = keystring.toLowerCase().replaceAll(/[^a-z]/g, '');
	const cleanTargetString = target.toLowerCase().replaceAll(/[^a-z]/g, '');

	const numbersList: number[] = [];

	for (const s of cleanTargetString) {
		numbersList.push(cleanKeyString.indexOf(s) + 1);
	}

	return numbersList;
}
