var config = require('config');
var toolkit = require('microservice-toolkit').initFromConfig(config);
var log = toolkit.logger;
var metrics = toolkit.metrics;
var context = toolkit.context;
var http = toolkit.http;

const storage = require('./src/services/storage');

// Listen on a specific message bus
context.consumeShared(
    "articles",
    ["article-identified"],
    config.get('name') + '.article-identified',
    handler
);



function handler( message ) {
    var article = message.article;
    article.platform = message.platform;

    return storage.storeArticle(article)
        .then(() => {
            return message;
        })
        .catch(err => handleError(err, message));
}

function handleError( err, message ){
    log.error(err);

    return message;
}