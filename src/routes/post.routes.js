const { Router } = require('express');

const createPost = require('../handlers/post/createPostHandler');
const getAllPosts = require('../handlers/post/getAllPostsHandler');
const getByIdPost = require('../handlers/post/handlerGetByIdPost');
const getByNamePost = require('../handlers/post/handlerGetByNamePost');
const editPost = require("../handlers/post/editPostHandler");
const activePost = require("../handlers/post/activePostHandler");
const deletePost = require("../handlers/post/deletePostHandler");


const postRouter = Router();


postRouter.post('/', createPost);
postRouter.get('/', getAllPosts);
postRouter.get('/search', getByNamePost);
postRouter.get('/:id', getByIdPost);
postRouter.put("/:id", editPost);
postRouter.patch("/:id/active", activePost);
postRouter.delete("/:id", deletePost);


module.exports = postRouter;
