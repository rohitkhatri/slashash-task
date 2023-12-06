const { validateEnv } = require('node-express-utility');

module.exports = function () {
    validateEnv({
        // Common
        NODE_ENV: {
            required: true,
            allowed_values: ['production', 'development', 'local', 'test']
        },
        SERVICE_NAME: {
            required: true,
        },

        // Database
        DB_HOST: {
            required: true,
        },
        DB_PORT: {
            required: true,
        },
        DB_USERNAME: {
            required: true,
        },
        DB_PASSWORD: {
            required: true,
        },
        DB_NAME: {
            required: true,
        },

        // OMDB API
        OMDB_API_KEY: {
            required: true,
        }
    });
};
