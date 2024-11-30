const express = require('express');
const Board = require('../models/board');

function create(req, res, next) {
    const columnProductBacklog = req.body.columnProductBacklog;
    const columnsReleaseBacklog = req.body.columnsReleaseBacklog;

    let board = new Board({
        _columnProductBacklog: columnProductBacklog,
        _columnsReleaseBacklog: columnsReleaseBacklog
    });

    board.save().then(obj => res.status(200).json({
        msg: "Tablero creado correctamente",
        obj: obj
    })).catch(ex => res.status(500).json({
        msg: "No se pudo crear el tablero",
        obj: ex
    }));
}

function list(req, res, next) {
    let page = req.params.page ? req.params.page : 1;
    const options = {
        page: page,
        limit: 5
    };

    Board.paginate({}, options).then(objs => res.status(200).json({
        msg: "Lista de tableros",
        obj: objs
    })).catch(ex => res.status(500).json({
        msg: "No se pudo consultar la lista de tableros",
        obj: ex
    }));
}

function index(req, res, next) {
    const id = req.params.id;
    Board.findOne({"_id":id}).then(obj => res.status(200).json({
        msg: `Tablero con el id ${id}`,
        obj: obj
    }))
    .catch(ex => res.status(500).json({
        msg: "No se pudo consultar el tablero",
        obj: ex
    }));
}

function replace(req, res, next) {
    const id = req.params.id;
    let columnProductBacklog = req.body.columnProductBacklog ? req.body.columnProductBacklog: "";
    let columnsReleaseBacklog = req.body.columnsReleaseBacklog ? req.body.columnsReleaseBacklog: "";

    let board = new Object({
        _columnProductBacklog: columnProductBacklog,
        _columnsReleaseBacklog: columnsReleaseBacklog
    })

    Board.findOneAndUpdate({"_id":id}, board)
    .then(obj => res.status(200).json({
        msg: "Se reemplazo el tablero",
        obj: obj
    })).catch(ex => res.status(500).json({
        msg: "No se pudo reemplazar el tablero",
        obj: ex
    }));
}

function update(req, res, next) {
    const id = req.params.id;
    let columnProductBacklog = req.body.columnProductBacklog;
    let columnsReleaseBacklog = req.body.columnsReleaseBacklog;

    let board = new Object();
    if(columnProductBacklog) board._columnProductBacklog = columnProductBacklog;
    if(columnsReleaseBacklog) board._columnsReleaseBacklog = columnsReleaseBacklog;

    Board.findOneAndUpdate({"_id":id},board)
        .then(obj => res.status(200).json({
            msg: "Se actualizo el tablero",
            obj: obj
        })).catch(ex => res.status(500).json({
            msg: "No se pudo actualizar el tablero",
            obj: ex
        }));
}

function destroy(req, res, next) {
    const id = req.params.id;
    Board.findOneAndDelete({"_id":id}).then(obj => res.status(200).json({
        msg: "Tablero eliminado correctamente",
        obj: obj
    }))
    .catch(ex => res.status(500).json({
        msg: "No se pudo eliminar el tablero",
        obj: ex
    }));
}

module.exports = {create, list, index, replace, update, destroy};
