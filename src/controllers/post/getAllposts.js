const { Op } = require('sequelize');
const { Post, Tag, User, Media } = require('../../db');

module.exports = async ({
  search,
  tags,
  from,
  to,
  order,
  page = 1,
  limit = 10
}) => {
  const where = {};
  const tagFilter = {};
  const include = [
    { model: User, attributes: ['user_id', 'name'] },
    { model: Tag, through: { attributes: [] } },
    { model: Media }
  ];

  // Búsqueda por texto en headline o lead
  if (search) {
    where[Op.or] = [
      { headline: { [Op.iLike]: `%${search}%` } },
      { lead: { [Op.iLike]: `%${search}%` } }
    ];
  }

  // Rango de fechas
  if (from || to) {
    where.createdAt = {};
    if (from) where.createdAt[Op.gte] = new Date(from);
    if (to) where.createdAt[Op.lte] = new Date(to);
  }

  // Filtro por tags
  if (tags) {
    const tagArray = Array.isArray(tags) ? tags : tags.split(',');
    tagFilter.name = { [Op.in]: tagArray };
    include[1].where = tagFilter;
  }

  // Ordenamiento
  let sort = [['createdAt', 'DESC']];
  if (order === 'mostViewed') sort = [['views', 'DESC']];
  else if (order === 'newest') sort = [['createdAt', 'DESC']];

  // Paginación
  const offset = (page - 1) * limit;

  const result = await Post.findAndCountAll({
    where,
    include,
    order: sort,
    offset,
    limit: parseInt(limit),
    distinct: true
  });

  return {
    total: result.count,
    page: parseInt(page),
    posts: result.rows
  };
};
