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
  getUserById,
  something
} = require('../controllers/auth');
// prettier-ignore
const {validationMiddleware} = require('../middleware/validations-middleware');
const { registerValidation, loginValidation } = require('../validators/auth');
const { userAuth } = require('../middleware/auth-middleware');
const router = Router();
const passport = require('passport');

router.get('/', (req, res) => {
  res.send('<h2>DOCKER TESTer</h2>');
});
router.get('/get-users', getUsers);
router.get('/demo-dashboard', something);
router.get('/userByEmail/:email', getUserByEmail);
router.get('/userById/:id', getUserById);
router.get('/protected', getAllItems);
router.post('/register', registerValidation, validationMiddleware, register);
router.post('/login', loginValidation, validationMiddleware, login);
router.get('/logout', logout);

router.get('/allItems', getAllItems, protected);
router.get('/itemBySlug/:slug', itemBySlug);
router.get('/itemById/:id', itemById);
router.post('/addToInventory', addToInventory);
router.delete('/deleteFromInventory/:itemId/:userId', deleteFromInventory);
router.get('/allFromInventory/:uuid', allFromInventory);

module.exports = router;
