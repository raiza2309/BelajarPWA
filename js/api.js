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

                    // Sisipkan komponen card ke dalam elemen dengan id #tim
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

        // Sisipkan komponen card ke dalam elemen dengan id #tim
        document.getElementById("daftar-tim").innerHTML = kontenTim;
    })
    .catch(error);
}