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

function onloadlistTrash() {
  listTrash();
  var admin = document.getElementById("text-name");
  admin.innerHTML = " Hi " + " " + sessionStorage.getItem("Name");
}

function listTrash() {
  try {
    var create = document.getElementById("mainn");
    create.innerHTML = "";
    fetch(
      "http://localhost:57927/api/trash/folder/" + sessionStorage.getItem("id"),
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

          con +=
            "<i class='bx bxs-folder-open'  style='color:#2f3c7e; cursor:pointer;'></i>";
          con += "<br/><p style='color:darkblue'><b>";
          con += folder.fName + "<b><p>";

          div1.innerHTML = con;

          var div2 = document.createElement("span");

          let con2 = "";
          con2 += `<i class='bx bx-revision bx-tada bx-flip-horizontal'  onclick='restore(${folder.id})' style="cursor:pointer;margin-left:10%;color:aqua;font-size:150%"></i>`;
          con2 += `<i class='bx bx-trash' onclick ='popup(${folder.id})' style="cursor:pointer;margin-left:50%;color:red;font-size:150%"></i>`;
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
//harddel
function deletefolder(folder) {
  var raw = "";
  var requestOptions = {
    method: "DELETE",
    body: raw,
    redirect: "follow",
  };

  let deleteurl = "http://localhost:57927/api/Upload/" + folder;
  fetch(deleteurl, requestOptions)
    .then((response) => response.text())
    .then((result) => console.log(listFolders()))

    .catch((error) => console.log("error", error));
  location.reload();
}

//restore

function restore(folder) {
  var raw = "";
  var requestOptions = {
    method: "PUT",
    body: raw,
    redirect: "follow",
  };

  let deleteurl = "http://localhost:57927/api/Upload/restore/put/" + folder;
  fetch(deleteurl, requestOptions)
    .then((response) => response.text())
    .then((result) => console.log(listFolders()))
    .catch((error) => console.log("error", error));
  location.reload();
}

function popup(folder) {
  Swal.fire({
    title: "Are you sure?",
    text: "You won't be able to revert this!",
    icon: "warning",
    showCancelButton: true,
    confirmButtonColor: "#3085d6",
    cancelButtonColor: "#d33",
    confirmButtonText: "Yes, delete it!",
  }).then((result) => {
    if (result.isConfirmed) {
      Swal.fire(
        deletefolder(folder),
        "Deleted!",
        "Your file has been deleted.",
        "success"
      );
    }
  });
}
