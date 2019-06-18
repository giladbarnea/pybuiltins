const clone = (func => obj => {
    func.prototype = obj;
    return new func;
})(function () {
});

function extend(A, B) {
    A.prototype = clone(B.prototype);
    A.prototype.constructor = A;
    return A;
}

let Person = function (first, last) {
    this.firstName = first;
    this.lastName = last;
};

Person.prototype.getFullName = function () {
    return this.firstName + ' ' + this.lastName;
};

const p1 = new Person('FN_1', 'LN_1');

function onPersonCreate() {
    console.log('Person called ' + this.getFullName() + ' created.');
}

Person = (Person => extend(function () {
    Person.apply(this, arguments);
    onPersonCreate.call(this);
}, Person))(Person);

const p2 = new Person('FN_2', 'LN_2');
