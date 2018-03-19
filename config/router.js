const router = require('express').Router();
const events = require('../controllers/events');
const auth = require('../controllers/auth');
const users = require('../controllers/users');
// const zomato = require('../controllers/zomato');
const yelp = require('../controllers/yelp');
// const secureRoute = require('../lib/secureRoute');

router.post('/register', auth.register);
router.post('/login', auth.login);

//user routes
router.route('/users')
  .get(users.index);

router.route('/users/:id')
  .get(users.show)
  .put(users.update)
  .delete(users.delete);

//event Routes
router.route('/events')
  .post(events.create);

router.route('/events/:id')
  .get(events.show)
  .put(events.update)
  .delete(events.delete);

router.route('/events/:id/vote')
  .post(events.voteCreate);

router.route('/events/:id/comments')
  .post(events.commentCreate);

router.route('/events/:id/comments/:commentId')
  .delete(events.commentDelete);

router.get('/restaurants', yelp.restaurants);

router.route('/*')
  .all((req, res) => res.status(404).json({ message: 'Not found' }));

module.exports = router;
