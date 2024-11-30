const express = require('express');
const Retrospective = require('../models/retrospective');

function create(req, res, next) {
    const date = req.body.date;
    const comment = req.body.comment;

    let retrospective = new Retrospective({
        _date: date,
        _comment: comment
    });

    retrospective.save().then(obj => res.status(200).json({
        msg: "Retrospectiva creada correctamente",
        obj: obj
    })).catch(ex => res.status(500).json({
        msg: "No se pudo almacenar la retrospectiva",
        obj: ex
    }));
}

function list(req, res, next) {
    let page = req.params.page ? req.params.page : 1;
    const options = {
        page: page,
        limit: 5
    };
    Retrospective.paginate({}, options).then(objs => res.status(200).json({
        msg: "Lista de retrospectivas",
        obj: objs
    })).catch(ex => res.status(500).json({
        msg: "No se pudo consultar la lista de retrospectivas",
        obj: ex
    }));
}

function index(req, res, next) {
    const id = req.params.id;
    Retrospective.findOne({ "_id": id }).then(obj => res.status(200).json({
        msg: `Retrospectiva con el id ${id}`,
        obj: obj
    }))
        .catch(ex => res.status(500).json({
            msg: "No se pudo consultar la retrospectiva",
            obj: ex
        }));
}

function replace(req, res, next) {
    const id = req.params.id;
    let date = req.body.date ? req.body.date : "";
    let comment = req.body.comment ? req.body.comment : "";

    let retrospective = new Object({
        _date: date,
        _comment: comment
    });

    Retrospective.findOneAndUpdate({ "_id": id }, retrospective)
        .then(obj => res.status(200).json({
            msg: "Se reemplazó la retrospectiva",
            obj: obj
        })).catch(ex => res.status(500).json({
            msg: "No se pudo reemplazar la retrospectiva",
            obj: ex
        }));
}

function update(req, res, next) {
    const id = req.params.id;
    let date = req.body.date;
    let comment = req.body.comment;

    let retrospective = new Object();
    if (date) retrospective._date = date;
    if (comment) retrospective._comment = comment;

    Retrospective.findOneAndUpdate({ "_id": id }, retrospective)
        .then(obj => res.status(200).json({
            msg: "Se actualizó la retrospectiva",
            obj: obj
        })).catch(ex => res.status(500).json({
            msg: "No se pudo actualizar la retrospectiva",
            obj: ex
        }));
}

function destroy(req, res, next) {
    const id = req.params.id;
    Retrospective.findOneAndDelete({ "_id": id }).then(obj => res.status(200).json({
        msg: "Retrospectiva eliminada correctamente",
        obj: obj
    }))
        .catch(ex => res.status(500).json({
            msg: "No se pudo eliminar la retrospectiva",
            obj: ex
        }));
}

module.exports = { create, list, index, replace, update, destroy };
