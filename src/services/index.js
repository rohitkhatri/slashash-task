const { Response, helpers, Validator } = require('node-express-utility');

class Service {
    Response() {
        return Response;
    }

    helpers() {
        return helpers;
    }

    Validator() {
        return Validator;
    }

    validateSchema(schema, data, options = {}) {
        return Validator.validate(schema, data, options);
    }
}

module.exports = Service;
