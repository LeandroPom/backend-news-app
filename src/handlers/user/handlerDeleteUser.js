const deleteUserPermanent = require('../../controllers/user/deleteUser');

module.exports = async (req, res) => {
  try {
    const { id } = req.params;
    const result = await deleteUserPermanent(id);
    res.status(200).json(result);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};
