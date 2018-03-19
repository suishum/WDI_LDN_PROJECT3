/* global api, describe, it, expect, beforeEach */

// some of our user routes are protected by secureRoute which requires a token, this means we will need to include the user model, some userData and jwt

const User = require('../../../models/user');
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

describe('GET /users/:id', () => {
  beforeEach(done => {
    User.remove({})
      .then(() => User.create(userData))
      .then(user => {
        // console.log(user);
        userId = user._id;
      })
      .then(() => done());
  });

  // should return 200 response
  it('should return 200 response', done => {
    api
      .get(`/api/users/${userId}`)
      .send(userData)
      .end((err, res) => {
        expect(res.status).to.eq(200);
        done();
      });
  });

  it('should return a valid user object', done => {
    api
      .get(`/api/users/${userId}`)
      .send(userData)
      .end((err, res) => {
        // console.log(res);
        expect(res.body._id).to.be.a('string');
        expect(res.body.username).to.eq(userData.username);
        expect(res.body.name).to.eq(userData.name);
        expect(res.body.email).to.eq(userData.email);
        expect(res.body.photo).to.eq(userData.photo);
        expect(res.body.preferences).to.deep.eq(userData.preferences);
        expect(res.body.favorite1).to.eq(userData.favorite1);
        expect(res.body.favorite2).to.eq(userData.favorite2);
        expect(res.body.favorite3).to.eq(userData.favorite3);
        done();
      });
  });


  // should return 404 response if id is invalid, PUT THIS IN A ROUTER TEST
  // it('should return 404 response if id is invalid', done => {
  //   userId = 'poop';
  //   api
  //     .get(`/api/users/${userId}`)
  //     .send(userData)
  //     .end((err, res) => {
  //       expect(res.status).to.eq(404);
  //       done();
  //     });
  // });

});
