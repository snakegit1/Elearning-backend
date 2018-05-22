var autoIncrement = require("mongoose-easy-auto-increment");
var mongoose = require('mongoose');
var bcrypt = require('bcrypt');

var userSchema = new mongoose.Schema({
  _id: { type: mongoose.Schema.Types.ObjectId },
  id: { type: Number },
  full_name: {
    type: String,
    required: true,
    max: 255
  },
  email: {
    type: String,
    max: 255,
    unique: true,
    required: true
  },
  password: {
    type: String,
    required: true,
    min: [6, 'Password must be longer than 6 characters']
  },
  signup_method: {
    type: String,
    required: true
  },
  api_token: {
    type: String
  },
  areas: [{ type: Number }],
  areasIds: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Area' }],
  writings: [{ type: mongoose.Schema.Types.ObjectId, ref: 'UserWriting' }]
});

userSchema.plugin(autoIncrement, { field: 'id', collection: 'UserCounters' });

//authenticate input against database
userSchema.statics.authenticate = function (email, password, callback) {
  User.findOne({ email: email })
    .exec(function (err, user) {
      if (err) {
        return callback(err)
      }
      else if (!user) {
        var err = {
          message: 'User not found.',
          status_code: 401
        };
        return callback(err);
      }
      bcrypt.compare(password, user.password, function (err, result) {
        if (result === true) {
          return callback(null, user);
        } else {
          return callback();
        }
      })
    });
};

var User = mongoose.model('User', userSchema);

module.exports = User;
