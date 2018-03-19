/* global api, describe, it, expect, beforeEach */

// some of our user routes are protected by secureRoute which requires a token, this means we will need to include the user model, some userData and jwt

const User = require('../../../models/user');
const jwt = require('jsonwebtoken');
const { secret } = require('../../../config/environment');
let token;
let userId;

const userData = {
  username: 'Sui',
  name: 'Sui',
  email: 'sui@sui.com',
  password: 'sui',
  passwordConfirmation: 'sui',
  photo: 'http://www.placecage.com/c/200/300',
  preferences: ['a', 'b', 'c'],
  favorite1: 'favourite1',
  favorite2: 'favourite2',
  favorite3: 'favourite3'
};

const updatedData = {
  username: 'Katie',
  name: 'Katie',
  email: 'katie@katie.com',
  password: 'katie',
  passwordConfirmation: 'katie',
  photo: 'http://www.placecage.com/c/200/300',
  preferences: ['a', 'b', 'c'],
  favorite1: 'favourite1',
  favorite2: 'favourite2',
  favorite3: 'favourite3'
};

describe('PUT /users/:id', () => {
  beforeEach(done => {
    Promise.all([
      User.remove({})
    ])
      .then(() => User.create(userData))
      .then(user => {
        token = jwt.sign({ sub: user._id }, secret, { expiresIn: '6h' });
        userId = user._id;
      })
      .then(() => done());
  });

  // should return 401 response without a token
  it('should return 401 response without token', done => {
    api
      .put(`/api/users/${userId}`)
      .send(userData)
      .end((err, res) => {
        expect(res.status).to.eq(401);
        done();
      });
  });

  // should return 200 response with a token
  it('should return 200 response with a token', done => {
    api
      .put(`/api/users/${userId}`)
      .set('Authorization', `Bearer ${token}`)
      .send(userData)
      .end((err, res) => {
        expect(res.status).to.eq(200);
        done();
      });
  });

  // should return updated information
  it('should return updated record', done => {
    api
      .put(`/api/users/${userId}`)
      .set('Authorization', `Bearer ${token}`)
      .send(updatedData)
      .end((err, res) => {
        expect(res.body.name).to.eq('Katie');
        expect(res.body.email).to.eq('katie@katie.com');
        done();
      });
  });

});
