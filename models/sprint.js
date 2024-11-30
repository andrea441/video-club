const mongoose = require('mongoose');
const mongoosePaginate = require('mongoose-paginate-v2');

const schema = mongoose.Schema({
    _backlog: {
        type: mongoose.ObjectId,
        ref: 'Column',
        required: true,
    },
    _toDo: {
        type: mongoose.ObjectId,
        ref: 'Column',
        required: true,
    },
    _inProgress: {
        type: mongoose.ObjectId,
        ref: 'Column',
        required: true,
    },
    _done: {
        type: mongoose.ObjectId,
        ref: 'Column', 
        required: true,
    },
    _startDate: {
        type: Date,
        required: true,
    },
    _endDate: {
        type: Date,
        required: true,
    },
});

class Sprint {
    constructor(backlog, toDo, inProgress, done, startDate, endDate) {
        this._backlog = backlog;
        this._toDo = toDo;
        this._inProgress = inProgress;
        this._done = done;
        this._startDate = startDate;
        this._endDate = endDate;
    }

    get backlog() {
        return this._backlog;
    }
    set backlog(backlog) {
        this._backlog = backlog;
    }

    get toDo() {
        return this._toDo;
    }
    set toDo(toDo) {
        this._toDo = toDo;
    }

    get inProgress() {
        return this._inProgress;
    }
    set inProgress(inProgress) {
        this._inProgress = inProgress;
    }

    get done() {
        return this._done;
    }
    set done(done) {
        this._done = done;
    }

    get startDate() {
        return this._startDate;
    }
    set startDate(startDate) {
        this._startDate = startDate;
    }

    get endDate() {
        return this._endDate;
    }
    set endDate(endDate) {
        this._endDate = endDate;
    }
}

schema.loadClass(Sprint);
schema.plugin(mongoosePaginate);

module.exports = mongoose.model('Sprint', schema);
