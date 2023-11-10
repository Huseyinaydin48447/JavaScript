document.addEventListener("DOMContentLoaded", async function () {
    console.log("DOMContentLoaded event fired");

    const loginForm = document.getElementById("login-form");
    const loginLink = document.getElementById("navbar-login");

    if (!loginForm || !loginLink) {
        console.error("Login form or login link not found.");
        return;
    }

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

            console.log("Login successful. Updating UI and redirecting.");
            console.log("Before update - InnerText:", loginLink.innerText);
            loginLink.innerText = "Hesabım";
            console.log("After update - InnerText:", loginLink.innerText);
            
                window.location.replace("../index.html");
            

        } catch (error) {
            console.error("An error occurred:", error);
        }
    });
});
