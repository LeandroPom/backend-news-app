const { User } = require('../../db');

module.exports = async () => {
  const users = await User.findAll({
    attributes: { exclude: ['password'] } // ocultar password
  });

  return users;
};
