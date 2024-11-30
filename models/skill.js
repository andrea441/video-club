const mongoose = require('mongoose');
const mongoosePaginate = require('mongoose-paginate-v2');

const SkillLevel = {
    JUNIOR: 'Junior',
    SENIOR: 'Senior',
    MASTER: 'Master',
};

const schema = mongoose.Schema({
    _description: {
        type: String,
        required: true,
    },
    _level: {
        type: String,
        enum: Object.values(SkillLevel), 
        required: true,
    },
});

class Skill {
    constructor(description, level) {
        this._description = description;
        this._level = level;
    }

    get description() {
        return this._description;
    }
    set description(description) {
        this._description = description;
    }

    get level() {
        return this._level;
    }
    set level(level) {
        this._level = level;
    }
}

schema.loadClass(Skill);
schema.plugin(mongoosePaginate);

module.exports = mongoose.model('Skill', schema);

