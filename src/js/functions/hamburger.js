const hamburger = document.querySelector(".hamburger");

const navMenu = document.querySelector(".navbar__menu");

hamburger.addEventListener("click", mobileMenu);

export function mobileMenu() {
  hamburger.classList.toggle("active");
  navMenu.classList.toggle("active");
}
