const mongoose = require('mongoose');
const validator = require('validator');
const bcrypt = require('bcrypt');
const Schema = mongoose.Schema;

const userSchema = new Schema({
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
    },
});

userSchema.statics.signup = async function(name, email, password) {
    if (!name || !email || !password) {
        throw Error('All fields must be filled');
    }
    const exists = await this.findOne({ email });
    if (exists) {
        throw Error('Email already exists');
    }
    if (!validator.isEmail(email)) {
        throw Error('Email is not valid');
    }
    if (!validator.isStrongPassword(password)) {
        throw Error('Password is not strong enough');
    }

    const salt = await bcrypt.genSalt(15);
    const hash = await bcrypt.hash(password, salt);

    const user = await this.create({ name, email, password: hash });
    return user;
};

userSchema.statics.login = async function(email, password) {
    if (!email || !password) {
        throw Error('All fields must be filled');
    }

    const user = await this.findOne({ email });
    if (!user) {
        throw Error("Email doesn't exist");
    }

    const compare = await bcrypt.compare(password, user.password);
    if (!compare) {
        throw Error('Incorrect password');
    }

    return user;
};

module.exports = mongoose.model('User', userSchema);
