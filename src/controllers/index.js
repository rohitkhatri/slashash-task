const { Response, Validator, helpers } = require('node-express-utility');

class Controller {
    static validateSchema(schema, data, options = {}) {
        return Validator.validate(schema, data, options);
    }

    static Validator() {
        return Validator;
    }

    static Response() {
        return Response;
    }

    static helpers() {
        return helpers;
    }
}

module.exports = Controller;
