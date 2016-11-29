module.exports = {
    save: save
};

const storage = {};
const metrics = require('microservice-toolkit').metrics;

function save( id, article ){
    storage[id] = article;

    metrics.gauge('storage-size', Object.keys(storage).length);

    return Promise.resolve();
}