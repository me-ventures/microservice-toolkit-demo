module.exports = {
    storeArticle: storeArticle
};

const persistence = require('../persistence/memory');
const context = require('microservice-toolkit').context;

function storeArticle( article ){
    return persistence.save(article.id, article)
        .then(() => {
            context.publishToExchange(
                'articles',
                'article-updated',
                article
            );
        })
}
