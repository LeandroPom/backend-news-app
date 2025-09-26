const { Router } = require('express');
const CreateTag = require('../handlers/tag/createTag');
const GetAllTags = require('../handlers/tag/getAllTags');

const tagRouter = Router();

tagRouter.post('/', CreateTag);
tagRouter.get('/', GetAllTags);

module.exports = tagRouter;
