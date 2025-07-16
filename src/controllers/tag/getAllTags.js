const { Tag } = require('../../db');

module.exports = async () => {
  const tags = await Tag.findAll();
  return tags;
};
