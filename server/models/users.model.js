const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const { Schema } = mongoose;

const UsersSchema = new Schema({
    name: String,
    lname: String,
    phone: String,
    id: String,
    address: {
        state: String,
        street: String,
        zipcode: String
    },
    photo: String,
    role: {
        type: String,
        default: 'customer',
        enum: ['customer', 'Admin']
    },
    email: {
        type: String,
        required: 'Require e-mail',
        unique: true,
    },
    password: String
}, { collection: "Users" });

//connect shema to DB in mongo
mongoose.model('Users', UsersSchema);
const Users = mongoose.model('Users');



exports.usersList = (callback) => {
    Users.find({}, (error, data) => {
        console.log(data);
        callback(error, data);
    })
}

exports.findUser = (user, callback) => {
    Users.find({ email: user }, (error, data) => {
        console.log('error: ', error, ', data: ', data)
        callback(error, data);
    })
}

exports.register = (user, callback) => {
    user.password = bcrypt.hashSync(user.password, 10);
    const finalUser = new Users(user);
    finalUser.save()
        .then((usr) => {
            console.log('data: ', usr);
            callback(null, usr);
        })
        .catch((err) => callback(err, null));

}
exports.updateUser = (user, callback) => {
    Users.findOneAndUpdate({ email: user.email }, user)
        .then((usr) => {
            console.log('data: ', usr);
            callback(null, usr);
        })
        .catch((err) => callback(err, null));
}

exports.deleteUser = (user, callback) => {
    Users.deleteOne({ email: user.email }, user)
        .then((usr) => {
            console.log('data: ', usr);
            callback(null, usr);
        })
        .catch((err) => callback(err, null));
}