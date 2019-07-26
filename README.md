# pythonlang
## Description
`pythonlang`'s intention is to import all [Python 3 Built-In Functions](https://docs.python.org/3/library/functions.html) to Javascript, while keeping the performance hit to a minimum.

## Motivation
1. Javascript is rife with [facepalm inducing quirks](https://github.com/denysdovhan/wtfjs) and unexpected behaviors
2. Python is fun; Its built-ins are reliable, simple and consistent
3. Therefore, translating Python's built-ins into JS will reduce the amount of facepalms and make things better overall

## Rigorousness
- A given built-in is considered complete only if *all* of its [tests from CPython source](https://github.com/python/cpython/tree/master/Lib/test) are translated to JS and passed.
- The implementation in JS is kept as similar as possible to the [source implementation of Python in C](https://github.com/python/cpython/tree/master/Objects).

## Progress

| Built-in | Tests written | % Tests passed |                   Status                   |
|:--------:|:-------------:|:--------------:|:------------------------------------------:|
|   int    |      603      |      100%      | <span style="color: #0f9d40">Stable</span> |
|   bool   |       3       |      100%      | <span style="color: #0f9d40">Incomplete, stable</span> |

## Known Issues
- Strict equality doesn't work yet, eg:
  ```js
  int(3) == 3
  >>> true
  
  int(3) === 3
  >>> false
  ```
- No bundling tools

## FAQ
**Q**: Are you really going to implement *all* 69 built-ins?<br>
**A**: Probably not. Some of them can't be implemented anyway (like [classmethod](https://docs.python.org/3/library/functions.html#classmethod)), and some of them are rarely used and are too complex to justify including them (like [memoryview](https://docs.python.org/3/library/functions.html#func-memoryview))

## Contact and Contributing
PM me at giladbrn@gmail.com if you have any questions, ideas as to what behaviors you would like to see, etc.<br>
You're welcome to submit PRs at https://github.com/giladbarnea/pythonlang.
