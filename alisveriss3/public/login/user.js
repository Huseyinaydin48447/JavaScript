document.addEventListener("DOMContentLoaded", function () {
    const loginLink = document.getElementById("navbar-login");

    if (loginLink) {
        loginLink.addEventListener("click", function (event) {
            event.preventDefault();

            // Kullanıcı girişi kontrolü yapın
            const isLoggedIn = false; // Burada kullanıcı girişi kontrolü yapılmalı

            if (isLoggedIn) {
                console.log("doğru")
                // Kullanıcı giriş yapmışsa anasayfaya yönlendir
                window.location.href = "../index.html";
            } else {
                console.log("yanlış")

                // Kullanıcı giriş yapmamışsa login sayfasına yönlendir
                window.location.href = "indexx.html";
            }
        });
    } else {
        console.error("navbar-login element not found.");
    }


    const loginForm = document.querySelector("#login-form");

    loginForm.addEventListener("submit", async (event) => {
        event.preventDefault();

        const kullaniciAdi = document.getElementById("kullaniciAdi").value;
        const parola = document.getElementById("parola").value;

        try {
            const response = await fetch("http://localhost:5050/login", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    kullaniciAdi,
                    parola,
                }),
            });

            if (!response.ok) {
                console.error("Login failed:", response.statusText);
                return;
            }

            // Login successful, update the UI
            if (loginLink) {
                loginLink.innerText = "Hesabım";
                loginLink.href = "../index.html";  // veya başka bir sayfaya yönlendirme yapabilirsiniz
            }
        } catch (error) {
            console.error("An error occurred:", error);
        }
    });
});
