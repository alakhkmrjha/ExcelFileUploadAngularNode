
var mongoose = require('mongoose');

mongoose.connect("mongodb://localhost:27017/assignment");

var db = mongoose.connection;

db.on("error", console.error.bind(console, "connection error"));
db.once("open", function (callback) {
    console.log("Connection succeeded.");
});

var Schema = mongoose.Schema;

var userSchema = new Schema({
    gender: String,
    name: {
        title: String,
        first: String,
        last: String
    },
    location: {
        street: String,
        city: String,
        state: String,
        postcode: Number
    },

    email: String,
    dob: String,
    registered: String,
    phone: String,
    cell: String,
    ID: {
        name: String,
        value: String
    },
    nat: String
});
var Users = mongoose.model('Users', userSchema);

