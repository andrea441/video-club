const express = require('express');
const bcrypt = require('bcrypt');
const User = require('../models/user');

async function create(req, res, next) {
    try {
        const { user, email, password, socialMediaList = [], role } = req.body;

        if (!user || !email || !password) {
            return res.status(400).json({
                msg: "Todos los campos (user, email, password) son obligatorios"
            });
        }

        const salt = await bcrypt.genSalt(10);
        const passwordHash = await bcrypt.hash(password, salt);

        const newUser = new User({
            _user: user,
            _email: email,
            _password: passwordHash,
            _socialMediaList: socialMediaList,
            _role: role,
            _salt: salt
        });

        const savedUser = await newUser.save();
        res.status(200).json({
            msg: "Usuario creado correctamente",
            obj: savedUser
        });
    } catch (ex) {
        res.status(500).json({
            msg: "No se pudo almacenar el usuario",
            obj: ex.message
        });
    }
}

function list(req, res, next) {
    let page = req.params.page ? req.params.page : 1;
    const options = {
        page: page,
        limit: 5
    };
    User.paginate({}, options).then(objs => res.status(200).json({
        msg: "Lista de usuarios",
        obj: objs
    })).catch(ex => res.status(500).json({
        msg: "No se pudo consultar la lista de usuarios",
        obj: ex
    }));
}

function index(req, res, next) {
    const id = req.params.id;
    User.findOne({"_id": id}).then(obj => res.status(200).json({
        msg: `Usuario con el id ${id}`,
        obj: obj
    }))
    .catch(ex => res.status(500).json({
        msg: "No se pudo consultar el usuario",
        obj: ex
    }));
}

function replace(req, res, next) {
    const id = req.params.id;
    let user = req.body.user ? req.body.user : "";
    let email = req.body.email ? req.body.email : "";
    let password = req.body.password ? req.body.password : "";
    let socialMediaList = req.body.socialMediaList ? req.body.socialMediaList : [];
    let role = req.body.role ? req.body.role : "";

    let updatedUser = new Object({
        _user: user,
        _email: email,
        _password: password,
        _socialMediaList: socialMediaList,
        _role: role
    });

    User.findOneAndUpdate({"_id": id}, updatedUser)
        .then(obj => res.status(200).json({
            msg: "Se reemplazó el usuario",
            obj: obj
        })).catch(ex => res.status(500).json({
            msg: "No se pudo reemplazar el usuario",
            obj: ex
        }));
}

function update(req, res, next) {
    const id = req.params.id;
    let user = req.body.user;
    let email = req.body.email;
    let password = req.body.password;
    let socialMediaList = req.body.socialMediaList;
    let role = req.body.role;

    let updatedUser = new Object();
    if (user) updatedUser._user = user;
    if (email) updatedUser._email = email;
    if (password) updatedUser._password = password;
    if (socialMediaList) updatedUser._socialMediaList = socialMediaList;
    if (role) updatedUser._role = role;

    User.findOneAndUpdate({"_id": id}, updatedUser)
        .then(obj => res.status(200).json({
            msg: "Se actualizó el usuario",
            obj: obj
        })).catch(ex => res.status(500).json({
            msg: "No se pudo actualizar el usuario",
            obj: ex
        }));
}

function destroy(req, res, next) {
    const id = req.params.id;
    User.findOneAndDelete({"_id": id}).then(obj => res.status(200).json({
        msg: "Usuario eliminado correctamente",
        obj: obj
    }))
    .catch(ex => res.status(500).json({
        msg: "No se pudo eliminar el usuario",
        obj: ex
    }));
}

module.exports = { create, list, index, replace, update, destroy };
