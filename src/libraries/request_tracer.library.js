const httpContext = require('cls-rtracer');

class RequestTracerLibrary {
    static context = httpContext;

    /**
     * Initiate Tracker
     * @param {Function(...args: any[])} callback - Callback
     * @param {Object} options - Options
     * @param {String} options.reqId - Request ID
     * @returns {void} - void
     */
    static initiate(callback, options = {}) {
        // return httpContext.ns.run(callback);
        return httpContext.runWithId(callback, options.reqId);
    }

    /**
     * Middleware
     * @param {httpContext.IOptions} options - Options
     * @returns {middleware}
     * @function middleware
     * @param {import('express').Request} req - Express Request Object
     * @param {import('express').Response} res - Express Response Object
     * @param {import('express').NextFunction} next - Express Next Function
     */
    static middleware(options = {}) {
        return (req, res, next) => {
            return httpContext.expressMiddleware(options)(req, res, next);
        }
    }

    /**
     * Get value for the key
     * @param {String} key - Key
     * @returns {any} - any
     */
    static get(key) {
        // return httpContext.get(key);
    }

    /**
     * Set value for the key
     * @param {String} key - Key
     * @param {any} value - Value
     * @returns {void} - void
     */
    static set(key, value) {
        // return httpContext.set(key, value);
    }

    static getID() {
        return httpContext.id();
    }

    static setID(id) {
        return this.set('reqId', id);
    }
}

module.exports = RequestTracerLibrary;
