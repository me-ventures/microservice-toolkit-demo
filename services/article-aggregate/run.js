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
    ["article-updated"],
    config.get('name') + '.article-updated',
    handleArticleUpdated
);

context.consumeShared(
    "articles",
    ["article-translated"],
    config.get('name') + '.article-translated',
    handleArticleTranslated
);


function handleArticleTranslated( message ) {
    return storage.storeTranslation(message)
        .then(() => {
            return message;
        })
        .catch(err => handleError(err, message));

}

function handleArticleUpdated( message ) {
    return storage.storeArticle(message)
        .then(() => {
            return message;
        })
        .catch(err => handleError(err, message));

}

function handleError( err, message ){
    log.error(err);

    return message;
}

http.addMiddleware(function (req, res, next) {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'GET,POST,OPTIONS');
    res.header('Access-Control-Allow-Headers',
        'Content-Type, Authorization, Content-Length, X-Requested-With, apikey'
    );

    if(req.method === 'OPTIONS') {
        return res.status(200).end();
    }

    next();
});

