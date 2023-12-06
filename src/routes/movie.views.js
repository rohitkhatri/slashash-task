const express = require('express');
const router = express.Router();

const { route } = require('../middlewares');

router.get(
    '/search',
    route({ routeName: 'movie.view.search' }),
    (_req, res, _next) => {
        res.render('movies/search', {
            title: 'Movie Search',
            jsFile: 'search_movies.js'
        });
    }
);

router.get(
    '/favorites',
    route({ routeName: 'movie.view.favorites' }),
    (_req, res, _next) => {
        res.render('movies/favorites', {
            title: 'Favorite Movies',
            jsFile: 'favorite_movies.js'
        });
    }
);

module.exports = router;
