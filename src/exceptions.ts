/**Common base class for all exceptions*/
class BaseException extends Error {
    constructor(...args) {
        super(...args)
    }
}

/**Common base class for all non-exit exceptions.*/
class Exception extends BaseException {
    constructor(...args) {
        super(...args)
    }
}

/**Inappropriate argument value (of correct type).*/
class ValueError extends Exception {
    constructor(...args) {
        super(...args)
    }
}
