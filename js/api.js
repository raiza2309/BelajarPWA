var base_url_football_data = "https://api.football-data.org/v2";

let API_KEY = "68273d26b7e040b3bcfeab9f7b7006d5";

// Blok kode akan dipanggil jika fetch berhasil
function status(response) {
    if(response.status !== 200) {
        console.log("Error : " + response.status);
        // Method reject() akan membuat blok catch terpanggil
        return Promise.reject(new Error(response.statusText));
    } else {
        // Mengubah suatu objek menjadi Promise agar bisa "di-then-kan"
        return Promise.resolve(response);
    }
}

// Blok kode untuk memparsing json menjadi array JavaScript
function json(response) {
    return response.json();
}

// Blok kode untuk menghandle kesalahan di blok catch

function error(error) {
    // Parameter error berasal dari Promise.reject()
    console.log("Error : " + error);
}

// Blok kode untuk melakukan request data json
function cariKompetisi() {
    if('caches' in window){
        caches.match("assets/data/competitions.json").then(function (response) {
            if(response){
                response.json().then(function (data) {
                    // Objek/array JavaScript dari response.json() masuk lewat data.
                    var kontenLiga = "";
                    data.kompetisi.forEach(function (kompetisi) {
                        kontenLiga += `
                            <div class="card">
                                <a href="./clubs.html?id=${kompetisi.id}">
                                    <div class="card-image waves-effect waves-block waves-light">
                                        <img src="${kompetisi.logo}" alt="Logo ${kompetisi.namaLiga}">
                                    </div>
                                </a>
                                <div class="card-content">
                                    <span class="card-title truncate"><b>${kompetisi.liga}</b></span>
                                    <p>${kompetisi.namaLiga}</p>
                                </div>
                            </div>
                        `;
                    });

                    // Sisipkan komponen card ke dalam elemen dengan id #liga
                    document.getElementById("liga").innerHTML = kontenLiga;
                })
            }
        })
    }
    
    fetch("./assets/data/competitions.json")
    .then(status)
    .then(json)
    .then(function (data) {
        // Objek/array JavaScript dari response.json() masuk lewat data.
        var kontenLiga = "";
        data.kompetisi.forEach(function (kompetisi) {
            kontenLiga += `
                <div class="card">
                    <a href="./clubs.html?id=${kompetisi.id}">
                        <div class="card-image waves-effect waves-block waves-light">
                            <img src="${kompetisi.logo}" alt="Logo ${kompetisi.namaLiga}">
                        </div>
                    </a>
                    <div class="card-content">
                        <span class="card-title truncate"><b>${kompetisi.liga}</b></span>
                        <p>${kompetisi.namaLiga}</p>
                    </div>
                </div>
            `;
        });
        // Sisipkan komponen card ke dalam elemen dengan id #liga
        document.getElementById("liga").innerHTML += kontenLiga;
    })
    .catch(error);
}

function cariLiga() {
    // Ambil nilai query parameter (?id=)
    var urlParams = new URLSearchParams(window.location.search);
    var idParam = urlParams.get("id");
    if('caches' in window){
        caches.match(`${base_url_football_data}/competitions/${idParam}/teams`).then(function (response) {
            if(response){
                response.json().then(function (data) {
                    // Objek/array JavaScript dari response.json() masuk lewat data.
                    var kontenTim = "";
                    data.teams.forEach(function (tim) {
                        if (tim.crestUrl === null){
                            tim.crestUrl = "assets/img/Default Logo.png";
                        }
                        kontenTim += `
                            <div class="col s6 m4">
                                <div class="card medium">
                                    <a href="./clubs.html?id=${tim.id}">
                                        <div class="card-image waves-effect waves-block waves-light">
                                            <img src="${tim.crestUrl}" alt="Logo ${tim.name}" class="tim-logo">
                                        </div>
                                    </a>
                                    <div class="card-content">
                                        <span class="card-title truncate"><b>${tim.shortName}</b></span>
                                        <p>${tim.name}</p>
                                    </div>
                                </div>
                            </div>
                        `;
                    });

                    // Sisipkan komponen card ke dalam elemen dengan id #daftar-tim
                    document.getElementById("daftar-tim").innerHTML = kontenTim;
                })
            }
        })
    }

    fetch(`${base_url_football_data}/competitions/${idParam}/teams`, {
        method: "GET",
        headers: {
            "X-Auth-Token": API_KEY
        }
    })
    .then(status)
    .then(json)
    .then(function (data) {
        // Objek/array JavaScript dari response.json() masuk lewat data.

        // Menyusun komponen card artikel secara dinamis
        var kontenTim = "";
        data.teams.forEach(function (tim) {
            if (tim.crestUrl === null){
                tim.crestUrl = "assets/img/Default Logo.png";
            }
            kontenTim += `
                <div class="col s6 m4">
                    <div class="card medium">
                        <a href="./detail-club.html?id=${tim.id}">
                            <div class="card-image waves-effect waves-block waves-light">
                                <img src="${tim.crestUrl}" alt="Logo ${tim.name}" class="tim-logo">
                            </div>
                        </a>
                        <div class="card-content">
                            <span class="card-title truncate"><b>${tim.shortName}</b></span>
                            <p>${tim.name}</p>
                        </div>
                    </div>
                </div>
            `;
        });

        // Sisipkan komponen card ke dalam elemen dengan id #tim
        document.getElementById("daftar-tim").innerHTML = kontenTim;
    })
    .catch(error);
}

