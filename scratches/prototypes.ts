const clone = function (func) {
    // func.prototype.getFullName()
    // func.prototype.constructor is Person(first, last)
    console.log({func});
    return function (obj) {
        console.log({obj});
        func.prototype = obj;
        return new func;
    };
}(function () {
});

function extend(A, B) {
    A.prototype = clone(B.prototype);
    A.prototype.constructor = A;
    return A;
}

function Person(first, last) {
    this.firstName = first;
    this.lastName = last;
}

Person.prototype.getFullName = function () {
    return this.firstName + ' ' + this.lastName;
};

const p1 = new Person('FN_1', 'LN_1');
console.log({p1});

function onPersonCreate() {
    console.log('Person called ' + this.getFullName() + ' created.');
}

Person = function (Person) {
    // Person is Person(first, last)
    console.log({Person});
    return extend(function () {
        Person.apply(this, arguments);
        onPersonCreate.call(this);
    }, Person);
}(Person);

const p2 = new Person('FN_2', 'LN_2');
console.log({p2});
