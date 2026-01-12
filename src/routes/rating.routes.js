// routes/ratingRoutes.js
const { Router } = require('express');
const votePost = require('../handlers/rating/votePostHandler');
const addView = require('../handlers/rating/addViewHandler');
const markAsFavorite = require('../handlers/rating/markAsFavoriteHandler');
const getUserFavorites = require('../handlers/rating/getUserFavoritesHandler');
const getUsersWhoFavorited = require('../handlers/rating/getUsersWhoFavoritedHandler');


const ratingRouter = Router();

ratingRouter.post('/vote', votePost);
ratingRouter.post('/view', addView);

ratingRouter.post('/favorite', markAsFavorite);
ratingRouter.get('/user/:user_id/favorites', getUserFavorites);
ratingRouter.get('/post/:post_id/favorited', getUsersWhoFavorited);

module.exports = ratingRouter;
