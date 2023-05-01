const mongoose = require("mongoose")
const Schema = mongoose.Schema

//describing the shape of the documents that will be entering the database
const UserSchema = new Schema({
    email: {
        type: String,
        required: [true, "Please provide an Email!"],
        unique: [true, "Email Exist"],
      },
    
      password: {
        type: String,
        required: [true, "Please provide a password!"],
        unique: false,
      },
    },
    {timestamps: true});

//creating a model from the schema
  module.exports = mongoose.model.Users || mongoose.model("Users", UserSchema);