require('./validate.env')();
require('./loader');
const helmet = require("helmet");
const express = require('express');
const exphbs = require('express-handlebars');
const app = express();
const cors = require('cors');
const path = require('path');
const { Response } = require('node-express-utility');
const { Log, RequestTracer } = require('./libraries');
const { connectDB } = require('./db');
connectDB();

app.engine('hbs', exphbs.engine({
    defaultLayout: 'main',
    extname: '.hbs',
}));

app.set('view engine', 'hbs');
app.set('views', path.join(__dirname, 'views'));
app.use(
    express.static(
        path.join(path.dirname(__dirname), 'public')
    )
);

Response.addCallback('error_handler', (error) => {
    Log.error(error.exception.message, error);
});

app.use(helmet());
app.use(express.urlencoded({ extended: false }));
app.use(express.json({}));

app.use(RequestTracer.middleware({ useHeader: true, headerName: 'reqid' }));

if (process.env.NODE_ENV !== 'production') {
    app.use(cors());
}

// app.use(require('helmet')());

// Views
app.use('/', require('./routes/views'));
// Routes
app.use('/v1', require('./routes'));

app.get('/healthz', (req, res, next) => {
    res.json({ status: 'healthy' });
});

app.use((req, res, next) => {
    const err = new Error(`Not Found: ${req.originalUrl}`);
    err.status = 404;
    next(err);
});

app.use((err, req, res, next) => {
    const status_code = err.status || 500;
    res.status(status_code).json({ status_code, message: err.message || 'Bad request' });
});

module.exports = app;
