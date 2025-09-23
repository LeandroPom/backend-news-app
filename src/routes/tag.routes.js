const { Router } = require('express');
const CreateTag = require('../controllers/tag/createTag');
const GetAllTags = require('../controllers/tag/getAllTags');

const tagRouter = Router();

tagRouter.post('/', CreateTag);
tagRouter.get('/', GetAllTags);

module.exports = tagRouter;
