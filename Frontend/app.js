const inputs = document.querySelectorAll(".input-field");
const toggle_btn = document.querySelectorAll(".toggle");
const main = document.querySelector("main");
const bullets = document.querySelectorAll(".bullets span");
const images = document.querySelectorAll(".image");

inputs.forEach((inp) => {
  inp.addEventListener("focus", () => {
    inp.classList.add("active");
  });
  inp.addEventListener("blur", () => {
    if (inp.value != "") return;
    inp.classList.remove("active");
  });
});
toggle_btn.forEach((btn) => {
  btn.addEventListener("click", () => {
    main.classList.toggle("sign-up-mode");
  });
});

function moveSlider() {
  let index = this.dataset.value;

  let currentImage = document.querySelector(`.img-${index}`);
  images.forEach((img) => img.classList.remove("show"));
  currentImage.classList.add("show");

  const textSlider = document.querySelector(".text-group");
  textSlider.style.transform = `translateY(${-(index - 1) * 2.2}rem)`;

  bullets.forEach((bull) => bull.classList.remove("active"));
  this.classList.add("active");
}

bullets.forEach((bullet) => {
  bullet.addEventListener("click", moveSlider);
});

function sendData() {
  let user = document.getElementById("username").value;
  let password = document.getElementById("password").value;
  var curr = new Date();
  var DateTime =
    curr.getFullYear() +
    "-" +
    curr.getMonth() +
    "-" +
    curr.getDay() +
    " " +
    curr.getHours() +
    ":" +
    curr.getMinutes() +
    ":" +
    curr.getSeconds();
  console.log(DateTime);
  var request = {
    method: "POST",
    redirect: "follow",
    body: JSON.stringify({
      Username: user,
      Password: password.toString(),
      CreatedAt: DateTime,
    }),

    headers: {
      "Content-type": "application/json; charset=UTF-8",
    },
  };
  console.log(password);
  fetch("http://localhost:57927/api/SignUp", request)
    .then((response) => response.text())
    .then((result) => console.log(result))
    .catch((error) => console.log("error", error));
}
var user2 = document.getElementById("user2");
var pass2 = document.getElementById("pass2");
var signin = document.getElementById("signin");
signin.addEventListener("click", function () {
  fetch("http://localhost:57927/api/Login", {
    method: "POST",
    mode: "cors",
    headers: {
      "content-type": "application/json",
    },
    body: JSON.stringify({
      username: user2.value,
      password: pass2.value,
    }),
  })
    .then((res) => {
      return res.json();
    })
    .then((data) => show(data))
    .catch((error) => console.log(error));
});
function show(data) {
  if (data.token != null && data.token != undefined && data.token != "") {
    sessionStorage.setItem("token", data.token);
    sessionStorage.setItem("id", data.id);
    sessionStorage.setItem("Name", data.name);
  }
  call();
}
function call() {
  if (sessionStorage.getItem("token") != null) {
    window.location.href = "dashboard.html";
  } else {
    alert("Login Credentials are wrong");
  }
}
