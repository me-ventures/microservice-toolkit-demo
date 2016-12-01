var config = require('config');
var toolkit = require('microservice-toolkit').initFromConfig(config);
var log = toolkit.logger;
var metrics = toolkit.metrics;
var context = toolkit.context;
var http = toolkit.http;

const idService = require('./src/services/id-service');

http.addRouter('/', require('./src/routes/example'));

// Listen on a specific message bus
context.consumeShared(
    "articles",
    ["new-article"],
    config.get('name') + '.new-article',
    handler
);


function handler(message) {
    return idService.identifyArticle(message.article)
        .then(article => {
            if( article ){
                context.publishToExchange(
                    'articles',
                    'article-identified',
                    {
                        platform: message.platform,
                        article: article
                    }
                );
            }

            return message;
        })
        .catch(err => handleError(err, message));
}

function handleError( err, message ){
    log.error(err);

    return message;
}
