const express = require('express');
const router = express.Router();

const { route } = require('../middlewares');
const Controller = require('../controllers/movie.controller');

router.get(
    '/search',
    route({ routeName: 'movie.search' }),
    Controller.search
);

router.post(
    '/:id/favorite/toggle',
    route({ routeName: 'movie.favorite.toggle' }),
    Controller.favoriteToggle
);

router.get(
    '/favorites',
    route({ routeName: 'movie.favorite.list' }),
    Controller.listFavorite
);

router.delete(
    '/favorites/:id',
    route({ routeName: 'movie.favorite.delete' }),
    Controller.removeFavorite
);

// router.get(
//     '/:id',
//     route({ routeName: 'movie.detail' }),
//     Controller.detail
// );

// router.patch(
//     '/:id',
//     route({ routeName: 'movie.update' }),
//     Controller.update
// );

module.exports = router;
