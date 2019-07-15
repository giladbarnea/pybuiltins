| exp             | python          | javascript |
|-----------------|-----------------|------------|
| int('0711')     | 711             | 711        |
| int('0b11')     | invalid literal | 0          |
| int('0o11')     | invalid literal | 0          |
| int('0x11')     | invalid literal | 17         |
| int('0c11')     | invalid literal | 0          |
| int('11')       | 11              | 11         |
|                 |                 |            |
| int('0711', 0)  | invalid literal | 711        |
| int('0b11', 0)  | 3               | 0          |
| int('0o11', 0)  | 9               | 0          |
| int('0x11', 0)  | 17              | 17         |
| int('0c11', 0)  | invalid literal | 0          |
| int('11', 0)    | 11              | 11         |
|                 |                 |            |
| int('0711', 2)  | invalid literal | 0          |
| int('0b11', 2)  | 3               | 0          |
| int('0o11', 2)  | invalid literal | 0          |
| int('0x11', 2)  | invalid literal | 0          |
| int('0c11', 2)  | invalid literal | 0          |
| int('11', 2)    | 3               | 3          |
|                 |                 |            |
| int('0712', 2)  | invalid literal | 0          |
| int('0b12', 2)  | invalid literal | 0          |
| int('0o12', 2)  | invalid literal | 0          |
| int('0x12', 2)  | invalid literal | 0          |
| int('0c12', 2)  | invalid literal | 0          |
| int('12', 2)    | invalid literal | 1          |
|                 |                 |            |
| int('0711', 8)  | 457             | 457        |
| int('0b11', 12) | 1597            | 1597       |
| int('0o11', 8)  | 9               | 0          |
| int('0x11', 16) | 17              | 17         |
| int('0c11', 13) | 2042            | 2042       |
| int('11', ?)    | ok              | ok         |
|                 |                 |            |
| int('0711', 36) | 9109            | 9109       |
| int('0b11', 36) | 14293           | 14293      |
| int('0o11', 36) | 31141           | 31141      |
| int('0x11', 36) | 42805           | 42805      |
| int('0c11', 36) | 15589           | 15589      |
| int('11', 36)   | 37              | 37         |
