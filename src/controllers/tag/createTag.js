const { Tag } = require('../../db');

module.exports = async (name) => {
  if (!name) throw new Error("El nombre del tag es obligatorio");

  const [tag, created] = await Tag.findOrCreate({ where: { name } });

  if (!created) throw new Error("El tag ya existe");

  return tag;
};
