const Service = require('./db.service');
const { Op } = require('sequelize');

const { OMDBLib } = require('../libraries');

const Movie = require('../models/movie.model');

class MovieService extends Service {
    constructor() {
        super(Movie);
    }

    async getFavorites(limit = 20, nextPageToken = null) {
        const where = {};

        if (nextPageToken) {
            where['createdAt'] = { [Op.lt]: nextPageToken };
        }

        return this.model.findAll({
            where: where,
            order: [['createdAt', 'DESC']],
            limit: limit
        });
    }

    async favoriteToggle(movieId) {
        const findOptions = { where: { imdbID: movieId } };
        const alreadyFavorited = await this.model.findOne(findOptions);

        if (alreadyFavorited) {
            await this.model.destroy(findOptions);
            return false;
        } else {
            const movie = await OMDBLib.getById(movieId);

            if (!movie) {
                throw this.Response().error_not_found(null, `Movie with ID '${movieId}' is not found!`);
            }

            await this.create(movie);
        }

        return true;
    }

    async removeFavoriteById(movieId) {
        return this.model.destroy({
            where: {
                imdbID: movieId
            }
        });
    }

    async search(query) {
        return OMDBLib.search(query);
    }

    /**
     * Attach favorite status to movies
     * 
     * @param {object[]} movies - Movies
     */
    async attachFavorite(movies) {
        const ids = movies.map(m => m['imdbID']);
        const favorites = await this.model.findAll({
            attributes: ['imdbID'],
            where: { imdbID: { [Op.in]: ids } }
        });
        const favoritesByID = {};

        for (const favorite of favorites) {
            const imdbID = favorite.dataValues['imdbID'];
            favoritesByID[imdbID] = true;
        }

        for (const movie of movies) {
            movie['isFavorite'] = !!favoritesByID[movie['imdbID']];
        }
    }

    async create({
        imdbID,
        Title,
        Year,
        Type,
        Poster
    }) {
        return this.model.create({
            imdbID,
            Title,
            Year,
            Type,
            Poster
        })
    }
}

module.exports = MovieService;
