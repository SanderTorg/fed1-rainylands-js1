// Cart js

const cartToggleBtnEL = document.querySelector("#js-cart-toggle");
const cartEl = document.querySelector("#js-cart");
const cartCloseBtnEl = document.querySelector("#js-close-cart");
// const cartItemsEl = document.querySelector("#js-cart-products");
// const clearCartBtnEl = document.querySelector("#js-clear-cart");

setup();

function setup() {
  if (!cartToggleBtnEL || !cartEl || !cartCloseBtnEl) {
    console.error("JS is CRACKED!");
  } else {
    cartToggleBtnEL.addEventListener("click", toggleCartAside);
    cartCloseBtnEl.addEventListener("click", toggleCartAside);
  }
}

function toggleCartAside() {
  cartEl.classList.toggle("is-open");
}
