const express = require('express');
const bcrypt = require('bcrypt');
const config = require('config');
const jwt = require('jsonwebtoken');
const User = require('../models/user');

function home(req, res, next){
    res.render('index', { title: 'Express' });
}

function login(req, res, next) {
    const email = req.body.email;
    const password = req.body.password;
    const jwtKey = config.get('secret.key');

    User.findOne({ email: email }).then(user => {
        if (user) {
            bcrypt.hash(password, user.salt, (err, hash) => {
                if (err) {
                    return res.status(403).json({
                        msg: res.__('login.fail'),
                        obj: null
                    });
                }

                if (hash === user.password) {
                    return res.status(200).json({
                        msg: res.__('login.ok'),
                        obj: jwt.sign({
                            data: user.id,
                            exp: Math.floor(Date.now() / 1000) + 1000*60*60*24
                        }, jwtKey)
                    });
                } else {
                    return res.status(403).json({
                        msg: res.__('login.fail'),
                        obj: null
                    });
                }
            });
        } else {
            return res.status(403).json({
                msg: res.__('login.fail'),
                obj: null
            });
        }
    }).catch(err => {
        res.status(500).json({
            msg: res.__('login.fail'),
            obj: err
        });
    });
}


module.exports = {home, login};
