To a precision of 1 decimal digits, the maximum number you can work with is `562949953421311`.
-
To a precision of 2 decimal digits, it's `70368744177663`.
Interestingly, the first number is equal to:
```js
(Number.MAX_SAFE_INTEGER + 1) / 16 - 1
```
And the second number is equal to:
```js
(Number.MAX_SAFE_INTEGER + 1) / 128 - 1
```
**What we're looking for**, is the maximum safe number to support a precision of `d` digits after the decimal point.
By "support" I mean "can reliably do basic arithmetic". 

For example, we know that `Number.MAX_SAFE_INTEGER (aka 2**53-1)` is *not* safe, because basic arithmetic is broken:

```js
Number.MAX_SAFE_INTEGER - 0.1 === Number.MAX_SAFE_INTEGER
>>> true // unsafe
```

And we know that 0 *is* safe, since:
```js
0 + 0.1 === 0
>>> false // safe
```

BTW, `0` is reliable as far as `1e-323` (including):
```js
0 + 1e-323 === 0
>>> false // safe

0 + 1e-324 === 0
>>> true // unsafe
```

I binary-searched between 0 and `Number.MAX_SAFE_INTEGER` for the biggest number that answers that definition, and came up with these numbers.

**Here's the code**:

<!-- begin snippet: js hide: false console: true babel: false -->

<!-- language: lang-js -->

/**Returns whether basic arithmetic breaks between n and n+1, to a precision of `digits` after the decimal point*/
function isUnsafe(n, digits) {
    // digits = 1 loops 10 times with 0.1 increases.
    // digits = 2 means 100 steps of 0.01, and so on.
    let prev = n;
    for (let i = 10 ** -digits; i < 1; i += 10 ** -digits) {
    if (n + i === prev) { // eg 10.2 === 10.1
        return true;
    }
    prev = n + i;
    }
    return false;


}

/**Binary search between 0 and Number.MAX_SAFE_INTEGER (2**53 - 1) for the biggest number that is safe to the `digits` level of precision.
digits=9 took ~30s, I wouldn't pass anything bigger.*/
function findMaxSafeFloat(digits, log = false) {
    let n = Number.MAX_SAFE_INTEGER;
    let lastSafe = 0;
    let lastUnsafe = undefined;
    while (true) {
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
    } else { // safe
        if (lastSafe + 1 === n) { // Closed in as far as possible
        console.log(`\n\nMax safe number to a precision of ${digits} digits after the decimal point: ${n}\t((MAX + 1) / ${(Number.MAX_SAFE_INTEGER + 1) / (n + 1)} - 1)\n\n`);
        return n;
        } else {
        lastSafe = n;
        }
    }
    n = Math.round((lastSafe + lastUnsafe) / 2);
    }
}

console.log(findMaxSafeFloat(1));

<!-- end snippet -->


**An interesting thing I've found** by lining up the safe numbers, is that the exponents don't step up in a consistent manner.
Look at the table below; once in a while, the exponent increases (or decreases) by 4, and not 3. Not sure why.

<pre>
| Precision | First UNsafe                | 2^53/x                   |
|-----------|-----------------------------|--------------------------|
| 1         | 5,629,499,534,21,312 = 2^49 | x = 16 = 2^4             |
| 2         | 703,687,441,77,664 = 2^46   | x = 128 = 2^7            |
| 3         | 87,960,930,22,208 = 2^43    | x = 1,024 = 2^10         |
| 4         | 5,497,558,13,888 = 2^39     | x = 16,384 = 2^14        |
| 5         | 68,719,476,736 = 2^36       | x = 131,072 = 2^17       |
| 6         | 8,589,934,592 = 2^33        | x = 1,048,576 = 2^20     |
| 7         | 536,870,912 = 2^29          | x = 16,777,216 = 2^24    |
| 8         | 67,108,864 = 2^26           | x = 134,217,728 = 2^27   |
| 9         | 8,388,608 = 2^23            | x = 1,073,741,824 = 2^30 |
</pre>
