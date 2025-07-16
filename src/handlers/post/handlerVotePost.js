const votePost = require('../../controllers/post/votePost');

module.exports = async (req, res) => {
  try {
    const { id } = req.params;
    const userId = req.user.user_id;
    const { valueUp, valueDown } = req.body;

    const result = await votePost(userId, id, { valueUp, valueDown });

    res.status(200).json(result);
  } catch (error) {
    console.error(error);
    res.status(400).json({ error: error.message });
  }
};
