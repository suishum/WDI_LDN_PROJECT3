/* global api, describe, it, expect, beforeEach */
const Event = require('../../../models/event');
const User = require('../../../models/user');
const jwt = require('jsonwebtoken');
const { secret } = require('../../../config/environment');

const userData = {
  username: 'test',
  email: 'test@test.com',
  password: 'test',
  passwordConfirmation: 'test'
};

const eventData = {
  'location': {
    'lat': 51.50090949999999,
    'lng': -0.11953229999994619
  },
  'restaurants': [ {
    'id': 'hawksmoor-seven-dials-london-4',
    'name': 'Hawksmoor Seven Dials'
  },
  {
    'id': 'great-queen-street-london',
    'name': 'Great Queen Street'
  },
  {
    'id': 'burger-and-lobster-london-2',
    'name': 'Burger & Lobster'
  },
  {
    'id': 'lanzhou-noodle-bar-london',
    'name': 'Lanzhou Noodle Bar'
  },
  {
    'id': 'quilon-restaurant-london',
    'name': 'Quilon Restaurant'
  }
  ],
  'attendees': [ ],
  'admin': [],
  'name': 'Katsu\'s Event',
  'date': '2018-03-30T23:00:00.000Z',
  'time': '1970-01-01T20:07:00.000Z',
  'comments': [ ],
  'votes': [ ]
};

let newEvent;
let token;

describe('DELETE /api/events/:id', () => {
  beforeEach(done => {
    Promise.all([
      User.remove({}),
      Event.remove({})
    ])
      .then(() => User.create(userData))
      .then(user => {
        token = jwt.sign({ sub: user._id }, secret, { expiresIn: '6h'});
      })
      .then(() => Event.create(eventData))
      .then(event => {
        newEvent = event;
      })
      .then(() => done());
  });

  it('should return a 401 respose without a token', done => {
    api
      .delete(`/api/events/${newEvent._id}`)
      .end((err,res) => {
        expect(res.status).to.eq(401);
        done();
      });
  });

  it('should return a 204 response', done => {
    api
      .delete(`/api/events/${newEvent._id}`)
      .set('Authorization', `Bearer ${token}`)
      .end((err,res) => {
        expect(res.status).to.eq(204);
        done();
      });
  });
});
