const mongoose = require('mongoose');
const mongoosePaginate = require('mongoose-paginate-v2');

const schema = mongoose.Schema({
    _name: String,
    _description: String
});

class Permission {
    constructor(name, description) {
        this._name = name;
        this._description = description;
    }

    get name() {
        return this._name;
    }
    set name(name) {
        this._name = name;
    }

    get description() {
        return this._description;
    }
    set description(description) {
        this._description = description;
    }
}

schema.loadClass(Permission);
schema.plugin(mongoosePaginate);

module.exports = mongoose.model('Permission', schema);