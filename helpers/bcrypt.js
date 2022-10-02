const bcrypt = require("bcrypt");

const hashPassword = (rawPassword) => {
  return bcrypt.hashSync(rawPassword, 10);
};

const comparePassword = (rawPassword, hashPassword) => {
  return bcrypt.compareSync(rawPassword, hashPassword);
};

module.exports = { hashPassword, comparePassword };
