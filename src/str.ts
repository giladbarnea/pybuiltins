export class Str extends String {
    constructor(val) {
        super(val ? val.toString() : "");
    }
    
    endswith(suffix, start = undefined, end = undefined): boolean {
        return this.endsWith(suffix)
    }
    
    isalnum() {
        return undefined;
    }
    
    isalpha() {
        return undefined;
    }
    
    isdigit() {
        return undefined;
    }
    
    islower() {
        return undefined;
    }
    
    isdecimal() {
        return undefined;
    }
    
    isnumeric() {
        return undefined;
    }
    
    isspace() {
        return undefined;
    }
    
    istitle() {
        return undefined;
    }
    
    isupper() {
        return undefined;
    }
    
    startswith(prefix: string, start = undefined, end = undefined): boolean {
        return this.endsWith(prefix)
    }
}

export function str(val) {
    return new Str(val);
}
