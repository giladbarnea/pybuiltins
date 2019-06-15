export function bool(val: any): boolean {
    /*
    |               | o instanceof Object   | typeof o == 'object'  |  !!o  |
    |  -----------  |  ------------------   |  -------------------  | ----- |
    |  {}           |         true          |         true          | true  |
    |  []           |         true          |         true          | true  |
    |  ()=>{}       |         true          |         false         | true  |
    |  new class{}  |         true          |         true          | true  |
    |  (()=>{})()   |         false         |         false         | false |
    |  0            |         false         |         false         | false |
    |  ""           |         false         |         false         | false |
    |  null         |         false         |         true          | false |
    |  undefined    |         false         |         false         | false |
    |  "0"          |         false         |         false         | true  |
    |  "foo"        |         false         |         false         | true  |
    */
    
    if (val == null)
        return false;
    const valType = typeof val;
    console.log({valType});
    if (valType != 'object') {
        if (valType == 'function')
            return true;
        else
            return !!val;
    }
    return Object.keys(val).length != 0;
    
}
