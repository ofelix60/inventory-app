const { Router } = require('express');
// prettier-ignore
const {
  getUsers,
  register,
  login,
  protected,
  logout,
  getAllItems,
  itemBySlug,
  addToInventory,
  deleteFromInventory,
  allFromInventory,
  getUserByEmail,
  itemById,
  getUserById
} = require('../controllers/auth');
// prettier-ignore
const {validationMiddleware} = require('../middleware/validations-middleware');
const { registerValidation, loginValidation } = require('../validators/auth');
const { userAuth } = require('../middleware/auth-middleware');
const router = Router();
const passport = require('passport');

router.get('/get-users', getUsers);
router.get('/userByEmail/:email', getUserByEmail);
router.get('/userById/:id', getUserById);
router.get('/protected', userAuth, protected);
router.post('/register', registerValidation, validationMiddleware, register);
router.post('/login', loginValidation, validationMiddleware, login);
router.get('/logout', logout);

router.get('/allItems', userAuth, getAllItems);
router.get('/itemBySlug/:slug', userAuth, itemBySlug);
router.get('/itemById/:id', userAuth, itemById);
router.post('/addToInventory', userAuth, addToInventory);
router.delete(
  '/deleteFromInventory/:itemId/:userId',
  userAuth,
  deleteFromInventory
);
router.get('/allFromInventory/:uuid', userAuth, allFromInventory);

module.exports = router;
