/**Common base class for all exceptions*/
export class BaseException extends Error {
    constructor(...args) {
        super(...args)
    }
}

/**Common base class for all non-exit exceptions.*/
export class Exception extends BaseException {
    constructor(...args) {
        super(...args)
    }
}

/**Inappropriate argument value (of correct type).*/
export class ValueError extends Exception {
    constructor(...args) {
        super(...args)
    }
}
