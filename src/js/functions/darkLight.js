if (localStorage.getItem("style") == "dark") {
  document.body.classList.toggle("dark");
}
document.querySelector("#color").onclick = function () {
  document.body.classList.toggle("dark");
  if (document.body.getAttribute("class") == "dark") {
    localStorage.setItem("style", "dark");
  } else {
    localStorage.setItem("style", "");
  }
};
