const router = require('express').Router();
const events = require('../controllers/events');
const auth = require('../controllers/auth');
const users = require('../controllers/users');
const yelp = require('../controllers/yelp');
const categories = require('../controllers/categories');
const secureRoute = require('../lib/secureRoute');

router.post('/register', auth.register);
router.post('/login', auth.login);

//user routes
router.route('/users')
  .get(users.index);

router.route('/users/:id')
  .get(users.show)
  .put(secureRoute, users.update)
  .delete(secureRoute, users.delete);

//event routes
router.route('/events')
  .get(events.index)
  .post(secureRoute, events.create);

router.route('/events/:id')
  .get(secureRoute, events.show)
  .put(secureRoute, events.update)
  .delete(secureRoute, events.delete)
  .post(secureRoute, events.winnerCreate);

router.route('/events/:id/vote')
  .post(secureRoute, events.voteCreate);

router.route('/events/:id/vote/:voteId')
  .delete(secureRoute, events.voteDelete);

router.route('/events/:id/comments')
  .post(secureRoute, events.commentCreate);

router.route('/events/:id/comments/:commentId')
  .delete(secureRoute, events.commentDelete);

router.route('/events/:id/attendees')
  .post(secureRoute, events.attendeeCreate);

router.route('/events/:id/attendees/:attendeeId')
  .delete(secureRoute, events.attendeeDelete);

router.route('/events/:id/admin')
  .post(secureRoute, events.adminCreate);

router.get('/restaurants', yelp.restaurants);

router.get('/categories', categories.index);

router.route('/*')
  .all((req, res) => res.status(404).json({ message: 'Not found' }));

module.exports = router;
