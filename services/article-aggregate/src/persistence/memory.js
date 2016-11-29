module.exports = {
    saveArticle: saveArticle,
    saveTranslation: saveTranslation
};

const articleStorage = {};
const translationStorage = {};
const metrics = require('microservice-toolkit').metrics;

function saveArticle(id, article ){
    articleStorage[id] = article;

    metrics.gauge('article-storage-size', Object.keys(articleStorage).length);

    return Promise.resolve();
}

function saveTranslation(id, translation ){
    translationStorage[id] = translation;

    metrics.gauge('translation-storage-size', Object.keys(translationStorage).length);

    return Promise.resolve();
}