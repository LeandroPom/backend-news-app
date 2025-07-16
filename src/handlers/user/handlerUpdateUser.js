const updateUser = require('../../controllers/user/updateUser');

module.exports = async (req, res) => {
  try {
    const { id } = req.params;
    const updated = await updateUser(id, req.body);
    res.status(200).json(updated);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};
