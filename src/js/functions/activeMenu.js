const allNavButtons = document.querySelectorAll("#activeMenu");
allNavButtons.forEach((button) => {
  button.addEventListener("click", (event) => {
    allNavButtons.forEach((button) => {
      button.classList.remove("menu-active");
    });
    const {target} = event;
    target.classList.add("menu-active");
  });
});