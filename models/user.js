const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');

const bcrypt = require('bcrypt');

const userSchema = new mongoose.Schema({
  username: { type: String, unique: 'Woops! That username is already taken.', minLength: 2, uniqueCaseInsensitive: true, required: true },
  firstname: { type: String , required: true },
  lastname: { type: String },
  email: { type: String, unique: 'Uh oh. That email is already taken.', uniqueCaseInsensitive: true, required: true },
  password: { type: String, required: true },
  photo: { type: String },
  preferences: { type: String, required: true }
});

userSchema.plugin(uniqueValidator);

userSchema.set('toJSON', {
  transform(doc, json){
    delete json.password;
    return json;
  }
});

// CHECK PASSWORD MATCHES THE PASSWORD CONFIRMATION
// 1. Set the temporary variable with the passwordConfirmation field.
// _variable means its a temporary variable.
userSchema.virtual('passwordConfirmation')
  .set(function setPasswordConfirmation(passwordConfirmation) {
    this._passwordConfirmation = passwordConfirmation;
  });
// 2. Check that the _passwordConfirmation (saved in step 1) matches the password.
userSchema.pre('validate', function checkPasswordMatch(next) {
  if(this.isModified('password') && this._passwordConfirmation !== this.password) {
    this.invalidate('passwordConfirmation', 'passwords do not match');
  }
  next();
});

// HASH PASSWORD
userSchema.pre('save', function hashPassword(next) {
  if(this.isModified('password')) {
    this.password = bcrypt.hashSync(this.password, bcrypt.genSaltSync(8));
  }
  next();
});

// Write a function which will allow us to check if the plain text password matches the hashed password (validate password)
userSchema.methods.validatePassword = function validatePassword(password) {
  return bcrypt.compareSync(password, this.password);
};


module.exports = mongoose.model('User', userSchema);
