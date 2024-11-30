const mongoose = require('mongoose');
const mongoosePaginate = require('mongoose-paginate-v2');

const schema = mongoose.Schema({
    _name: {
        type: String,
        required: true,
    },
    _permission: [
        {
            type: mongoose.ObjectId,
            ref: 'Permission',
        },
    ],
});

class Role {
    constructor(name, permission) {
        this._name = name;
        this._permission = permission;
    }

    get name() {
        return this._name;
    }
    set name(name) {
        this._name = name;
    }

    get permission() {
        return this._permission;
    }
    set permission(permission) {
        this._permission = permission;
    }
}

schema.loadClass(Role);
schema.plugin(mongoosePaginate);

module.exports = mongoose.model('Role', schema);
