const express = require('express');
const Release = require('../models/release');

function create(req, res, next) {
    const version = req.body.version;
    const retrospective = req.body.retrospective || [];
    const sprints = req.body.sprints || [];

    let release = new Release({
        _version: version,
        _retrospective: retrospective,
        _sprints: sprints
    });

    release.save()
        .then(obj => res.status(200).json({
            msg: "Release creada correctamente",
            obj: obj
        }))
        .catch(ex => res.status(500).json({
            msg: "No se pudo almacenar la release",
            obj: ex
        }));
}

function list(req, res, next) {
    let page = req.params.page ? req.params.page : 1;
    const options = {
        page: page,
        limit: 5
    };

    Release.paginate({}, options)
        .then(objs => res.status(200).json({
            msg: "Lista de releases",
            obj: objs
        }))
        .catch(ex => res.status(500).json({
            msg: "No se pudo consultar la lista de releases",
            obj: ex
        }));
}

function index(req, res, next) {
    const id = req.params.id;
    Release.findOne({ "_id": id })
        .then(obj => res.status(200).json({
            msg: `Release con el id ${id}`,
            obj: obj
        }))
        .catch(ex => res.status(500).json({
            msg: "No se pudo consultar la release",
            obj: ex
        }));
}

function replace(req, res, next) {
    const id = req.params.id;
    const version = req.body.version || "";
    const retrospective = req.body.retrospective || [];
    const sprints = req.body.sprints || [];

    let release = {
        _version: version,
        _retrospective: retrospective,
        _sprints: sprints
    };

    Release.findOneAndUpdate({ "_id": id }, release, { new: true })
        .then(obj => res.status(200).json({
            msg: "Se reemplazó la release",
            obj: obj
        }))
        .catch(ex => res.status(500).json({
            msg: "No se pudo reemplazar la release",
            obj: ex
        }));
}

function update(req, res, next) {
    const id = req.params.id;
    let release = {};

    if (req.body.version) release._version = req.body.version;
    if (req.body.retrospective) release._retrospective = req.body.retrospective;
    if (req.body.sprints) release._sprints = req.body.sprints;

    Release.findOneAndUpdate({ "_id": id }, release, { new: true })
        .then(obj => res.status(200).json({
            msg: "Se actualizó la release",
            obj: obj
        }))
        .catch(ex => res.status(500).json({
            msg: "No se pudo actualizar la release",
            obj: ex
        }));
}

function destroy(req, res, next) {
    const id = req.params.id;
    Release.findOneAndDelete({ "_id": id })
        .then(obj => res.status(200).json({
            msg: "Release eliminada correctamente",
            obj: obj
        }))
        .catch(ex => res.status(500).json({
            msg: "No se pudo eliminar la release",
            obj: ex
        }));
}

module.exports = { create, list, index, replace, update, destroy };
