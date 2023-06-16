const form = document.getElementById("film-form");
const titleElement = document.querySelector("#title");
const directorElement = document.querySelector("#director");
const urlElement = document.querySelector("#url");
const cardbody = document.querySelectorAll(".card-body")[1];
const clear = document.getElementById("clear-films");

// UI objesini Başlatma
const ui = new UI();
// Storage ekleme
const storage = new Storage();


// Tüm eventleri yüklemek için
eventListeners();
function eventListeners() {
    form.addEventListener("submit", addFilm);
    document.addEventListener("DOMContentLoaded", function () {
        let films = storage.getFilmsFromStorage();
        ui.loadAllFilms(films);
    });
    cardbody.addEventListener("click",deleteFilm );
    clear.addEventListener("click",clearAllFilms);
}
function addFilm(e) {
        e.preventDefault();

    const title = titleElement.value;
    const director = directorElement.value;
    const url = urlElement.value;

    if (title === "" || director === "" || url === "") {
        //HATA
        ui.displayMessages("Tüm Alanları Doldurunuz", "danger");
        // danger burada onun tipini gösterir

    } else {

        const newFilm = new Film(title, director, url);

        ui.addFilmToUI(newFilm);// Arayüze film ekleme
        storage.addFilmToStorage(newFilm);

    }

    //(1)
    ui.clearInputs(titleElement, urlElement, directorElement);

}

function deleteFilm(e){
    if(e.target.id ==="delete-film"){
        ui.deleteFilmFromUI(e.target);
        storage.deleteFilmFromStorage(e.target.parentElement.previousElementSibling.previousElementSibling.textContent);
        // console.log(e.target.parentElement.previousElementSibling.previousElementSibling.textContent);

        ui.displayMessages("Silme İşlemi Başarılı...","success");
    }

 }
 function clearAllFilms(){
    if(confirm("Silmek istediğinize Emin Misiniz ...")){
         ui.clearAllFilmsFromUI();
    storage.clearAllFilmsFromStroge();
    }
   

 }