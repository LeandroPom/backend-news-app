const { Router } = require('express');
const votePost = require('../handlers/rating/votePostHandler');


const ratingRouter = Router();

ratingRouter.post('/vote', votePost);

module.exports = ratingRouter;
