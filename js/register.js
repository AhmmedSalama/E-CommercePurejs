let userName = document.querySelector("#userName");
let password = document.querySelector("#password");
let email = document.querySelector("#email");
let signUPBtn = document.querySelector("#signUP");
let errormessage = document.querySelector(".errormessage");

window.onload = function () {
  userName.focus();
};

[userName, password, email].forEach(input => {
  input.oninput = function () {
    errormessage.style.display = "none";
  };
});

signUPBtn.addEventListener("click", function (e) {
  e.preventDefault();

  if (userName.value.trim() === "" || password.value.trim() === "" || email.value.trim() === "") {
    errormessage.innerHTML = "⚠️ Please fill all fields";
    errormessage.style.color = "red";
    errormessage.style.display = "block";
  } else {
    localStorage.setItem("userName", userName.value.trim());
    localStorage.setItem("password", password.value.trim());
    localStorage.setItem("email", email.value.trim());

    errormessage.style.color = "green";
    errormessage.innerHTML = "✅ Account created successfully!";
    errormessage.style.display = "block";

    setTimeout(() => {
      window.location = "login.html";
    }, 800);
  }
});
