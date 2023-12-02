import text from './input.txt';

interface Game {
	id: number;
	possible: boolean;
}

const colorLimits = new Map([
	['red', 12],
	['green', 13],
	['blue', 14],
]);

const arr = text.split('\n').map((string, i) => {
	const id = i + 1;
	const possible = [...colorLimits.keys()].every((color) =>
		checkLimit(string, color, colorLimits.get(color))
	);
	return {
		id,
		possible,
	};
});

function checkLimit(str: string, color: string, limit: number = NaN): boolean {
	const arr = str.match(new RegExp(`\\d+(?=\\s${color})`, 'g'));
	if (!arr) throw new Error('Array is falsy');

	return arr.every((e) => Number(e) <= limit);
}

function countPossible(arr: Game[]) {
	return arr.reduce((sum, add) => (add.possible ? (sum += add.id) : sum), 0);
}

const firstResult = countPossible(arr);
console.log(firstResult);
