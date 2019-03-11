const express = require("express");
const {isAdmin, isAutomobiliste, authenticated} = require("../../services/acl");
const Manufacturer = require("./model");
const ObjectId = require("mongoose").Types.ObjectId;
const fs = require("fs-extra");
const formidable = require("formidable");

exports.index = () => [
    isAdmin,
    isAutomobiliste,
    authenticated,
    listAll
]

exports.create = () => [
    isAdmin,
    authenticated,
    createManufacturer
]

exports.deleteOne = () => [
    isAdmin,
    authenticated,
    deleteManufacturer
]

const listAll = async (req, res, next) => {
    const query = Manufacturer.getQueryObject(req.query)
    const perpage = parseInt(req.query.perpage)
    const page = parseInt(req.query.page)
    let skip = (page - 1) * perpage
    skip = skip < 0 ? 0 : skip
    try {
        const Manufacturers = await Manufacturer.find(query)
            .skip(skip)
            .limit(perpage)
            .select(req.query.select)
            .sort(req.query.sort)
            .exec()
        res.json({
            Manufacturers
        })
    } catch (error) {
        res.json(error)
    }
}

const createManufacturer = async (req, res, next) => {
    const fab = {
        marque: req.body.marque
    };
    if (!fab.marque)
        return res.json({
            error: true,
            msg: "empty marque field"
        });
    try {
        const Manufacturer = await new Manufacturer(fab).save()
        res.json(Manufacturer)
    } catch (error) {
        res.json(error);
    }
}


// function createManufacturer(req, res, next) {
//     let form = formidable.IncomingForm();
//     form.maxFileSize = 20 * 1024 ** 2;
//     form.keepExtensions = true;

//     form.parse(req, (err, fields, files) => {
//         if (!fields.marque) return res.json({
//             error: true,
//             msg: "empty marque field"
//         });
//         const fab = {marque: fields.marque};
//         new Manufacturer(fab).save()
//             .then(newFab => {
//                 if (files.logo) {
//                     let ext = files.logo.name.split(".").pop();
//                     const logoPath = `public/images/${newFab.id}.${ext}`;
//                     fs.copy(files.logo.path, `./${logoPath}`)
//                         .then(() => {
//                             newFab.logo = `/${logoPath}`;
//                             res.json(newFab);
//                         })
//                         .catch(err => {
//                             newFab.error = err;
//                             res.json(newFab);
//                         });
//                     return
//                 }
//                 res.json(newFab);
//             })
//             .catch(err => {
//                 res.json(err);
//                 next(err);
//             });
//     });
// }

const deleteManufacturer = async (req, res, next) => {
    const isValid = ObjectId.isValid(req.params.id);
    if (!isValid) return res.json({
        error: true,
        msg: "bad Manufacturer id"
    });
    const fab = {
        _id: req.params.id
    };
    try {
        const result = await Manufacturer.deleteOne(fab);
        res.json(result)
    } catch (error) {
        res.json(error)
    }
}