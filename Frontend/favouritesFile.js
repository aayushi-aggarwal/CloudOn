const allSideMenu = document.querySelectorAll("#sidebar .side-menu.top li a");

allSideMenu.forEach((item) => {
  const li = item.parentElement;

  item.addEventListener("click", function () {
    allSideMenu.forEach((i) => {
      i.parentElement.classList.remove("active");
    });
    li.classList.add("active");
  });
});
//togg
const menuBar = document.querySelector("#content nav .bx.bx-menu");
const sidebar = document.getElementById("sidebar");

menuBar.addEventListener("click", function () {
  sidebar.classList.toggle("hide");
});

const searchButton = document.querySelector(
  "#content nav form .form-input button"
);
const searchButtonIcon = document.querySelector(
  "#content nav form .form-input button .bx"
);
const searchForm = document.querySelector("#content nav form");

searchButton.addEventListener("click", function (e) {
  if (window.innerWidth < 576) {
    e.preventDefault();
    searchForm.classList.toggle("show");
    if (searchForm.classList.contains("show")) {
      searchButtonIcon.classList.replace("bx-search", "bx-x");
    } else {
      searchButtonIcon.classList.replace("bx-x", "bx-search");
    }
  }
});

if (window.innerWidth < 768) {
  sidebar.classList.add("hide");
} else if (window.innerWidth > 576) {
  searchButtonIcon.classList.replace("bx-x", "bx-search");
  searchForm.classList.remove("show");
}

window.addEventListener("resize", function () {
  if (this.innerWidth > 576) {
    searchButtonIcon.classList.replace("bx-x", "bx-search");
    searchForm.classList.remove("show");
  }
});

var modal = document.getElementById("myModal");
var btn = document.getElementById("myBtn");
var span = document.getElementsByClassName("close")[0];

btn.onclick = function () {
  modal.style.display = "block";
};

span.onclick = function () {
  modal.style.display = "none";
};

window.onclick = function (event) {
  if (event.target == modal) {
    modal.style.display = "none";
  }
};

function thisFileUpload() {
  var x = document.getElementById("file").value;
  console.log(x);

  document.getElementById("file").click();
}

function listFolders() {
  try {
    var create = document.getElementById("mainn");
    create.innerHTML = "";
    fetch(
      "http://localhost:57927/api/Favourite/favfile/" +
        sessionStorage.getItem("folderid"),
      {
        method: "GET",
      }
    )
      .then((response) => response.json())
      .then((folders) => {
        console.log(folders);
        folders.forEach((folder) => {
          var create = document.getElementById("mainn");
          var createChild = document.createElement("div");
          createChild.classList.add("abc2");
          var div1 = document.createElement("div");

          div1.classList.add("abc");

          let con = "";

          con += "<i class='bx bxs-file-blank' style='color:#2f3c7e;'></i>";

          con += "<br/><p style='color:black'><b>";

          con += folder.dName + "<b><p>";

          div1.innerHTML = con;

          var div2 = document.createElement("span");

          let con2 = "";

          con2 += `<i class='bx bx-star' onclick='unfav(${folder.docId})' style="cursor:pointer;margin-left:5%;color:navy;font-size:150%"></i>&nbsp;`;

          con2 += `<i class='bx bx-trash' onclick ='popup(${folder.docId})' style="cursor:pointer;margin-left:50%;color:red;font-size:150%"></i>`;
          div2.classList.add("btn123");

          div2.innerHTML = con2;
          createChild.appendChild(div1);
          createChild.appendChild(div2);
          create.append(createChild);
        });
      });
  } catch (err) {
    console.log(err);
  }
}
function onLoad() {
  listFolders();
  var admin = document.getElementById("text-name");
  admin.innerHTML = " Hi " + " " + sessionStorage.getItem("Name");
}

onLoad();

function fav(folder) {
  var raw = "";
  var requestOptions = {
    method: "PUT",
    body: raw,
    redirect: "follow",
  };

  let url = "http://localhost:57927/api/document/favFile/" + folder;
  fetch(url, requestOptions)
    .then((response) => response.text())
    .then((result) => console.log(listFolders()))
    .catch((error) => console.log("error", error));
}

function unfav(folder) {
  var raw = "";
  var requestOptions = {
    method: "PUT",
    body: raw,
    redirect: "follow",
  };

  let url = "http://localhost:57927/api/document/removefavourite/" + folder;
  fetch(url, requestOptions)
    .then((response) => response.text())
    .then((result) => console.log(listFolders()))
    .catch((error) => console.log("error", error));
}

function fav(folder) {
  var raw = "";
  var requestOptions = {
    method: "PUT",
    body: raw,
    redirect: "follow",
  };

  let url = "" + folder;
  fetch(url, requestOptions)
    .then((response) => response.text())
    .then((result) => console.log(listFolders()))
    .catch((error) => console.log("error", error));
}
