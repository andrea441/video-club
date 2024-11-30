const mongoose = require('mongoose');
const mongoosePaginate = require('mongoose-paginate-v2');

const schema = mongoose.Schema({
    _date: {
        type: Date,
        required: true,
    },
    _comment: {
        type: String,
        required: true,
    },
});

class Retrospective {
    constructor(date, comment) {
        this._date = date;
        this._comment = comment;
    }

    get date() {
        return this._date;
    }
    set date(date) {
        this._date = date;
    }

    get comment() {
        return this._comment;
    }
    set comment(comment) {
        this._comment = comment;
    }
}

schema.loadClass(Retrospective);
schema.plugin(mongoosePaginate);

module.exports = mongoose.model('Retrospective', schema);
