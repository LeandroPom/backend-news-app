const { Router } = require('express');

const createPost = require('../controllers/post/createPost');
const getAllPosts = require('../controllers/post/getAllPost');


const postRouter = Router();


postRouter.post('/', createPost);
postRouter.get('/', getAllPosts);

module.exports = postRouter;
