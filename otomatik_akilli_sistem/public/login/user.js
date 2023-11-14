const signInBtnLink = document.querySelector(".signInBtn-link");
const signUpBtnLink = document.querySelector(".signUpBtn-link");
const wrapper = document.querySelector(".wrapper");
const signUpForm = document.querySelector(".form-wrapper.sign-up");
const signInForm = document.querySelector(".form-wrapper.sign-in");


function handleSignUpFormSubmit(event) {
    event.preventDefault(); 
   
    alert("Tebrikler! Hesabınız oluşturuldu. Artık giriş yapabilirsiniz.");
    signUpForm.style.display = "none";
    signInForm.style.display = "block";
    wrapper.classList.remove("active");

    const formFields = signUpForm.querySelectorAll("input");
    formFields.forEach(input => {
        input.value = "";
    });
    
}


signUpForm.querySelector("form").addEventListener("submit", handleSignUpFormSubmit);

signUpBtnLink.addEventListener("click", () => {
    signUpForm.style.display = "block";
    signInForm.style.display = "none"; 
    wrapper.classList.add("active");
});

signInBtnLink.addEventListener("click", () => {
    signUpForm.style.display = "none";
    signInForm.style.display = "block";
    wrapper.classList.remove("active");
});


document.addEventListener("DOMContentLoaded", async function () {
  console.log("DOMContentLoaded event fired");

  const loginForm = document.getElementById("login-form");
  const loginLink = document.querySelector("#navbar-login");
  
  console.log("loginLink:", loginLink);
console.log("loginForm:", loginForm);


  if (!loginForm || !loginLink) {
    console.error("Login form or login link not found.");
    return;
  }

  loginForm.addEventListener("submit", async (event) => {
    event.preventDefault();
    console.log("executed login function");
    const kullaniciAdi = document.getElementById("kullaniciAdi").value;
    const parola = document.getElementById("parola").value;
    console.log(kullaniciAdi, parola);

    try {
      var myHeaders = new Headers();
      myHeaders.append("Content-Type", "application/json");

      var raw = JSON.stringify({
        action: "Login",
        kullaniciAdi: kullaniciAdi,
        password: parola,
      });

      var requestOptions = {
        method: "POST",
        headers: myHeaders,
        body: raw,
        redirect: "follow",
      };

      fetch("http://localhost:5050/index", requestOptions)
        .then((response) => response.json())
        .then((result) => {
          console.log(result[0]);
          localStorage.setItem("auth", result[0].username);
          setTimeout(() => {
                      window.location.replace("../saatTakvim/home.html");

          }, 3000);
        })
        .catch((error) => console.log("error", error));
    } catch (error) {
      console.error("An error occurred:", error);
    }
  });

  document.addEventListener("click", function (event) {
    const dropdownContent = document.querySelector("#navbar-login .dropdown-content");
    if (!loginLink.contains(event.target) && dropdownContent && dropdownContent.style.display === "block") {
      dropdownContent.style.display = "none";
    }

    if (event.target.id === "logout-link") {
      localStorage.removeItem("auth");
    }
  });

  loginLink.addEventListener("click", function () {
    const dropdownContent = document.querySelector("#navbar-login .dropdown-content");
    if (dropdownContent) {
      dropdownContent.style.display = dropdownContent.style.display === "block" ? "none" : "block";
    }
  });

});

