/*=============== DARK LIGHT THEME ===============*/
const themeButton = document.getElementById("darkmode-toggle");
const HTML = document.getElementById("HTML");
const darkTheme = "DarkMode";

const selectedTheme = localStorage.getItem("Selected-Nav-Scheme");

const getCurrentTheme = () =>
  HTML.classList.contains(darkTheme) ? "DarkMode" : "light";

if (selectedTheme) {
  HTML.classList[selectedTheme === "DarkMode" ? "add" : "remove"](darkTheme);
}

window.addEventListener("keydown", (event) => {
  if (event.key === "z" && event.ctrlKey) {
    event.preventDefault();
    HTML.classList.toggle(darkTheme);
    localStorage.setItem("Selected-Nav-Scheme", getCurrentTheme());
  }
});

let popup = document.getElementById("popup");

function openPopup() {
  popup.classList.add("open-popup");
}
function closePopup() {
  popup.classList.remove("open-popup");
}
