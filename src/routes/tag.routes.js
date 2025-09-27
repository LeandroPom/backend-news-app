const { Router } = require('express');
const CreateTag = require('../handlers/tag/createTagHandler');
const GetAllTags = require('../handlers/tag/getAllTagsHandler');

const tagRouter = Router();

tagRouter.post('/', CreateTag);
tagRouter.get('/', GetAllTags);

module.exports = tagRouter;
