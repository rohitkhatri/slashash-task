const Controller = require('./index');

const movieSvc = new (require('../services/movie.service'));

const validators = require('../validators/movie.validator');
const serializers = require('../serializers');

class MovieController extends Controller {
    /**
     * Search for movies based on title
     * @param {import('express').Request} req - Request
     * @param {import('express').Response} res - Response
     * @param {import('express').NextFunction} next - Next
     */
    static async search(req, res, next) {
        try {
            const payload = await Controller.validateSchema(validators.search, req.query);
            const movies = await movieSvc.search(payload['Title']);
            await movieSvc.attachFavorite(movies['data']);
            const serialized = movies.data.map(serializers.movie);
            res.json({
                data: serialized
            });
        } catch (e) {
            Controller.Response().handle_errors(req, res, e);
        }
    }

    /**
     * List favorite
     * @param {import('express').Request} req - Request
     * @param {import('express').Response} res - Response
     * @param {import('express').NextFunction} next - Next
     */
    static async listFavorite(req, res, next) {
        try {
            const count = 20;
            const favorites = await movieSvc.getFavorites(count, req.query['next_page_token']);
            const serialized = favorites.map(f => {
                return serializers.movie({
                    ...f.dataValues,
                    isFavorite: true
                });
            });

            res.json({
                data: serialized,
                next_page_token: serialized.length === count ? favorites[favorites.length - 1].dataValues['createdAt'] : null,
            });
        } catch (e) {
            Controller.Response().handle_errors(req, res, e);
        }
    }

    /**
     * Favorite movie
     * @param {import('express').Request} req - Request
     * @param {import('express').Response} res - Response
     * @param {import('express').NextFunction} next - Next
     */
    static async favoriteToggle(req, res, next) {
        try {
            const movieId = req.params['id'];
            const favorited = await movieSvc.favoriteToggle(movieId);
            res.json({
                favorited: favorited
            });
        } catch (e) {
            Controller.Response().handle_errors(req, res, e);
        }
    }

    /**
     * Remove favorite
     * @param {import('express').Request} req - Request
     * @param {import('express').Response} res - Response
     * @param {import('express').NextFunction} next - Next
     */
    static async removeFavorite(req, res, next) {
        try {
            const movieId = req.params['id'];
            await movieSvc.removeFavoriteById(movieId);
            return Controller.Response().success(res, 'Favorite has been removed');
        } catch (e) {
            Controller.Response().handle_errors(req, res, e);
        }
    }
}

module.exports = MovieController;
