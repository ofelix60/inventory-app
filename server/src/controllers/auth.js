const { hash } = require('bcryptjs');
const { sign } = require('jsonwebtoken');
const { SECRET } = require('../constants');
const { users, items, inventory } = require('../../models');

// test done
exports.getUsers = async (req, res) => {
  try {
    const allUsers = await users.findAll();

    return res.status(200).json({
      succsess: true,
      users: allUsers,
    });
  } catch (error) {
    console.log(error.message);
  }
};

exports.getUserByEmail = async (req, res) => {
  const { email } = req.params;
  try {
    const userInfo = await users.findAll({
      where: {
        email: email,
      },
    });

    // console.log('BLANK', userInfo.users);

    if (userInfo.length) {
      // return res.status(200).json({
      //   success: true,
      //   user: userInfo,
      // });

      res.sendStatus(200);
      console.log(userInfo);
      return res.json({
        success: true,
        user: userInfo,
      });
    } else {
      return res.status(404).json({
        success: false,
        message: 'No user with that email',
      });
    }
  } catch (error) {
    console.log(error.message);
  }
};

// should return a specifc structure if user == true
// should return 404 if no user

// test done
exports.getUserById = async (req, res) => {
  const { id } = req.params;

  try {
    const userInfo = await users.findAll({
      where: {
        uuid: id,
      },
    });

    return res.status(200).json({
      success: true,
      user: userInfo,
    });
  } catch (error) {
    console.log(error.message);

    return res.status(404).json({
      error: error.message,
    });
  }
};

exports.register = async (req, res) => {
  let { username, email, password } = req.body;
  try {
    password = await hash(password, 10);

    const user = await users.create({ username, email, password });

    return res.status(201).json({
      succsess: true,
      message: 'The registration was successful',
      user: user,
    });
  } catch (error) {
    console.log(error.message);
    return res.status(500).json({
      error: error.message,
    });
  }
};

exports.login = async (req, res) => {
  let user = req.user;

  let payload = {
    id: user.uuid,
    email: user.email,
  };
  try {
    const token = await sign(payload, SECRET);

    return res.status(200).cookie('token', token, { httpOnly: true }).json({
      success: true,
      message: 'Logged in successfully.',
    });
  } catch (error) {
    console.log(error.message);
    return res.status(500).json({
      error: error.message,
    });
  }
};

exports.protected = async (req, res) => {
  try {
    return res.status(200).json({
      info: 'protected info',
    });
  } catch (error) {
    console.log(error.message);
  }
};

exports.logout = async (req, res) => {
  try {
    return res.status(200).clearCookie('token', { httpOnly: true }).json({
      success: true,
      message: 'Logged out successfully.',
    });
  } catch (error) {
    console.log(error.message);
    return res.status(500).json({
      error: error.message,
    });
  }
};

exports.something = async (req, res) => {
  try {
    const allItems = await items.findAll({
      attributes: { exclude: ['createdAt', 'updatedAt'] },
    });
    return res.json(allItems);
  } catch (error) {
    console.log(error.message);
    return res.status(500).json({
      error: error.message,
    });
  }
};

exports.getAllItems = async (req, res) => {
  try {
    const allItems = await items.findAll({
      attributes: { exclude: ['createdAt', 'updatedAt'] },
    });

    return res.status(200).json(allItems);
  } catch (error) {
    console.log(error.message);
    return res.status(500).json({
      error: error.message,
    });
  }
};

exports.itemBySlug = async (req, res) => {
  const { slug } = req.params;
  try {
    const item = await items.findOne({
      where: { slug },
    });
    return res.json(item);
  } catch (error) {
    console.log(error.message);
    return res.status(500).json({
      error: error.message,
    });
  }
};

exports.itemById = async (req, res) => {
  const { id } = req.params;
  try {
    const item = await items.findOne({
      where: { id },
    });

    if (!item) {
      return res.sendStatus(404);
    }

    return res.status(200).json(item);
  } catch (error) {
    console.log(error.message);
    return res.status(500).json({
      error: error.message,
    });
  }
};

exports.addToInventory = async (req, res) => {
  try {
    const { item_id, user_id } = req.body;
    const newInventoryItem = await inventory.create(
      {
        itemId: item_id,
        userUuid: user_id,
      },
      { include: ['users'] },
      { returning: true },
      { distinct: false }
    );
    return res.json(newInventoryItem);
  } catch (error) {
    console.log(error.message);
    return res.status(500).json({
      error: error.message,
    });
  }
};

exports.deleteFromInventory = async (req, res) => {
  const { itemId, userId } = req.params;

  try {
    const item = await inventory.findOne({
      where: {
        id: itemId,
        userUuid: userId,
      },
    });
    await item.destroy();
    return res.json({ message: 'Items deleted' });
  } catch (error) {
    console.log(error.message);
    return res.status(500).json({
      error: error.message,
    });
  }
};

exports.allFromInventory = async (req, res) => {
  const { uuid } = req.params;

  try {
    const thisInventory = await inventory.findAll({
      where: {
        userUuid: uuid,
      },
      attributes: {
        exclude: ['updatedAt', 'createdAt'],
      },
      include: [{ model: items }],
    });
    return res.json(thisInventory);
  } catch (error) {
    console.log('damn');
    console.log(error.message);
    return res.status(500).json({
      error: error.message,
    });
  }
};

// models: {
//         include: ['items'],
//       },
