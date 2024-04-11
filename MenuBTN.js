const menuBtn = document.querySelector(".menu-btn");
let menuOpen = false;
menuBtn.addEventListener("click", () => {
  if (!menuOpen) {
    menuBtn.classList.add("deactive");
    menuBtn.classList.add("open");
    menuOpen = true;
    setTimeout(function () {
      menuBtn.classList.remove("deactive");
    }, 450);
  } else {
    menuBtn.classList.add("deactive");
    setTimeout(function () {
      menuBtn.classList.remove("deactive");
    }, 450);
    menuBtn.classList.remove("open");
    menuOpen = false;
  }
});

const NavBar = document.getElementById("Navbar");
const NavBTN = document.getElementById("NavMenuTrigger");
NavBTN.addEventListener("click", () => {
  NavBar.classList.toggle("open");
});
