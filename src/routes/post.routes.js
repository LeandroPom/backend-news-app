const { Router } = require('express');
const postRouter = Router();

const getAllPosts = require('../handlers/post/handlerGetAllPost');
const createPost = require('../handlers/post/handlerCreatePost');
const updatePost = require('../handlers/post/handlerUpdatePost');
const deletePost = require('../handlers/post/handlerDeletePost');
const votePost = require('../handlers/post/handlerVotePost')
const handlerGetPopularPosts = require('../handlers/post/handlerGetPopularPosts');




postRouter.get('/', getAllPosts);
postRouter.post('/', createPost);
postRouter.put('/:id', updatePost);
postRouter.delete('/:id', deletePost);
postRouter.post('/:id/rating', votePost);
postRouter.get('/popular', handlerGetPopularPosts);

module.exports = postRouter;
