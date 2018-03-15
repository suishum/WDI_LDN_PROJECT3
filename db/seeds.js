const mongoose = require('mongoose');
mongoose.Promise = require('bluebird');
const { dbURI } = require('../config/environment');
const Users = require('../models/user');
const userData = require('./data/users');

mongoose.connect(dbURI, (err, db) => {
  db.dropDatabase();

  Users.create(userData)
    .then(users => console.log(`${users.length} users created`))
    .catch(err => console.log(err))
    .finally(() => mongoose.connection.close());
});
