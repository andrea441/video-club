const express = require('express');
const Project = require('../models/project');

function create(req, res, next) {
    const name = req.body.name;
    const requestDate = req.body.requestDate;
    const startDate = req.body.startDate;
    const description = req.body.description;
    const projectManager = req.body.projectManager;
    const productOwner = req.body.productOwner;
    const developmentTeam = req.body.developmentTeam || [];
    const board = req.body.board;

    let project = new Project({
        _name: name,
        _requestDate: requestDate,
        _startDate: startDate,
        _description: description,
        _projectManager: projectManager,
        _productOwner: productOwner,
        _developmentTeam: developmentTeam,
        _board: board
    });

    project.save().then(obj => res.status(200).json({
        msg: "Proyecto creado correctamente",
        obj: obj
    })).catch(ex => res.status(500).json({
        msg: "No se pudo almacenar el proyecto",
        obj: ex
    }));
}

function list(req, res, next) {
    let page = req.params.page ? req.params.page : 1;
    const options = {
        page: page,
        limit: 5
    };
    Project.paginate({}, options).then(objs => res.status(200).json({
        msg: "Lista de proyectos",
        obj: objs
    })).catch(ex => res.status(500).json({
        msg: "No se pudo consultar la lista de proyectos",
        obj: ex
    }));
}

function index(req, res, next) {
    const id = req.params.id;
    Project.findOne({"_id":id}).then(obj => res.status(200).json({
        msg: `Proyecto con el id ${id}`,
        obj: obj
    }))
    .catch(ex => res.status(500).json({
        msg: "No se pudo consultar el proyecto",
        obj: ex
    }));
}

function replace(req, res, next) {
    const id = req.params.id;
    let name = req.body.name ? req.body.name: "";
    let requestDate = req.body.requestDate ? req.body.requestDate: "";
    let startDate = req.body.startDate ? req.body.startDate: "";
    let description = req.body.description ? req.body.description: "";
    let projectManager = req.body.projectManager ? req.body.projectManager: "";
    let productOwner = req.body.productOwner ? req.body.productOwner: "";
    let developmentTeam = req.body.developmentTeam ? req.body.developmentTeam: "";
    let board = req.body.board ? req.body.board: "";

    let project = new Object({
        _name: name,
        _requestDate: requestDate,
        _startDate: startDate,
        _description: description,
        _projectManager: projectManager,
        _productOwner: productOwner,
        _developmentTeam: developmentTeam,
        _board: board
    });

    Project.findOneAndUpdate({"_id":id},project)
        .then(obj => res.status(200).json({
            msg: "Se reemplazó el proyecto",
            obj: obj
        })).catch(ex => res.status(500).json({
            msg: "No se pudo reemplazar el proyecto",
            obj: ex
        }));
}

function update(req, res, next) {
    const id = req.params.id;
    let name = req.body.name;
    let requestDate = req.body.requestDate;
    let startDate = req.body.startDate;
    let description = req.body.description ;
    let projectManager = req.body.projectManager;
    let productOwner = req.body.productOwner;
    let developmentTeam = req.body.developmentTeam;
    let board = req.body.board;

    let project = new Object();
    if(name) project._name = name;
    if(requestDate) project._requestDate = requestDate;
    if(startDate) project._startDate = startDate;
    if(description) project._description = description;
    if(projectManager) project._projectManager = projectManager;
    if(productOwner) project._productOwner = productOwner;
    if(developmentTeam) project._developmentTeam = developmentTeam;
    if(board) project._board = board;

    Project.findOneAndUpdate({"_id":id},project)
    .then(obj => res.status(200).json({
        msg: "Se actualizó el proyecto",
        obj: obj
    })).catch(ex => res.status(500).json({
        msg: "No se pudo actualizar el proyecto",
        obj: ex
    }));
}

function destroy(req, res, next) {
    const id = req.params.id;
    Project.findOneAndDelete({"_id": id}).then(obj => res.status(200).json({
        msg: "Proyecto eliminado correctamente",
        obj: obj
    }))
    .catch(ex => res.status(500).json({
        msg: "No se pudo eliminar el proyecto",
        obj: ex
    }));
}

module.exports = { create, list, index, replace, update, destroy };
