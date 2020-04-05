
const mongoose = require('mongoose')
const Schema = mongoose.Schema
var timestamps = require('mongoose-timestamp');
let UserShema = new Schema({
  first_name: {
    type: String,
  },
  last_name: {
    type: String,
  },
  email: {
    type: String,
   
  },
  password: {
    type: String,
  
  },

  role:
  {
    type :String ,
    default:"user"
  },
  isEmailVerified:
  {
    type :Boolean ,
    default:false
  }
});
UserShema.plugin(timestamps,{
  createdAt: 'created_at',
  updatedAt: 'updated_at'
});
module.exports = mongoose.model('users', UserShema);