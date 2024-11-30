const express = require('express');
const Developer = require('../models/developer');

function create(req, res, next) {
    const name = req.body.name;
    const lastName = req.body.lastName;
    const birthDate = req.body.birthDate;
    const CURP = req.body.CURP;
    const RFC = req.body.RFC;
    const skills = req.body.skills || [];

    let address = new Object();
    address.street = req.body.street;
    address.number = req.body.number;
    address.zip = req.body.zip;
    address.city = req.body.city;
    address.state = req.body.state;
    address.country = req.body.country;

    let developer = new Developer({
        _name: name,
        _lastName: lastName,
        _birthDate: birthDate,
        _CURP: CURP,
        _RFC: RFC,
        _address: address,
        _skills: skills,
    });

    developer.save()
        .then(obj => res.status(200).json({
            msg: "Developer creado correctamente",
            obj: obj
        }))
        .catch(ex => res.status(500).json({
            msg: "No se pudo crear al developer",
            obj: ex
        }));
}

function list(req, res, next) {
    let page = req.params.page ? req.params.page : 1;
    const options = {
        page: page,
        limit: 5
    };

    Developer.paginate({}, options)
        .then(objs => res.status(200).json({
            msg: "Lista de developers",
            obj: objs
        }))
        .catch(ex => res.status(500).json({
            msg: "No se pudo obtener la lista de developers",
            obj: ex
        }));
}

function index(req, res, next) {
    const id = req.params.id;

    Developer.findOne({ "_id": id })
        .then(obj => res.status(200).json({
            msg: `Developer con el id ${id}`,
            obj: obj
        }))
        .catch(ex => res.status(500).json({
            msg: "No se pudo consultar al developer",
            obj: ex
        }));
}

function replace(req, res, next) {
    const id = req.params.id;

    let address = new Object();
    address.street = req.body.street || "";
    address.number = req.body.number || "";
    address.zip = req.body.zip || 0;
    address.city = req.body.city || "";
    address.state = req.body.state || "";
    address.country = req.body.country || "";

    let name = req.body.name ? req.body.name : "";
    let lastName = req.body.lastName ? req.body.lastName : "";
    let birthDate = req.body.birthDate ? req.body.birthDate : null;
    let CURP = req.body.CURP ? req.body.CURP : "";
    let RFC = req.body.RFC ? req.body.RFC : "";
    let skills = req.body.skills ? req.body.skills : [];

    let developer = {
        name: name,
        lastName: lastName,
        birthDate: birthDate,
        CURP: CURP,
        RFC: RFC,
        address: address,
        skills: skills,
    };

    Developer.findOneAndUpdate({ "_id": id }, developer)
        .then(obj => res.status(200).json({
            msg: "Se reemplazó el developer",
            obj: obj
        }))
        .catch(ex => res.status(500).json({
            msg: "No se pudo reemplazar al developer",
            obj: ex
        }));
}

function update(req, res, next) {
    const id = req.params.id;

    let updates = {};
    if (req.body.name) updates.name = req.body.name;
    if (req.body.lastName) updates.lastName = req.body.lastName;
    if (req.body.birthDate) updates.birthDate = req.body.birthDate;
    if (req.body.CURP) updates.CURP = req.body.CURP;
    if (req.body.RFC) updates.RFC = req.body.RFC;

    let address = new Object();
    if (req.body.street) address.street = req.body.street;
    if (req.body.number) address.number = req.body.number;
    if (req.body.zip) address.zip = req.body.zip;
    if (req.body.city) address.city = req.body.city;
    if (req.body.state) address.state = req.body.state;
    if (req.body.country) address.country = req.body.country;

    if (Object.keys(address).length > 0) updates.address = address;

    if (req.body.skills) updates.skills = req.body.skills;

    Developer.findOneAndUpdate({ "_id": id }, updates)
        .then(obj => res.status(200).json({
            msg: "Se actualizó al developer",
            obj: obj
        }))
        .catch(ex => res.status(500).json({
            msg: "No se pudo actualizar al developer",
            obj: ex
        }));
}

function destroy(req, res, next) {
    const id = req.params.id;

    Developer.findByIdAndDelete({ "_id": id })
        .then(obj => res.status(200).json({
            msg: "Developer eliminado correctamente",
            obj: obj
        }))
        .catch(ex => res.status(500).json({
            msg: "No se pudo eliminar al developer",
            obj: ex
        }));
}

module.exports = { create, list, index, replace, update, destroy };
