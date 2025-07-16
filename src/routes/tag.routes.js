const { Router } = require('express');
const handlerGetAllTags = require('../handlers/tags/handlerGetAllTags');
const handlerCreateTag = require('../handlers/tags/handlerCreateTag');

const tagRouter = Router();

tagRouter.get('/', handlerGetAllTags);
tagRouter.post('/', handlerCreateTag);

module.exports = tagRouter;