function detailClub() {
    return new Promise(function(resolve, reject){
        // Ambil nilai query parameter (?id=)
        var urlParams = new URLSearchParams(window.location.search);
        var idParam = urlParams.get("id");

        if('caches' in window){
            caches.match(`${base_url_football_data}/teams/${idParam}`).then(function (response) {
                if(response){
                    response.json().then(function (data) {
                        // Objek/array JavaScript dari response.json() masuk lewat data.
                        if (data.crestUrl === null){
                            data.crestUrl = "assets/img/Default Logo.png";
                        }
                        var detailTim = `
                            <div class="card-image boundary">
                                <img class="detail-logo" src="${data.crestUrl}" alt="Logo Club">
                                <a class="btn-floating btn-large halfway-fab waves-effect waves-light deep-purple darken-4">
                                    <i class="large material-icons" id="favorite-btn">favorite_border</i>
                                    <i class="large material-icons" id="favorited" style="display: none;">favorite</i>
                                </a>
                            </div>
                            <div class="card-content deep-purple lighten-5">
                        `;

                        // Menampilkan data bukan PLAYER misal: COACH, ASSISTANT_COACH
                        for (let index = 0; index < data.squad.length; index++) {
                            if(data.squad[index].role != "PLAYER") {
                                detailTim += `
                                    <div class="row">
                                        <h2>${data.squad[index].role}</h2>
                                        <div class="col s12">
                                            <span class="card-title coach">${data.squad[index].name}</span>
                                        </div>
                                    </div>
                                `;
                            }
                        }

                        // Menampilkan data PLAYER
                        for (let index = 0; index < data.squad.length; index++) {
                            if(data.squad[index].role == "PLAYER") {
                                if(index == 0){
                                    detailTim += `<div class="row"><h2>${data.squad[index].position}</h2>`
                                } else {
                                    if (data.squad[index].position != data.squad[index-1].position) {
                                        detailTim += `</div><div class="row"><h2>${data.squad[index].position}</h2>`
                                    }
                                }
                                detailTim += `
                                    <div class="col s12 m4">
                                        <span class="card-title player">${data.squad[index].name}</span>
                                    </div>
                                `;
                            }
                        }

                        detailTim += `</div></div>`;

                        // Sisipkan komponen card ke dalam elemen dengan id #content
                        document.getElementById("content").innerHTML = detailTim;

                        var fav = document.getElementById("favorite-btn"); // Tombol untuk favorite
                        var favorited = document.getElementById("favorited"); // Tombol untuk unfavorite
                        
                        getById(parseInt(idParam))
                            .then(function (response){
                                // Cek apakah halaman ini difavoritkan atau tidak
                                if(response){
                                    // Jika iya, maka tombol unfavorite akan muncul daripada tombol favorite
                                    fav.style.display = "none";
                                    favorited.style.display = "block";
                                }
                            }
                        )

                        // Fungsi ketika tombol favorit diclick
                        fav.onclick = () => {
                            // Mengambil data id, crestUrl, dan name saja dari data untuk disimpan
                            const {id: id, crestUrl: crestUrl, name: name} = data;
                            // Membuat objek baru untuk disimpan
                            let favoriteClub = new Object();
                            favoriteClub.id = id;
                            favoriteClub.crestUrl = crestUrl;
                            favoriteClub.name = name;
                            // Insert data ke IndexedDB
                            addToFavorite(favoriteClub);
                            // Ubah tombol favorite menjadi unfavorite
                            fav.style.display = "none";
                            favorited.style.display = "block";
                        }
            
                        // Fungsi ketika tombol unfavorite diclick
                        favorited.onclick = () => {
                            // Hapus item di DB berdasarkan id club
                            deleteById(parseInt(idParam))
                            // Ubah tombol unfavorite menjadi favorite
                            fav.style.display = "block";
                            favorited.style.display = "none";
                        }

                        return resolve(data);
                    })
                }
            })
        }
        
        fetch(`${base_url_football_data}/teams/${idParam}`, {
            method: "GET",
            headers: {
                "X-Auth-Token": API_KEY
            }
        })
        .then(status)
        .then(json)
        .then(function (data) {
            // Objek/array JavaScript dari response.json() masuk lewat data.

            // Menyusun komponen card artikel secara dinamis
            if (data.crestUrl === null){
                data.crestUrl = "assets/img/Default Logo.png";
            }
            var detailTim = `
                <div class="card-image boundary">
                    <img class="detail-logo" src="${data.crestUrl}" alt="Logo Club">
                    <a class="btn-floating btn-large halfway-fab waves-effect waves-light deep-purple darken-4">
                        <i class="large material-icons" id="favorite-btn">favorite_border</i>
                        <i class="large material-icons" id="favorited" style="display: none;">favorite</i>
                    </a>
                </div>
                <div class="card-content deep-purple lighten-5">
            `;

            // Menampilkan data bukan PLAYER misal: COACH, ASSISTANT_COACH
            for (let index = 0; index < data.squad.length; index++) {
                if(data.squad[index].role != "PLAYER") {
                    detailTim += `
                        <div class="row">
                            <h2>${data.squad[index].role}</h2>
                            <div class="col s12">
                                <span class="card-title coach">${data.squad[index].name}</span>
                            </div>
                        </div>
                    `;
                }
            }

            // Menampilkan data PLAYER
            for (let index = 0; index < data.squad.length; index++) {
                if(data.squad[index].role == "PLAYER") {
                    if(index == 0){
                        detailTim += `<div class="row"><h2>${data.squad[index].position}</h2>`
                    } else {
                        if (data.squad[index].position != data.squad[index-1].position) {
                            detailTim += `</div><div class="row"><h2>${data.squad[index].position}</h2>`
                        }
                    }
                    detailTim += `
                        <div class="col s12 m4">
                            <span class="card-title player">${data.squad[index].name}</span>
                        </div>
                    `;
                }
            }

            detailTim += `</div></div>`;

            // Sisipkan komponen card ke dalam elemen dengan id #tim
            document.getElementById("content").innerHTML = detailTim;
            
            var fav = document.getElementById("favorite-btn");
            var favorited = document.getElementById("favorited");

            getById(parseInt(idParam))
                .then(function (response){
                    // Cek apakah halaman ini difavoritkan atau tidak
                    if(response){
                        // Jika iya, maka tombol unfavorite akan muncul daripada tombol favorite
                        fav.style.display = "none";
                        favorited.style.display = "block";
                    }
                }
            )

            // Fungsi ketika tombol favorit diclick
            fav.onclick = () => {
                // Mengambil data id, crestUrl, dan name saja dari data untuk disimpan
                const {id: id, crestUrl: crestUrl, name: name} = data;
                // Membuat objek baru untuk disimpan
                let favoriteClub = new Object();
                favoriteClub.id = id;
                favoriteClub.crestUrl = crestUrl;
                favoriteClub.name = name;
                // Insert data ke IndexedDB
                addToFavorite(favoriteClub);
                // Ubah tombol favorite menjadi unfavorite
                fav.style.display = "none";
                favorited.style.display = "block";
            }

            // Fungsi ketika tombol unfavorite diclick
            favorited.onclick = () => {
                // Hapus item di DB berdasarkan id club
                deleteById(parseInt(idParam))
                // Ubah tombol unfavorite menjadi favorite
                fav.style.display = "block";
                favorited.style.display = "none";
            }

            return resolve(data);
        })
        .catch(error);
    })
}

function cariTimFavorit(){
    getAll().then(function (clubs) {
        // Menyusun komponen card artikel secara dinamis
        var kontenTim = "";
        clubs.forEach(function (tim) {
            if (tim.crestUrl === null){
                tim.crestUrl = "assets/img/Default Logo.png";
            }
            kontenTim += `
                <div class="col s6 m4">
                    <div class="card medium">
                        <a href="./detail-club.html?id=${tim.id}">
                            <div class="card-image waves-effect waves-block waves-light">
                                <img src="${tim.crestUrl}" alt="Logo ${tim.name}" class="tim-logo">
                            </div>
                        </a>
                        <div class="card-content">
                            <span class="card-title truncate"><b>${tim.name}</b></span>
                        </div>
                    </div>
                </div>
            `;
        });
        // Sisipkan komponen card ke dalam elemen dengan id #daftar-tim
        document.getElementById("daftar-tim").innerHTML = kontenTim;
    });
}