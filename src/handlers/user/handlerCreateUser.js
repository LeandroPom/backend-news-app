const createUser = require('../../controllers/user/createUser');

module.exports = async (req, res) => {

  const { name, email, password, role } = req.body

  try {

    const user = await createUser(name, email, password, role);

    res.status(201).json(user);

  } catch (err) {

    res.status(400).json({ error: err.message });
  }
};
