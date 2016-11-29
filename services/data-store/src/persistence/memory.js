module.exports = {
    save: save
};

const storage = {};

function save( id, article ){
    storage[id] = article;

    return Promise.resolve();
}