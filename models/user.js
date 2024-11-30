const mongoose = require('mongoose');
const mongoosePaginate = require('mongoose-paginate-v2');

const SocialMedia = {
    FACEBOOK: 'Facebook',
    GOOGLE: 'Google',
    LINKEDIN: 'LinkedIn',
};

const schema = mongoose.Schema({
    _user: {
        type: String,
        required: true,
    },
    _email: {
        type: String,
        required: true,
    },
    _password: {
        type: String,
        required: true,
    },
    _salt: {
        type: String,
        required: true
    },
    _socialMedia: [
        {
            type: String,
            enum: Object.values(SocialMedia),
        },
    ],
    _role: {
        type: mongoose.ObjectId,
        ref: 'Role'
    }
});

class User {
    constructor(user, password, socialMedia) {
        this._user = user;
        this._email = email;
        this._password = password;
        this._socialMedia = socialMedia;
        this._role = role;
        this._salt = salt;
    }

    get user() {
        return this._user;
    }
    set user(user) {
        this._user = user;
    }

    get email() {
        return this._email;
    }

    set email(email) {
        this._email = email;
    }

    get password() {
        return this._password;
    }
    set password(password) {
        this._password = password;
    }

    get salt() {
        return this._salt;
    }

    set salt(salt) {
        this._salt = salt;
    }        

    get socialMedia() {
        return this._socialMedia;
    }
    set socialMedia(socialMedia) {
        this._socialMedia = socialMedia;
    }

    get role() {
        return this._role;
    }

    set role(role) {
        return this._role = role;
    }
}

schema.loadClass(User);
schema.plugin(mongoosePaginate);

module.exports = mongoose.model('User', schema);
