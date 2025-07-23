const register = require('../../controllers/auth/register');

module.exports = async (req, res) => {

  try {

    const result = await register(req.body);

    res.status(201).json(result);

  } catch (error) {
    
    res.status(400).json({ error: error.message });
  }
};
