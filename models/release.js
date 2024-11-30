const mongoose = require('mongoose');
const mongoosePaginate = require('mongoose-paginate-v2');

const schema = mongoose.Schema({
    _version: {
        type: String,
        required: true,
    },
    _retrospective: [
        {
            type: mongoose.ObjectId,
            ref: 'Retrospective',
        },
    ],
    _sprints: [
        {
            type: mongoose.ObjectId,
            ref: 'Sprint',
        },
    ],
});

class Release {
    constructor(version, retrospectiva, sprints) {
        this._version = version;
        this._retrospectiva = retrospectiva;
        this._sprints = sprints;
    }

    get version() {
        return this._version;
    }
    set version(version) {
        this._version = version;
    }

    get retrospectiva() {
        return this._retrospectiva;
    }
    set retrospectiva(retrospectiva) {
        this._retrospectiva = retrospectiva;
    }

    get sprints() {
        return this._sprints;
    }
    set sprints(sprints) {
        this._sprints = sprints;
    }
}

schema.loadClass(Release);
schema.plugin(mongoosePaginate);

module.exports = mongoose.model('Release', schema);

