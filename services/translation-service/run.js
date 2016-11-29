var config = require('config');
var toolkit = require('microservice-toolkit').initFromConfig(config);
var log = toolkit.logger;
var metrics = toolkit.metrics;
var context = toolkit.context;
var http = toolkit.http;


const translate = require('./src/services/translate');

// Listen on a specific message bus
context.consumeShared(
    "articles",
    ["article-updated"],
    config.get('name') + '.article-updated',
    handleArticleUpdated
);



function handleArticleUpdated( message ) {
    return translate.translateArticle(message)
        .then(() => {
            return message;
        })
        .catch(err => handleError(err, message));

}