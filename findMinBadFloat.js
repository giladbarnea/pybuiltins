function isUnsafe(n, digits) {
	let prev = n;
	for (let i = 10 ** -digits; i < 1; i += 10 ** -digits) {
		if (n + i === prev)
			return true;
		prev = n + i;
	}
	return false;


}

function findMaxSafeFloat(digits, log = false) {
	let n = Number.MAX_SAFE_INTEGER;
	let lastSafe = 0;
	let lastUnsafe = undefined;
	let count = 0;
	while (true) {
		if (count > 1000) {
			console.log(`Something went bad, reached 1000 iterations, force exiting loop`);
			return;
		}
		if (log) {
			console.table({
				'': {
					n,
					'Relative to Number.MAX_SAFE_INTEGER': `(MAX + 1) / ${(Number.MAX_SAFE_INTEGER + 1) / (n + 1)} - 1`,
					lastSafe,
					lastUnsafe,
					'lastUnsafe - lastSafe': lastUnsafe - lastSafe
				}
			});
		}
		if (isUnsafe(n, digits)) {
			lastUnsafe = n;
		} else {
			if (lastSafe + 1 === n) {
				console.log(`\n\nReturning n: ${n}\n\n`);
				return n;
			}
			lastSafe = n;
		}
		n = Math.round((lastSafe + lastUnsafe) / 2);
		count++;

	}
}

console.log(findMaxSafeFloat(1, log = true));

