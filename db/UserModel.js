const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// Describe the shape of the documents that will be entering the database
const UserSchema = new Schema({
  name: {
    type: String,
    required: [true, "Please provide a name!"],
    unique: false,
  },
  email: {
    type: String,
    required: [true, "Please provide an email!"],
    unique: [true, "Email already exists"],
  },
  password: {
    type: String,
    required: [true, "Please provide a password!"],
    unique: false,
  },
  phonenumber: {
    type: Number,
    required: [true, "Please provide a phonenumber!"],
    unique: [true, "Phonenumber already exists"],
  },
  city: {
    type: String,
    required: [true, "Please provide a city!"],
    unique: false,
  },
  isVerifier: {
    type: Boolean,
    required: [false, "Please provide a isVerifier!"],
    unique: false,
    default: false,
  },
  reviews: [
    {
      by: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "UserModel",
      },
      description: String,
      rating: Number,
      transactionID: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "MatchedTransactionModel",
      },
    },
  ],
}, { timestamps: true });

// Create a model from the schema
const UserModel = mongoose.model("UserModel", UserSchema);

// Export the model
module.exports = UserModel;
