const { Sequelize } = require('sequelize');
const Log = require('./libraries/log.library');

const sequelize = new Sequelize(
    process.env.DB_NAME,
    process.env.DB_USERNAME,
    process.env.DB_PASSWORD,
    {
        host: process.env.DB_HOST,
        dialect: 'mysql'
    }
);

const connectDB = async () => {
    try {
        await sequelize.authenticate();
        Log.info('Connected to DB');
    } catch (e) {
        Log.error('Error while connecting to DB:', { error: e });
    }
};

module.exports = {
    connectDB,
    sequelize
};