module.exports = {
    storeArticle: storeArticle,
    storeTranslation: storeTranslation,
    getMostRecent: getMostRecent
};

const persistence = require('../persistence/memory');

function storeArticle( article ){
    return persistence.saveArticle(article.id, article);
}

function storeTranslation( translation ){
    return persistence.saveTranslation(translation.id, translation.translations);
}

function getMostRecent( limit ){
    return persistence.getMostRecent(limit);
}
