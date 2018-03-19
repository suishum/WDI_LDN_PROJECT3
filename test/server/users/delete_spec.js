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

describe('DELETE /user/:id', () => {
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

  // should return 204 (no content) response with a token
  it('should return 204 response with a token', done => {
    api
      .delete(`/api/users/${userId}`)
      .set('Authorization', `Bearer ${token}`)
      .send(userData)
      .end((err, res) => {
        expect(res.status).to.eq(204);
        done();
      });
  });

  // should return 401 (unauthorised) response with a token
  it('should return 401 response without a token', done => {
    api
      .delete(`/api/users/${userId}`)
      .send(userData)
      .end((err, res) => {
        expect(res.status).to.eq(401);
        done();
      });
  });

});
