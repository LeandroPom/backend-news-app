const { Router } = require('express');
const postRouter = Router();

const getAllPosts = require('../handlers/handlerPost/handlerGetAllPost');
const createPost = require('../handlers/handlerPost/handlerCreatePost');
const updatePost = require('../handlers/handlerPost/handlerUpdatePost');
const deletePost = require('../handlers/handlerPost/handlerDeletePost');
const votePost = require('../handlers/handlerPost/handlerVotePost')



postRouter.get('/', getAllPosts);
postRouter.post('/', createPost);
postRouter.put('/:id', updatePost);
postRouter.delete('/:id', deletePost);
postRouter.post('/:id/rating', votePost);

module.exports = postRouter;
