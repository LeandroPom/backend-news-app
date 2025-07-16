const { Router } = require('express');
const handlerVotePost = require('../handlers/rating/handlerVotePost');


const ratingRouter = Router();

ratingRouter.post('/:postId', handlerVotePost);

module.exports = ratingRouter;
