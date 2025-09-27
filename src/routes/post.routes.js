const { Router } = require('express');

const createPost = require('../handlers/post/createPostHandler');
const getAllPosts = require('../handlers/post/getAllPostsHandler');
const getByIdPost = require('../handlers/post/handlerGetByIdPost');
const getByNamePost = require('../handlers/post/handlerGetByNamePost');


const postRouter = Router();


postRouter.post('/', createPost);
postRouter.get('/', getAllPosts);
postRouter.get('/search', getByNamePost);
postRouter.get('/:id', getByIdPost);

module.exports = postRouter;
