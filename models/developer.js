const mongoose = require('mongoose');
const mongoosePaginate = require('mongoose-paginate-v2');

const addressSchema = new mongoose.Schema({
    street: { type: String, required: true },
    number: { type: String, required: true },
    zip: { type: String, required: true },
    city: { type: String, required: true },
    state: { type: String, required: true },
    country: { type: String, required: true }
});

const schema = mongoose.Schema({
    _name: String,
    _lastName: String,
    _birthDate: Date,
    _CURP: String,
    _RFC: String,
    _address: addressSchema,
    _skills: [{
        type: mongoose.ObjectId,
        ref: 'Skill'
    }]
});

class Developer {
    constructor(name, lastName, birthDate, CURP, RFC, address, skills) {
        this._name = name;
        this._lastName = lastName;
        this._birthDate = birthDate;
        this._CURP = CURP;
        this._RFC = RFC;
        this._address = address;
        this._skills = skills;
    }

    get name() {
        return this._name;
    }
    set name(name) {
        this._name = name;
    }

    get lastName() {
        return this._lastName;
    }
    set lastName(lastName) {
        this._lastName = lastName;
    }

    get birthDate() {
        return this._birthDate;
    }
    set birthDate(birthDate) {
        this._birthDate = birthDate;
    }

    get CURP() {
        return this._CURP;
    }
    set CURP(CURP) {
        this._CURP = CURP;
    }

    get RFC() {
        return this._RFC;
    }
    set RFC(RFC) {
        this._RFC = RFC;
    }

    get address() {
        return this._address;
    }
    set address(address) {
        this._address = address;
    }

    get skills() {
        return this._skills;
    }
    set skills(skills) {
        this._skills = skills;
    }
}

schema.loadClass(Developer);
schema.plugin(mongoosePaginate);

module.exports = mongoose.model('Developer', schema);