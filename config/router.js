const router = require('express').Router();
const events = require('../controllers/events');
// const users = require('../controllers/users');
// const secureRoute = require('../lib/secureRoute');

router.route('/events/new')
  .get(events.new);

router.route('/events/:id')
  .get(events.show)
  .get(events.edit)
  .put(events.update)
  .delete(events.delete);

router.route('/*')
  .all((req, res) => res.status(404).json({ message: 'Not found' }));

module.exports = router;
