const { Response, middlewares } = require('node-express-utility');
const Log = require('./libraries/log.library');

const { Validator } = require('node-express-utility');
Validator.setRegex('password', {
    regex: /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}$/,
    message: 'Password should be at least 8 characters and must contain 1 number, 1 uppercase and 1 lowercase'
});

Response.addCallback('error_handler', (error) => {
    Log.error(error.exception.message, error);
});

middlewares.registerRouteCallback((req) => {
    Log.request(req);
});
