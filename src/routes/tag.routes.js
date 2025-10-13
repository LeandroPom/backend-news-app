const { Router } = require('express');
const CreateTag = require('../handlers/tag/createTagHandler');
const GetAllTags = require('../handlers/tag/getAllTagsHandler');
const editTag = require("../handlers/tag/editTagHandler");
const deleteTag = require("../handlers/tag/deleteTagHandler");

const tagRouter = Router();

tagRouter.post('/', CreateTag);
tagRouter.get('/', GetAllTags);
tagRouter.put("/:id", editTag);
tagRouter.delete("/:id", deleteTag);

module.exports = tagRouter;
