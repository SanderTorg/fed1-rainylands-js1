// Nav JS

const hamburgerEl = document.querySelector("#js-hamburger");
const navMenuEl = document.querySelector("#js-nav-menu");

// Header section

// Toggeling the burger menu

hamburgerEl.addEventListener("click", () => {
  hamburgerEl.classList.toggle("active");
  navMenuEl.classList.toggle("active");
});

document.querySelectorAll(".c-nav-link").forEach((n) =>
  n.addEventListener("click", () => {
    hamburgerEl.classList.remove("active");
    navMenuEl.classList.remove("active");
  })
);
