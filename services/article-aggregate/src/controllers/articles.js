'use strict';

const url = require('url');
const storage = require('../services/storage');
const log = require('microservice-toolkit').logger;


module.exports.getRecent = function addUser (req, res, next) {
    let limit = req.swagger.params.limit.value;

    return storage.getMostRecent(limit)
        .then(articles => {
            return res.json(articles)
        })
        .catch(err => {
            log.error(err);

            return res.status(500).end();
        })
};