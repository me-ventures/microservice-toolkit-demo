module.exports = {
    save: save,
    find: find
};

const storage = {};


function find( hash ){
    return Promise.resolve( storage[hash] || null );
}

function save( hash, identifier ){
    storage[hash] = identifier;

    return Promise.resolve();
}