const { Router } = require('express');
const votePost = require('../handlers/rating/votePostHandler');
const addView = require('../handlers/rating/addViewHandler');


const ratingRouter = Router();

ratingRouter.post('/vote', votePost);
ratingRouter.post('/view', addView);

module.exports = ratingRouter;
