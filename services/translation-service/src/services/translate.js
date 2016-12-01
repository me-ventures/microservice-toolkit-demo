module.exports = {
    translateArticle: translateArticle
};

const request = require('request-promise');
const metrics = require('microservice-toolkit').metrics;
const context = require('microservice-toolkit').context;

function translateArticle( article ){
    return request({
        uri: (
            '/get?q=' + article.title
            + '&de=maikel.eva.ventures@gmail.com'
            + '&langpair=English|Dutch'
        ),
        baseUrl: 'http://api.mymemory.translated.net/'
    })
        .then(res => {
            res = JSON.parse(res);

            if( ! res.matches || ! res.matches.length ){
                metrics.increment('translation-not-found');
                return Promise.resolve();
            }

            let translations = {
                dutch: res.matches[0].translation
            };

            context.publishToExchange(
                'articles',
                "article-translated",
                {
                    id: article.id,
                    translations: translations
                }
            );
        });
}