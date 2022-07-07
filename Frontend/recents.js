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

var btn = document.getElementById("myBtn");

var span = document.getElementsByClassName("close")[0];

span.onclick = function () {
  modal.style.display = "none";
};

window.onclick = function (event) {
  if (event.target == modal) {
    modal.style.display = "none";
  }
};

function listFolders() {
  try {
    var create = document.getElementById("mainn");
    create.innerHTML = "";
    fetch(
      "http://localhost:57927/api/Upload/Recent/" +
        sessionStorage.getItem("id") +
        "/2",
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

          con += `<i class='bx bxs-folder-open'  onclick="openfile(${folder.id})" style='color:#2f3c7e; cursor:pointer;'></i>`;
          con += "<br/><p style='color:black'><b>";
          con += folder.fName + "<b><p>";

          div1.innerHTML = con;

          var div2 = document.createElement("span");

          let con2 = "";

          con2 += `<i class='bx bx-star'  style="cursor:pointer;margin-left:5%;color:navy;font-size:150%"></i>&nbsp;`;
          con2 += `<i class='bx bx-error-circle'  onclick='viewdetails(${folder.id},"${folder.fName}",${folder.createdBy},"${folder.createdAt}")' style="cursor:pointer;margin-left:10%;color:green;font-size:150%"></i>`;
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

function onLoad() {
  listFolders();
  var admin = document.getElementById("text-name");
  admin.innerHTML = " Hi " + " " + sessionStorage.getItem("Name");
}

onLoad();

function openfile(folderid) {
  sessionStorage.setItem("folderid", folderid);
  window.location.href = "file.html";
}

function popup(folderid) {
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
        deletefolder(folderid),
        "Deleted!",
        "Your file has been deleted.",
        "success"
      );
    }
  });
}

function deletefolder(folder) {
  var raw = "";
  var requestOptions = {
    method: "PUT",
    body: raw,
    redirect: "follow",
  };

  let deleteurl = "http://localhost:57927/api/Upload/folder/put/" + folder;
  fetch(deleteurl, requestOptions)
    .then((response) => response.text())
    .then((result) => console.log(listFolders()))
    .catch((error) => console.log("error", error));
}

function logout() {
  sessionStorage.clear();
  window.location.href = "index.html";
}

function search1() {
  try {
    var id = document.getElementById("search");
    if (id.value == "") {
      location.reload();
    } else {
      var create = document.getElementById("mainn");
      create.innerHTML = "";
      fetch(
        "http://localhost:57927/api/Upload/folder/" +
          sessionStorage.getItem("id") +
          "/" +
          id.value,
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
            con += `<i class='bx bxs-folder-open'  onclick="openfile(${folder.id})" style='color:#2f3c7e; cursor:pointer;'></i>`;
            con += "<br/><p style='color:black'><b>";
            con += folder.fName + "<b><p>";

            div1.innerHTML = con;

            var div2 = document.createElement("span");

            let con2 = "";

            con2 += `<i class='bx bxs-folder-open'  onclick="openfile(${folder.id})" style="cursor:pointer;margin-left:5%;color:navy"></i>&nbsp;`;
            con2 += `<i class='bx bx-error-circle'  onclick='viewdetails(${folder.id},"${folder.fName}",${folder.createdBy},"${folder.createdAt}")' style="cursor:pointer;margin-left:10%;color:green"></i>`;
            con2 += `<i class='bx bx-trash' onclick ='popup(${folder.id})' style="cursor:pointer;margin-left:30%;color:red"></i>`;
            div2.classList.add("btn123");

            div2.innerHTML = con2;
            createChild.appendChild(div1);
            createChild.appendChild(div2);
            create.append(createChild);
          });
        });
    }
  } catch (err) {
    console.log(err);
  }
}

function viewdetails(folderid, folderName, createdBy, createdAt) {
  console.log(folderid);
  Swal.fire(
    "Folder Id : " +
      folderid +
      "\n" +
      "Folder Name : " +
      folderName +
      "\n" +
      "Created By : " +
      createdBy +
      "\n" +
      "Created At : " +
      createdAt +
      "\n"
  );
}
