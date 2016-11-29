module.exports = {
    identifyArticle: identifyArticle
};

const persistence = require('../persistence/memory');
const crypto = require('crypto');
const uuid = require('uuid');

function identifyArticle( article ){
    if( ! validate(article) ){
        return Promise.reject('invalid article');
    }

    var hash = makeHash(article);

    return persistence.find(hash)
        .then(result => {
            if( ! result ){
                var id = uuid.v4();
                return persistence.save(hash, id)
                    .then(() => {
                        article.id = id;
                        return article;
                    })
            } else {
                article.id = result;
                return article;
            }
        })
}

function validate( article ){
    if( typeof article.title !== 'string' ){
        return false;
    }

    return true;
}

function makeHash( article ){
    const shasum = crypto.createHash('sha1');
    shasum.update( article.title );

    return shasum.digest('hex');
}