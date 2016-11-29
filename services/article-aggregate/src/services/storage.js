module.exports = {
    storeArticle: storeArticle,
    storeTranslation: storeTranslation
};

const persistence = require('../persistence/memory');

function storeArticle( article ){
    return persistence.saveArticle(article.id, article);
}

function storeTranslation( translation ){
    return persistence.saveTranslation(translation.id, translation);
}
