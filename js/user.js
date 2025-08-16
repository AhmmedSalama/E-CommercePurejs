let userInfo = document.querySelector("#userInfo");
let user = document.querySelector("#user");
let links = document.querySelector("#links"); 
let logOutBtn = document.querySelector("#logOut");
let shoppingCart = document.querySelector(".shoppingCart");

userInfo.classList.add("d-none");
user.classList.add("d-none");
logOutBtn.classList.add("d-none");
shoppingCart.classList.add("d-none");

if (localStorage.getItem("userName")) {
    links.classList.add("d-none");         
    user.classList.remove("d-none");       
    userInfo.classList.remove("d-none");    
    logOutBtn.classList.remove("d-none");   
    shoppingCart.classList.remove("d-none");
    user.innerHTML = "Welcome " + localStorage.getItem("userName");
}

logOutBtn.addEventListener("click", logOut);

function logOut() {
    localStorage.clear();
    setTimeout(() => {
        window.location = "index.html";
    }, 500);
}
