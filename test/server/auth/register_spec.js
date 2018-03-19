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


// the first argument gets printed in the terminal, kinda like a title, so we know what we're testing
describe('POST /register', () => {

  // beforeEach is a function that runs before each test
  beforeEach(done => {
    // remove all of the data from the user model, this is so the database doesn't moan about duplicate keys, we need to start with a blank canvas (always, unless testing duplicate user entries).
    // 1. User.collection.drop();
    // 1. User.collection.remove();
    User.remove({})
      .then(() => done());
    // done is kinda like next, move onto the next task
    // 1. done();
  });

  // it defines a test, first argument is a brief overview of what the test should do, each it is ONE test
  it('should return a token and a message', done => {
    api
      // send a post request to this url
      .post('/api/register')
      // send the test data
      .send(userData)
      .end((err, res) => {
        // console.log(res.body);
        expect(res.body.message).to.eq('Thank you for registering'); // expect is chai
        expect(res.body.token).to.be.a('string'); // expect is chai
        done();
      });
  });

  // could get really granular and carry out a test for each expect (so we know where exactly our test fails)
  it('should return a message', done => {
    api
      .post('/api/register')
      .send(userData)
      .end((err, res) => {
        expect(res.body.message).to.eq('Thank you for registering');
        done();
      });
  });

  it('should return a token', done => {
    api
      .post('/api/register')
      .send(userData)
      .end((err, res) => {
        // expect(res.body.token).to.be.a('string');
        // this is to test the layout of the token (because it is composed of 3 parts seperated by '.'), now that we have this test we can remove the expect line above because .split() is a method that can only be used on strings.
        expect(res.body.token.split('.').length).to.eq(3);
        done();
      });
  });

  it('should return a 422 response if the passwords don\'t match', done => {
    // making a COPY of the userData object and changing the password to 'bad'. Object assign takes the thing on the rightmost and assigns it to the thing on the left.
    const badData = Object.assign({}, userData, { password: 'bad'});
    api
      .post('/api/register')
      .send(badData)
      .end((err, res) => {
        // console.log(res.status, res.statusCode);
        expect(res.status).to.eq(422);
        done();
      });
  });

});
