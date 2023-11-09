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


