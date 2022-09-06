const passport = require('passport');
const { Strategy } = require('passport-jwt');
const { SECRET } = require('../constants/');
const db = require('../db');
const { sequelize, users } = require('../../models');

const cookieExtractor = function (req) {
  let token = null;
  if (req && req.cookies) token = req.cookies['token'];
  return token;
};

const options = {
  secretOrKey: SECRET,
  jwtFromRequest: cookieExtractor,
};

let user = '';
passport.use(
  new Strategy(options, async ({ id }, done) => {
    user = id;
    try {
      const rows = await users.findAll({
        where: { uuid: id },
        raw: true,
        attributes: { exclude: ['password'] },
      });
      console.log(rows);

      if (!rows.length) {
        throw new Error('401 not authorized');
      }

      let user = { id: rows[0].id, email: rows[0].email };

      return await done(null, user);
    } catch (error) {
      console.log(error.message);
      done(null, false);
    }
  })
);
