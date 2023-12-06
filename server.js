require('dotenv').config();
const http = require('http');
const app = require('./src/app');
const Log = require('./src/libraries/log.library');

const port = process.env.PORT || 3000;
const server = http.createServer(app);

server.listen(port);
Log.info(`Listening on port: ${port}`);
