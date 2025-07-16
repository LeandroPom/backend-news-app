const login = require('../../controllers/auth/login');

module.exports = async (req, res) => {
  try {
    const result = await login(req.body);
    res.status(200).json(result);
  } catch (error) {
    res.status(401).json({ error: error.message });
  }
};
