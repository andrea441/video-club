const mongoose = require('mongoose');
const mongoosePaginate = require('mongoose-paginate-v2');

const Priority = {
    LOW: 'Low',
    MEDIUM: 'Medium',
    HIGH: 'High',
};

const schema = mongoose.Schema({
    _name: {
        type: String,
        required: true,
    },
    _priority: {
        type: String,
        enum: Object.values(Priority),
        required: true,
    },
    _size: {
        type: Number,
        required: true,
    },
    _role: {
        type: String,
        required: true,
    },
    _functionality: {
        type: String,
        required: true,
    },
    _benefit: {
        type: String,
        required: true,
    },
    _context: {
        type: String,
        required: true,
    },
    _event: {
        type: String,
        required: true,
    },
    _result: {
        type: String,
        required: true,
    },
    _fibonacci: {
        type: Number,
        required: true,
    },
    _approval: {
        type: Boolean,
        required: true,
    },
});

// Clase UserStory
class UserStory {
    constructor(name, priority, size, role, functionality, benefit, context, event, result, fibonacci, approval) {
        this._name = name;
        this._priority = priority;
        this._size = size;
        this._role = role;
        this._functionality = functionality;
        this._benefit = benefit;
        this._context = context;
        this._event = event;
        this._result = result;
        this._fibonacci = fibonacci;
        this._approval = approval;
    }

    get name() {
        return this._name;
    }
    set name(name) {
        this._name = name;
    }

    get priority() {
        return this._priority;
    }
    set priority(priority) {
        this._priority = priority;
    }

    get size() {
        return this._size;
    }
    set size(size) {
        this._size = size;
    }

    get role() {
        return this._role;
    }
    set role(role) {
        this._role = role;
    }

    get functionality() {
        return this._functionality;
    }
    set functionality(functionality) {
        this._functionality = functionality;
    }

    get benefit() {
        return this._benefit;
    }
    set benefit(benefit) {
        this._benefit = benefit;
    }

    get context() {
        return this._context;
    }
    set context(context) {
        this._context = context;
    }

    get event() {
        return this._event;
    }
    set event(event) {
        this._event = event;
    }

    get result() {
        return this._result;
    }
    set result(result) {
        this._result = result;
    }

    get fibonacci() {
        return this._fibonacci;
    }
    set fibonacci(fibonacci) {
        this._fibonacci = fibonacci;
    }

    get approval() {
        return this._approval;
    }
    set approval(approval) {
        this._approval = approval;
    }
}

schema.loadClass(UserStory);
schema.plugin(mongoosePaginate);

module.exports = mongoose.model('UserStory', schema);
