const { DataTypes } = require("sequelize");
const { sequelize } = require('../db');

const Movie = sequelize.define("movies", {
    imdbID: {
        type: DataTypes.STRING(15),
        unique: true,
    },
    Title: {
        type: DataTypes.STRING,
    },
    Year: {
        type: DataTypes.STRING(10),
    },
    Type: {
        type: DataTypes.STRING(10),
    },
    Poster: {
        type: DataTypes.STRING,
    }
});

sequelize.sync().then(() => {
    console.log('movies table created successfully!');
}).catch((error) => {
    console.error('Unable to create table : ', error);
});

module.exports = Movie;
