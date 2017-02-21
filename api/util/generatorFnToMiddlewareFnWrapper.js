const Promise = require('bluebird');

// Takes a generator
module.exports = (genFn) => {
  const cr = Promise.coroutine(genFn);

  // Returns a normal Express route function
  return (req, res) => {
    cr(req, res);
  };
};