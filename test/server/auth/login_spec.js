/* global api, describe, it, expect, beforeEach */

// if a test doesnt pass in 2000ms, then it will fail. It is important to done() at the end of a test to make sure the test doesnt hang in limbo and has a chance to pass. Mocha will tell you this when running the test.

const User = require('../../../models/user');
const userData = {
  username: 'test',
  name: 'test',
  email: 'test@test.com',
  password: 'test',
  passwordConfirmation: 'test',
  photo: 'http://www.placecage.com/c/200/300',
  preferences: ['prefa', 'prefb', 'prefc'],
  favorite1: 'testfavourite1',
  favorite2: 'testfavourite2',
  favorite3: 'testfavourite3'
};

// we already had a user in the database from out register_spec.js tests, but we still want to remove that user and repopulate. This is because we should be able to run each test in isolation and no rely on other tests.
describe('POST /login', () => {
  beforeEach(done => {
    User.remove({})
      .then(() => User.create(userData))
      .then(() => done());
  });

  it('should return a token', done => {
    api
      .post('/api/login')
      .send(userData)
      .end((err, res) => {
        // expect(res.body.token).to.be.a('string');
        // this is to test the layout of the token (because it is composed of 3 parts seperated by '.'), now that we have this test we can remove the expect line above because .split() is a method that can only be used on strings.
        expect(res.body.token.split('.').length).to.eq(3);
        done();
      });
  });

  it('should return a 401 response if the password is bad', done => {
    const badData = { email: 'test@test.com', password: 'bad' };
    api
      .post('/api/login')
      .send(badData)
      .end((err, res) => {
        // expect(res.status === 401).to.be.true; is the same as below
        expect(res.status).to.eq(401);
        done();
      });
  });

  it('should return a 401 response if the email is bad (user doesn\'t exist)', done => {
    const badData = { email: 'bad@test.com', password: 'test' };
    api
      .post('/api/login')
      .send(badData)
      .end((err, res) => {
        expect(res.status).to.eq(401);
        done();
      });
  });


});
