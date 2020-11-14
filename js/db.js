var dbPromised = idb.open("club", 1, function (upgradeDb) {
    var articlesObjectStore = upgradeDb.createObjectStore("club", {
        keyPath: "id"
    });
    articlesObjectStore.createIndex("id", "id", {unique: true});
});

function addToFavorite(club) {
    dbPromised
    .then(function (db) {
        var tx = db.transaction("club", "readwrite");
        var store = tx.objectStore("club");
        store.add(club);
        return tx.complete;
    })
    .then(function () {
        console.log("Tim berhasil ditambahkan ke favorit");
    })
}

function getAll() {
    return new Promise(function (resolve, reject) {
        dbPromised
        .then(function (db) {
            var tx = db.transaction("club", "readonly");
            var store = tx.objectStore("club");
            return store.getAll();
        })
        .then(function (clubs) {
            resolve(clubs);
        })
    })
}

function getById(id) {
    return new Promise(function (resolve, reject) {
        dbPromised
        .then(function (db) {
            var tx = db.transaction("club", "readonly");
            var store = tx.objectStore("club");
            return store.get(id);
        })
        .then(function (club) {
            resolve(club);
        })
    })
}

function deleteById(id) {
    dbPromised
    .then(function (db) {
        var tx = db.transaction("club", "readwrite");
        var store = tx.objectStore("club");
        store.delete(id);
        return tx.complete;
    })
    .then(function (club) {
        console.log("Berhasil dihapus dari daftar favorit");
    })
}