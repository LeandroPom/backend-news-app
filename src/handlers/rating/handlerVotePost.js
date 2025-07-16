const votePost = require('../../controllers/rating/votePost');

module.exports = async (req, res) => {
  try {
    const userId = req.user.user_id;
    const { postId } = req.params;
    const { valueUp, valueDown } = req.body;

    const result = await votePost(userId, postId, { valueUp, valueDown });

    res.status(200).json(result);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};
