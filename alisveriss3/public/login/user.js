document.addEventListener("DOMContentLoaded", async function () {
    console.log("DOMContentLoaded event fired");

    const loginForm = document.getElementById("login-form");
    const loginLink = document.querySelector("#navbar-login");

    if (!loginForm || !loginLink) {
        console.error("Login form or login link not found.");
        return;
    }

    loginForm.addEventListener("submit", async (event) => {
        event.preventDefault();
        console.log("executed login function")
        const kullaniciAdi = document.getElementById("kullaniciAdi").value;
        const parola = document.getElementById("parola").value;
        console.log(kullaniciAdi, parola)

        try {
            var myHeaders = new Headers();
            myHeaders.append("Content-Type", "application/json");
            
            var raw = JSON.stringify({
              "action": "Login",
              "kullaniciAdi": kullaniciAdi,
              "password": parola
            });
            
            var requestOptions = {
              method: 'POST',
              headers: myHeaders,
              body: raw,
              redirect: 'follow'
            };
            
            fetch("http://localhost:5050/index", requestOptions)
              .then(response => response.json())
              .then(result => {
                console.log(result[0])
                localStorage.setItem("auth", result[0].username);
            //  loginLink.innerHTML = `<i class="fas fa-user"></i> ${result.username}`
             window.location.replace("../home.html")
                })
              .catch(error => console.log('error', error));


        } catch (error) {
            console.error("An error occurred:", error);
        }
    });

    function updateNavbarContent() {
      const authUsername = localStorage.getItem("auth");
      if (authUsername) {
          loginLink.innerHTML = `<i class="fas fa-user"></i> ${authUsername}`;
          navbarLogin.removeAttribute("href");
          createDropdown(authUsername);
        }
  }
  function createDropdown(username) {
    const dropdownContainer = document.createElement("div");
    dropdownContainer.classList.add("dropdown");

    const dropdownButton = document.createElement("button");
    dropdownButton.innerHTML = `<i class="fas fa-user"></i> ${username} <i class="fas fa-caret-down"></i>`;
    dropdownButton.classList.add("dropbtn");
    dropdownContainer.appendChild(dropdownButton);

    const dropdownContent = document.createElement("div");
    dropdownContent.classList.add("dropdown-content");
    const logoutLink = document.createElement("a");
    logoutLink.href = "#";
    logoutLink.innerHTML = "Logout";
    logoutLink.addEventListener("click", () => {
        localStorage.removeItem("auth");
        window.location.replace("../index.html");
    });
    dropdownContent.appendChild(logoutLink);

    dropdownContainer.appendChild(dropdownContent);

    navbarLogin.parentNode.replaceChild(dropdownContainer, navbarLogin);
}

  updateNavbarContent();
});
