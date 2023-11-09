const bar = document.getElementById("bar");
const nav = document.getElementById("navbar");

if (bar) {
  bar.addEventListener("click", () => {
    nav.classList.add("active");
  });
}

// const  loginn=document.getElementById("#loginButton");

var kullanicilar = [
  { kullaniciAdi: "hüseyin", parola: 48447 },
  { kullaniciAdi: "admin", parola: 48447 },
  { kullaniciAdi: "aydın", parola: 48447 },
];
var girilenkullaniciAdi;
var girilenParola;

var x;
function kontrolEt() {
  girilenkullaniciAdi = document.getElementById("kullaniciAdi").value;
  girilenParola = document.getElementById("parola").value;

  for (x of kullanicilar) {
    if ((x.kullaniciAdi == girilenkullaniciAdi) && (x.parola == girilenParola)) {
      return true;
    } else {
      return false;
    }
  }
}

function loginButton() {
  kontrolEt();
  if (kontrolEt()) {
    window.open("index.html", "_self");
  } else {
    alert("hatalı kulanıcı adı ve parola");
  }
}
