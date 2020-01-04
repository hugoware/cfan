export function getPlace(num: number): string {
	let str = num.toString(); // ex: 476 --> "476"
	str = str.substr(str.length - 2); // "1872" -> "72"

	return str;
}

test(1);
test(2);
test(11);
test(145);
test(1987);

function test(num: number) {
	console.log(getPlace(num));
}
