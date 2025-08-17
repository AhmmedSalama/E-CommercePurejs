let userName = document.querySelector("#userName");
let password = document.querySelector("#password");
let signInBtn = document.querySelector("#signIn");
let errormessage = document.querySelector(".errormessage");

let getUserName = localStorage.getItem("userName");
let getPassword = localStorage.getItem("password");

window.onload = function () {
  userName.focus();
};

[userName, password].forEach(input => {
  input.oninput = function () {
    errormessage.style.display = "none";
  };
});


signInBtn.addEventListener("click", function (e) {
  e.preventDefault();

  if (userName.value.trim() === "" || password.value.trim() === "") {
    errormessage.innerHTML = "⚠️ Please fill your data";
    errormessage.style.color = "red";
    errormessage.style.display = "block";
  } else {
    if (
      getUserName &&
      getUserName.trim() === userName.value.trim() &&
      getPassword &&
      getPassword.trim() === password.value.trim()
    ) {
      errormessage.style.color = "green";
      errormessage.innerHTML = "✅ Login successful!";
      errormessage.style.display = "block";

      setTimeout(() => {
        window.location = "index.html";
      }, 800);
    } else {
      errormessage.style.color = "red";
      errormessage.innerHTML = "❌ Username or password not valid";
      errormessage.style.display = "block";
    }
  }
});
