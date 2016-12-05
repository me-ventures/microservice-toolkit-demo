var config = require('config');
var toolkit = require('microservice-toolkit').initFromConfig(config);
var log = toolkit.logger;
var metrics = toolkit.metrics;
var context = toolkit.context;
var http = toolkit.http;


setInterval(() => {
    log.error('this is a test error');
}, 5000);