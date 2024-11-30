const mongoose = require('mongoose');
const mongoosePaginate = require('mongoose-paginate-v2');

const schema = mongoose.Schema({
    _startDate: Date,   
    _columnProductBacklog: {
        type: mongoose.ObjectId,
        ref: 'Column',
    },
    _columnsReleaseBacklog: [{
        type: mongoose.ObjectId,
        ref: 'Column',
    }],
});

class Board {
    constructor(startDate, columnProductBacklog, columnsReleaseBacklog) {
        this._startDate = startDate;
        this._columnProductBacklog = columnProductBacklog;
        this._columnsReleaseBacklog = columnsReleaseBacklog;
    }

    get startDate() {
        return this._startDate;
    }
    set startDate(startDate) {
        this._startDate = startDate;
    }

    get columnProductBacklog() {
        return this._columnProductBacklog;
    }
    set columnProductBacklog(columnProductBacklog) {
        this._columnProductBacklog = columnProductBacklog;
    }

    get columnsReleaseBacklog() {
        return this._columnsReleaseBacklog;
    }
    set columnsReleaseBacklog(columnsReleaseBacklog) {
        this._columnsReleaseBacklog = columnsReleaseBacklog;
    }
}

schema.loadClass(Board);
schema.plugin(mongoosePaginate);

module.exports = mongoose.model('Board', schema);