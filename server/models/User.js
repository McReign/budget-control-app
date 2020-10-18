const mongoose = require('mongoose');
const crypto = require('crypto');
const connection = require('../db');
const config = require('../config');

const userSchema = new mongoose.Schema({
    email: {
        type: String,
        required: 'E-mail должен быть задан',
        validate: [
            {
                validator(value) {
                    return /^[-.\w]+@([\w-]+\.)+[\w-]{2,12}$/.test(value);
                },
                message: 'Некорректный email',
            },
        ],
        unique: 'Такой email уже существует',
    },
    displayName: {
        type: String,
        required: 'Имя должно быть задано',
    },
    activeWallet: {
        type: mongoose.Types.ObjectId,
        required: true,
    },
    passwordHash: {
        type: String,
    },
    salt: {
        type: String,
    },
});

function generatePassword(salt, password) {
    return new Promise((resolve, reject) => {
        crypto.pbkdf2(
            password, salt,
            config.crypto.iterations,
            config.crypto.length,
            config.crypto.digest,
            (err, buffer) => {
                if (err) return reject(err);
                resolve(buffer.toString('hex'));
            }
        );
    });
}

function generateSalt() {
    return new Promise((resolve, reject) => {
        crypto.randomBytes(config.crypto.length, (err, buffer) => {
            if (err) return reject(err);
            resolve(buffer.toString('hex'));
        });
    });
}

userSchema.methods.setPassword = async function(password) {
    this.salt = await generateSalt();
    this.passwordHash = await generatePassword(this.salt, password);
};

userSchema.methods.checkPassword = async function(password) {
    if (!password) return false;

    const hash = await generatePassword(this.salt, password);
    return hash === this.passwordHash;
};

module.exports = connection.model('User', userSchema);
