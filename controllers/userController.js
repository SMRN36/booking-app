const User = require('../utils/database');


exports.createUser = async (req, res) => {
    try {
      const { name, email, phone } = req.body;
      const user = await User.create({ name, email, phone });
      res.status(201).json(user);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Internal server error' });
    }
  };
  
  exports.getAllUsers = async (req, res) => {
    try {
      const users = await User.findAll();
      res.json(users);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Internal server error' });
    }
  };
  
  exports.deleteUser = async (req, res) => {
    try {
      const id = req.params.id;
      await User.destroy({ where: { id } });
      res.sendStatus(204);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Internal server error' });
    }
  };
