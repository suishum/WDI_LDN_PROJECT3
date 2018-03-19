/* global api, describe, it, expect, beforeEach */

// some of our user routes are protected by secureRoute which requires a token, this means we will need to include the user model, some userData and jwt

const User = require('../../../models/user');

const userData = [{
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
}, {
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
}];

describe('GET /users', () => {
  beforeEach(done => {
    User.remove({})
      .then(() => User.create(userData))
      // .then(done) will be the same as .then(user => done(user)), to be safe use .done() like below with an anonymous function
      .then(() => done());
  });

  // should return 200 response
  it('should return 200 response', done => {
    api
      .get('/api/users')
      .send(userData)
      .end((err, res) => {
        expect(res.status).to.eq(200);
        done();
      });
  });

  // res.body should be an array
  it('the response body should be an array', done => {
    api
      .get('/api/users')
      .send(userData)
      .end((err, res) => {
        expect(res.body).to.be.a('array');
        done();
      });
  });

  // should return an array of valid user objects
  it('should return an array of valid user objects', done => {
    api
      .get('/api/users')
      .send(userData)
      .end((err, res) => {
        res.body.forEach((user, i) => {
          expect(user._id).to.be.a('string');
          expect(user.username).to.eq(userData[i].username);
          expect(user.name).to.eq(userData[i].name);
          expect(user.email).to.eq(userData[i].email);
          expect(user.photo).to.eq(userData[i].photo);
          expect(user.preferences).to.deep.eq(userData[i].preferences);
          expect(user.favorite1).to.eq(userData[i].favorite1);
          expect(user.favorite2).to.eq(userData[i].favorite2);
          expect(user.favorite3).to.eq(userData[i].favorite3);
        });
        done();
      });
  });

});
