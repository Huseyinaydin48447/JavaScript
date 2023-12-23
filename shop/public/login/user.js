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
                      window.location.replace("../home.html");

          }, 3000);
        })
        .catch((error) => alert("yanlış kullanıcı Adı ve şifre . Lütfen doğru bir şekilde doldurun!!"));
        
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

document.addEventListener("DOMContentLoaded", function () {
  const socket = new WebSocket("ws://your-server-address");

  socket.addEventListener("open", function (event) {
      console.log("WebSocket bağlantısı başlatıldı");
  });

  socket.addEventListener("message", function (event) {
      const receivedMessage = JSON.parse(event.data);

      updateMessages(receivedMessage);
  });

  document.getElementById("send-button").addEventListener("click", function () {
      const newMessage = {
          name: "Your Name",
          message: document.getElementById("message-input").value
      };

      socket.send(JSON.stringify(newMessage));

      updateMessages(newMessage);

 
      document.getElementById("message-input").value = "";
  });

  function updateMessages(message) {
      const messagesContainer = document.getElementById("message-container");
      const messageElement = document.createElement("div");
      messageElement.classList.add("message-item");
      messageElement.innerHTML = `
          <p><strong>${message.name}:</strong> ${message.message}</p>
      `;
      messagesContainer.appendChild(messageElement);
  }
});


document.addEventListener("DOMContentLoaded", async function () {
  // ... (your existing code)

  const signUpForm = document.querySelector(".form-wrapper.sign-up");

  signUpForm.querySelector("form").addEventListener("submit", async (event) => {
    event.preventDefault();

    const username = document.querySelector("#signup-username").value;
    const email = document.querySelector("#email").value;
    const password = document.querySelector("#signup-password").value;

    try {
      const myHeaders = new Headers();
      myHeaders.append("Content-Type", "application/json");

      const raw = JSON.stringify({
        username: username,
        email: email,
        password: password,
      });

      const requestOptions = {
        method: "POST",
        headers: myHeaders,
        body: raw,
        redirect: "follow",
      };

      const response = await fetch("http://localhost:5050/signup", requestOptions);
      const result = await response.json();

      // Handle the response as needed, e.g., show a success message
      console.log(result.message);

      // Clear form fields after successful signup
      signUpForm.reset();
    } catch (error) {
      console.error("An error occurred:", error);
    }
  });

  // ... (your existing code)
});
