// handlers/user/handlerGetByIdUser.js
const getByIdUser = require("../../controllers/user/getByIdUser");

module.exports = async (req, res) => {
  const { id } = req.params;

  try {
    const user = await getByIdUser(id);
    return res.status(200).json(user);
  } catch (error) {
    return res.status(404).json({ error: error.message });
  }
};
