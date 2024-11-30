const express = require('express');
const Role = require('../models/role');

function create(req, res, next) {
    const name = req.body.name;
    const permission = req.body.permission || [];

    let role = new Role({
        _name: name,
        _permission: permission
    });

    role.save()
        .then(obj => res.status(200).json({
            msg: "Rol creado correctamente",
            obj: obj
        }))
        .catch(ex => res.status(500).json({
            msg: "No se pudo crear el rol",
            obj: ex
        }));
}

function list(req, res, next) {
    let page = req.params.page ? req.params.page : 1;
    const options = {
        page: page,
        limit: 5
    };

    Role.paginate({}, options)
        .then(objs => res.status(200).json({
            msg: "Lista de rols",
            obj: objs
        }))
        .catch(ex => res.status(500).json({
            msg: "No se pudo obtener la lista de rols",
            obj: ex
        }));
}

function index(req, res, next) {
    const id = req.params.id;

    Role.findOne({ "_id": id })
        .then(obj => res.status(200).json({
            msg: `Rol con el id ${id}`,
            obj: obj
        }))
        .catch(ex => res.status(500).json({
            msg: "No se pudo consultar el rol",
            obj: ex
        }));
}

function replace(req, res, next) {
    const id = req.params.id;
    let name = req.body.name ? req.body.name : "";
    let permission = req.body.permission ? req.body.permission : "";

    let role = {
        name: name,
        permission: permission
    };

    Role.findOneAndUpdate({ "_id": id }, role)
        .then(obj => res.status(200).json({
            msg: "Se reemplazó el rol",
            obj: obj
        }))
        .catch(ex => res.status(500).json({
            msg: "No se pudo reemplazar el rol",
            obj: ex
        }));
}

function update(req, res, next) {
    const id = req.params.id;

    let updates = {};
    if (req.body.name) updates.name = req.body.name;
    if (req.body.permission) updates.permission = req.body.permission;

    Role.findOneAndUpdate({ "_id": id }, updates)
        .then(obj => res.status(200).json({
            msg: "Se actualizó el rol",
            obj: obj
        }))
        .catch(ex => res.status(500).json({
            msg: "No se pudo actualizar el rol",
            obj: ex
        }));
}

function destroy(req, res, next) {
    const id = req.params.id;

    Role.findByIdAndDelete({ "_id": id })
        .then(obj => res.status(200).json({
            msg: "Rol eliminado correctamente",
            obj: obj
        }))
        .catch(ex => res.status(500).json({
            msg: "No se pudo eliminar el rol",
            obj: ex
        }));
}

module.exports = { create, list, index, replace, update, destroy };