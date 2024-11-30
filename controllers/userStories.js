const express = require('express');
const UserStory = require('../models/userStory');

function create(req, res, next) {
    const {
        name,
        priority,
        size,
        role,
        functionality,
        benefit,
        context,
        event,
        result,
        fibonacci,
        approval
    } = req.body;

    let userStory = new UserStory({
        _name: name,
        _priority: priority,
        _size: size,
        _role: role,
        _functionality: functionality,
        _benefit: benefit,
        _context: context,
        _event: event,
        _result: result,
        _fibonacci: fibonacci,
        _approval: approval
    });

    userStory.save()
        .then(obj => res.status(200).json({
            msg: "User Story creada correctamente",
            obj: obj
        }))
        .catch(ex => res.status(500).json({
            msg: "No se pudo almacenar la User Story",
            obj: ex
        }));
}

function list(req, res, next) {
    let page = req.params.page || 1;
    const options = {
        page: page,
        limit: 5
    };

    UserStory.paginate({}, options)
        .then(objs => res.status(200).json({
            msg: "Lista de User Stories",
            obj: objs
        }))
        .catch(ex => res.status(500).json({
            msg: "No se pudo consultar la lista de User Stories",
            obj: ex
        }));
}

function index(req, res, next) {
    const id = req.params.id;

    UserStory.findOne({ "_id": id })
        .then(obj => res.status(200).json({
            msg: `User Story con el id ${id}`,
            obj: obj
        }))
        .catch(ex => res.status(500).json({
            msg: "No se pudo consultar la User Story",
            obj: ex
        }));
}

function replace(req, res, next) {
    const id = req.params.id;
    const {
        name,
        priority,
        size,
        role,
        functionality,
        benefit,
        context,
        event,
        result,
        fibonacci,
        approval
    } = req.body;

    let userStory = new Object({
        _name: name || "",
        _priority: priority || "",
        _size: size || 0,
        _role: role || "",
        _functionality: functionality || "",
        _benefit: benefit || "",
        _context: context || "",
        _event: event || "",
        _result: result || "",
        _fibonacci: fibonacci || "",
        _approval: approval || false
    });

    UserStory.findOneAndUpdate({ "_id": id }, userStory)
        .then(obj => res.status(200).json({
            msg: "Se reemplazó la User Story",
            obj: obj
        }))
        .catch(ex => res.status(500).json({
            msg: "No se pudo reemplazar la User Story",
            obj: ex
        }));
}

function update(req, res, next) {
    const id = req.params.id;
    const updateFields = {};

    Object.keys(req.body).forEach(key => {
        if (req.body[key] !== undefined) {
            updateFields[`_${key}`] = req.body[key];
        }
    });

    UserStory.findOneAndUpdate({ "_id": id }, updateFields, { new: true })
        .then(obj => res.status(200).json({
            msg: "Se actualizó la User Story",
            obj: obj
        }))
        .catch(ex => res.status(500).json({
            msg: "No se pudo actualizar la User Story",
            obj: ex
        }));
}

function destroy(req, res, next) {
    const id = req.params.id;

    UserStory.findOneAndDelete({ "_id": id })
        .then(obj => res.status(200).json({
            msg: "User Story eliminada correctamente",
            obj: obj
        }))
        .catch(ex => res.status(500).json({
            msg: "No se pudo eliminar la User Story",
            obj: ex
        }));
}

module.exports = { create, list, index, replace, update, destroy };
