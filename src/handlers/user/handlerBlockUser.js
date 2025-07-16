const deleteUser = require('../../controllers/user/blockUser');

module.exports = async (req, res) => {
  try {
    const { id } = req.params;
    const result = await deleteUser(id);
    res.status(200).json(result);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};
