const router = require('express').Router();
const events = require('../controllers/events');
const auth = require('../controllers/auth');
const users = require('../controllers/users');
const secureRoute = require('../lib/secureRoute');

//auth routes
router.post('/register', auth.register);
router.post('/login', auth.login);

//user routes
router.route('/users/:id')
  .get(secureRoute, users.show)
  .put(secureRoute, users.update)
  .delete(secureRoute, users.delete);

//event Routes
router.route('/events')
  .post(secureRoute, events.create);

router.route('/events/:id')
  .get(secureRoute,events.show)
  .put(secureRoute, events.update)
  .delete(secureRoute, events.delete);

router.route('/*')
  .all((req, res) => res.status(404).json({ message: 'Not found' }));

module.exports = router;
