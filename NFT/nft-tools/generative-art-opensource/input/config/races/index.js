module.exports = ({ dir, width, height }) => {
  const params = { dir, width, height };
  const joy = require('./joy')(params);
  const sorrow = require('./sorrow')(params);
  return {
    joy,
    sorrow,
  }
};