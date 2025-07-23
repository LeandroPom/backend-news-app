const votePost = require('../../controllers/rating/votePost');

module.exports = async (req, res) => {

  const { postId } = req.params;
  const userId = req.user.user_id;
  const { valueUp, valueDown } = req.body;

  try {

    const result = await votePost(userId, postId, { valueUp, valueDown });

    res.status(200).json(result);
  
  } catch (error) {
  
    res.status(400).json({ error: error.message });
  }
};
