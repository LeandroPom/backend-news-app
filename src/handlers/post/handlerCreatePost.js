const createPost = require('../../controllers/post/createPost');

module.exports = async (req, res) => {
  try {
    // const userId = req.user.user_id; //cuando exista user
    const userId = req.body.user_id;
    const post = await createPost(req.body, userId);
    res.status(201).json(post);
  } catch (error) {
    console.error(error);
    res.status(400).json({ error: error.message });
  }
};
