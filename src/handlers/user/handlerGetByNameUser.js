// handlers/user/handlerGetByNameUser.js
const getByNameUser = require("../../controllers/user/getByNameUser");

module.exports = async (req, res) => {
  const { name } = req.query;

  try {
    if (!name) {
      return res.status(400).json({ error: "Debe proporcionar un nombre para buscar" });
    }

    const users = await getByNameUser(name);
    return res.status(200).json(users);
  } catch (error) {
    return res.status(404).json({ error: error.message });
  }
};
