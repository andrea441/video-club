const express = require('express');
const Skill = require('../models/skill');

function create(req, res, next) {
    const description = req.body.description;
    const level = req.body.level;

    let skill = new Skill({
        _description: description,
        _level: level
    });

    skill.save().then(obj => res.status(200).json({
        msg: "Habilidad creada correctamente",
        obj: obj
    })).catch(ex => res.status(500).json({
        msg: "No se pudo almacenar la habilidad",
        obj: ex
    }));
}

function list(req, res, next) {
    let page = req.params.page ? req.params.page : 1;
    const options = {
        page: page,
        limit: 5
    };
    Skill.paginate({}, options).then(objs => res.status(200).json({
        msg: "Lista de habilidades",
        obj: objs
    })).catch(ex => res.status(500).json({
        msg: "No se pudo consultar la lista de habilidades",
        obj: ex
    }));
}

function index(req, res, next) {
    const id = req.params.id;
    Skill.findOne({"_id":id}).then(obj => res.status(200).json({
        msg: `Habilidad con el id ${id}`,
        obj: obj
    }))
    .catch(ex => res.status(500).json({
        msg: "No se pudo consultar la habilidad",
        obj: ex
    }));
}

function replace(req, res, next) {
    const id = req.params.id;
    let description = req.body.description ? req.body.description : "";
    let level = req.body.level ? req.body.level : "";

    let skill = new Object({
        _description: description,
        _level: level
    });

    Skill.findOneAndUpdate({"_id":id}, skill)
        .then(obj => res.status(200).json({
            msg: "Se reemplazó la habilidad",
            obj: obj
        })).catch(ex => res.status(500).json({
            msg: "No se pudo reemplazar la habilidad",
            obj: ex
        }));
}

function update(req, res, next) {
    const id = req.params.id;
    let description = req.body.description;
    let level = req.body.level;

    let skill = new Object();
    if(description) skill._description = description;
    if(level) skill._level = level;

    Skill.findOneAndUpdate({"_id":id}, skill)
    .then(obj => res.status(200).json({
        msg: "Se actualizó la habilidad",
        obj: obj
    })).catch(ex => res.status(500).json({
        msg: "No se pudo actualizar la habilidad",
        obj: ex
    }));
}

function destroy(req, res, next) {
    const id = req.params.id;
    Skill.findOneAndDelete({"_id": id}).then(obj => res.status(200).json({
        msg: "Habilidad eliminada correctamente",
        obj: obj
    }))
    .catch(ex => res.status(500).json({
        msg: "No se pudo eliminar la habilidad",
        obj: ex
    }));
}

module.exports = { create, list, index, replace, update, destroy };