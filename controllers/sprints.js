const express = require('express');
const Sprint = require('../models/sprint');

function create(req, res, next) {
    const backlog = req.body.backlog;
    const toDo = req.body.toDo;
    const inProgress = req.body.inProgress;
    const done = req.body.done;
    const startDate = req.body.startDate;
    const endDate = req.body.endDate;

    let sprint = new Sprint({
        _backlog: backlog,
        _toDo: toDo,
        _inProgress: inProgress,
        _done: done,
        _startDate: startDate,
        _endDate: endDate
    });

    sprint.save().then(obj => res.status(200).json({
        msg: "Sprint creado correctamente",
        obj: obj
    })).catch(ex => res.status(500).json({
        msg: "No se pudo almacenar el sprint",
        obj: ex
    }));
}

function list(req, res, next) {
    let page = req.params.page ? req.params.page : 1;
    const options = {
        page: page,
        limit: 5
    };
    Sprint.paginate({}, options).then(objs => res.status(200).json({
        msg: "Lista de sprints",
        obj: objs
    })).catch(ex => res.status(500).json({
        msg: "No se pudo consultar la lista de sprints",
        obj: ex
    }));
}

function index(req, res, next) {
    const id = req.params.id;
    Sprint.findOne({ "_id": id }).then(obj => res.status(200).json({
        msg: `Sprint con el id ${id}`,
        obj: obj
    }))
        .catch(ex => res.status(500).json({
            msg: "No se pudo consultar el sprint",
            obj: ex
        }));
}

function replace(req, res, next) {
    const id = req.params.id;
    let backlog = req.body.backlog || "";
    let toDo = req.body.toDo || "";
    let inProgress = req.body.inProgress || "";
    let done = req.body.done || "";
    let startDate = req.body.startDate || "";
    let endDate = req.body.endDate || "";

    let sprint = {
        _backlog: backlog,
        _toDo: toDo,
        _inProgress: inProgress,
        _done: done,
        _startDate: startDate,
        _endDate: endDate
    };

    Sprint.findOneAndUpdate({ "_id": id }, sprint)
        .then(obj => res.status(200).json({
            msg: "Se reemplazó el sprint",
            obj: obj
        })).catch(ex => res.status(500).json({
            msg: "No se pudo reemplazar el sprint",
            obj: ex
        }));
}

function update(req, res, next) {
    const id = req.params.id;
    let backlog = req.body.backlog;
    let toDo = req.body.toDo;
    let inProgress = req.body.inProgress;
    let done = req.body.done;
    let startDate = req.body.startDate;
    let endDate = req.body.endDate;

    let sprint = {};
    if (backlog) sprint._backlog = backlog;
    if (toDo) sprint._toDo = toDo;
    if (inProgress) sprint._inProgress = inProgress;
    if (done) sprint._done = done;
    if (startDate) sprint._startDate = startDate;
    if (endDate) sprint._endDate = endDate;

    Sprint.findOneAndUpdate({ "_id": id }, sprint)
        .then(obj => res.status(200).json({
            msg: "Se actualizó el sprint",
            obj: obj
        })).catch(ex => res.status(500).json({
            msg: "No se pudo actualizar el sprint",
            obj: ex
        }));
}

function destroy(req, res, next) {
    const id = req.params.id;
    Sprint.findOneAndDelete({ "_id": id }).then(obj => res.status(200).json({
        msg: "Sprint eliminado correctamente",
        obj: obj
    }))
        .catch(ex => res.status(500).json({
            msg: "No se pudo eliminar el sprint",
            obj: ex
        }));
}

module.exports = { create, list, index, replace, update, destroy };
