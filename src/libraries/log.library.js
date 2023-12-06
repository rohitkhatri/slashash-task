const winston = require('winston');
const RequestTracer = require('./request_tracer.library');

class Logger {
    constructor() {
        const formats = {
            json: winston.format.combine(
                winston.format.timestamp(),
                winston.format.json()
            ),
        };
        const config = {
            default_logger: {
                levels: winston.config.syslog.levels,
                level: 'debug',
                defaultMeta: { service: process.env.SERVICE_NAME },
                format: formats.json,
                transports: [],
            },
            transports: {
                console: new winston.transports.Console(),
                devConsole: new winston.transports.Console({
                    format: winston.format.combine(
                        winston.format.metadata(),
                        winston.format.timestamp(),
                        winston.format.colorize(),
                        winston.format.align(),
                        winston.format.printf(
                            info => `${info.timestamp} [${info.level}] : ${info.message}${info.metadata && Object.keys(info.metadata).length > 0 ? ' - ' + JSON.stringify(info.metadata) : ''}`
                        )
                    ),
                })
            }
        };

        this.loggers = {
            app: winston.createLogger({
                ...config.default_logger
            }),
            console: winston.createLogger({
                ...config.default_logger,
                transports: [config.transports.devConsole]
            }),
        };

        this.default = 'app';

        if (process.env.DEBUG === 'true') {
            this.loggers.app.add(config.transports.devConsole);
        } else {
            this.loggers.app.add(config.transports.console);
        }
    }

    setDefaultLogger(logger) {
        this.default = logger;
    }

    /**
     * Log
     * @param {String} level - Log level
     * @param {String} message - Message
     * @param {Object} meta - Meta
     * @param {String=} logger - Logger
     * @returns {winston.Logger} - Returns winston object
     */
    log(level, message, meta, logger) {
        const reqId = RequestTracer.getID();

        if (reqId && (!meta || !meta['reqId'])) {
            if (!meta) {
                meta = {};
            }

            meta['reqId'] = reqId;
        }

        return this.getLogger(logger).log(level, message, meta);
    }

    /**
     * Log emerg message
     * @param {String} message - Message
     * @param {Object} meta - Meta
     * @param {String=} logger - Logger
     * @returns {winston.Logger} - Returns winston object
     */
    emerg(message, meta, logger) {
        return this.log('emerg', message, meta, logger);
    }

    /**
     * Log alert message
     * @param {String} message - Message
     * @param {Object} meta - Meta
     * @param {String=} logger - Logger
     * @returns {winston.Logger} - Returns winston object
     */
    alert(message, meta, logger) {
        return this.log('alert', message, meta, logger);
    }

    /**
     * Log crit message
     * @param {String} message - Message
     * @param {Object} meta - Meta
     * @param {String=} logger - Logger
     * @returns {winston.Logger} - Returns winston object
     */
    crit(message, meta, logger) {
        return this.log('crit', message, meta, logger);
    }

    /**
     * Log error message
     * @param {String} message - Message
     * @param {Object} meta - Meta
     * @param {String=} logger - Logger
     * @returns {winston.Logger} - Returns winston object
     */
    error(message, meta, logger) {
        if (meta && meta.error && meta.error.stack) {
            message += `\n${meta.error.stack}`;
        } else if (meta && meta.exception && meta.exception.stack) {
            message += `\n${meta.exception.stack}`;
        }

        return this.log('error', message, meta, logger);
    }

    /**
     * Log warning message
     * @param {String} message - Message
     * @param {Object} meta - Meta
     * @param {String=} logger - Logger
     * @returns {winston.Logger} - Returns winston object
     */
    warn(message, meta, logger) {
        return this.log('warn', message, meta, logger);
    }

    /**
     * Log notice message
     * @param {String} message - Message
     * @param {Object} meta - Meta
     * @param {String=} logger - Logger
     * @returns {winston.Logger} - Returns winston object
     */
    notice(message, meta, logger) {
        return this.log('notice', message, meta, logger);
    }

    /**
     * Log info message
     * @param {String} message - Message
     * @param {Object} meta - Meta
     * @param {String=} logger - Logger
     * @returns {winston.Logger} - Returns winston object
     */
    info(message, meta, logger) {
        return this.log('info', message, meta, logger);
    }

    /**
     * Log debug message
     * @param {String} message - Message
     * @param {Object} meta - Meta
     * @param {String=} logger - Logger
     * @returns {winston.Logger} - Returns winston object
     */
    debug(message, meta, logger) {
        return this.log('debug', message, meta, logger);
    }

    // Helpers
    request(req) {
        this.info(`${req.method} - ${req.originalUrl}`, {
            method: req.method,
            route: req.originalUrl,
            tags: 'http',
            additionalInfo: { body: req.body, headers: req.headers }
        });
    }

    /**
     * Get logger
     * @param {String=} logger - Logger
     * @returns {winston.Logger} - Winston Logger
     */
    getLogger(logger) {
        if (!logger) {
            return this.loggers[this.default];
        }

        return this.loggers[logger];
    }
}

module.exports = new Logger();
