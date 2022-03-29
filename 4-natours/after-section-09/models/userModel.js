const mongoose = require('mongoose');
const validator = require('validator');
const bcrypt = require('bcryptjs');

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Tell me your name'],
    trim: true
    // maxlength: [40, 'A user name must have less or equal then 40 characters'],
    // minlength: [10, 'A user name must have more or equal then 10 characters']
  },
  email: {
    type: String,
    required: [true, 'A user must have a email'],
    unique: true,
    lowercase: true,
    validate: [validator.isEmail, 'Must insert a valid email address']
  },
  photo: String,
  password: {
    type: String,
    required: [true, 'Please provide a password'],
    minLenght: 8
    // validator: [validator.isStrongPassword, 'A valid password must contain 8 characters and at least 1 lower case, 1 upper case, 1 number and 1 symbol']
  },
  passwordConfirm: {
    type: String,
    required: [true, 'You must confirm your password'],
    validate: {
      validator: function(el) {
        return el === this.password;
      },
      message: 'Passwords are not the same!'
    }
  }
});

// this middleware will encrypt the password after user input/B4 being saved to the DB
userSchema.pre('save', async function(next) {
  if (!this.isModified('password')) {
    return next();
  }
  this.password = await bcrypt.hash(this.password, 12);
  this.passwordConfirm = undefined;
  next();
});
const User = mongoose.model('User', userSchema);

module.exports = User;
