const { Router } = require('express');
const handlerGetAllTags = require('../handlers/tag/handlerGetAllTags');
const handlerCreateTag = require('../handlers/tag/handlerCreateTag');

const tagRouter = Router();

tagRouter.get('/', handlerGetAllTags);
tagRouter.post('/', handlerCreateTag);

module.exports = tagRouter;
