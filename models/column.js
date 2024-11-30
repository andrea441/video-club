const mongoose = require('mongoose');
const mongoosePaginate = require('mongoose-paginate-v2');

const schema = mongoose.Schema({
    _stories: [{
        type: mongoose.ObjectId,
        ref: 'UserStory'
    }]
});

class Column {
    constructor(stories) {
        this._stories = stories || [];
    }

    get stories() {
        return this._stories;
    }
    set stories(stories) {
        this._stories = stories;
    }
}

schema.loadClass(Column);
schema.plugin(mongoosePaginate);

module.exports = mongoose.model('Column', schema);