const mongoose = require('mongoose');
const mongoosePaginate = require('mongoose-paginate-v2');

const schema = mongoose.Schema({
    _name: {
        type: String,
        required: true
    },
    _requestDate: {
        type: Date,
        default: Date.now
    },
    _startDate: {
        type: Date
    },
    _description: {
        type: String
    },
    _projectManager: {
        type: mongoose.ObjectId,
        ref: 'User'
    },
    _productOwner: {
        type: mongoose.ObjectId,
        ref: 'User'
    },
    _teamDeveloper: [{
        type: mongoose.ObjectId,
        ref: 'Developer'
    }],
    _board: {
        type: mongoose.ObjectId,
        ref: 'Board'
    }
});

class Project {
    constructor(name, requestDate, startDate, description, projectManager, productOwner, teamDeveloper, board) {
        this._name = name;
        this._requestDate = requestDate;
        this._startDate = startDate;
        this._description = description;
        this._projectManager = projectManager;
        this._productOwner = productOwner;
        this._teamDeveloper = teamDeveloper;
        this._board = board;
    }

    get name() {
        return this._name;
    }
    set name(name) {
        this._name = name;
    }

    get requestDate() {
        return this._requestDate;
    }
    set requestDate(requestDate) {
        this._requestDate = requestDate;
    }

    get startDate() {
        return this._startDate;
    }
    set startDate(startDate) {
        this._startDate = startDate;
    }

    get description() {
        return this._description;
    }
    set description(description) {
        this._description = description;
    }

    get projectManager() {
        return this._projectManager;
    }
    set projectManager(projectManager) {
        this._projectManager = projectManager;
    }

    get productOwner() {
        return this._productOwner;
    }
    set productOwner(productOwner) {
        this._productOwner = productOwner;
    }

    get teamDeveloper() {
        return this._teamDeveloper;
    }
    set teamDeveloper(teamDeveloper) {
        this._teamDeveloper = teamDeveloper;
    }

    get board() {
        return this._board;
    }
    set board(board) {
        this._board = board;
    }
}

schema.loadClass(Project);
schema.plugin(mongoosePaginate);

module.exports = mongoose.model('Project', schema);
