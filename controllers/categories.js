const categories = require('../db/data/categories');

function indexRoute (req, res) {
  res.json(categories);
}

module.exports = {
  index: indexRoute
};
