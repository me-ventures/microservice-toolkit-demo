module.exports = {
    saveArticle: saveArticle,
    saveTranslation: saveTranslation,
    getMostRecent: getMostRecent
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

function getMostRecent(limit) {
    let recentArticles = [];
    let keys = Object.keys(articleStorage);

    if( keys.length < 1 ){
        return Promise.resolve([]);
    }

    for( let i = keys.length - 1; i >= keys.length - limit && i >= 0; i-- ){
        let article = articleStorage[keys[i]];

        article.translations = translationStorage[keys[i]];

        recentArticles.push(article);
    }

    return Promise.resolve(recentArticles);
}