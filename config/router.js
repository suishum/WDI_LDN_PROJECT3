const router = require('express').Router();
const events = require('../controllers/events');
const users = require('../controllers/users');
const secureRoute = require('../lib/secureRoute');

router.route('/users')
  .new(users.new);

router.route('/users/:id')
  .get(secureRoute, users.show)
  .get(secureRoute, users.edit)
  .put(secureRoute, users.update)
  .delete(secureRoute, users.delete);

//Event Routes
router.route('/events/new')
  .get(secureRoute, events.new);

router.route('/events/:id')
  .get(secureRoute,events.show)
  .get(secureRoute,events.edit)
  .put(secureRoute, events.update)
  .delete(secureRoute, events.delete);

router.route('/*')
  .all((req, res) => res.status(404).json({ message: 'Not found' }));

module.exports = router;
