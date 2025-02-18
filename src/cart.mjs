// Cart js

import { CURRENCY } from "./constants.mjs";
import { createHTML, clearNode } from "./utils.mjs";

const cartToggleBtnEL = document.querySelector("#js-cart-toggle");
const cartContainerEl = document.querySelector("#js-cart");
const cartCloseBtnEl = document.querySelector("#js-close-cart");
const containerItemsEl = document.querySelector("#js-cart-products");
const cartTotalEl = document.querySelector("#js-cart-total");
const clearCartBtnEl = document.querySelector("#js-clear-cart");

setup();

function setup() {
  if (
    !cartToggleBtnEL ||
    !cartContainerEl ||
    !cartCloseBtnEl ||
    !containerItemsEl ||
    !cartTotalEl ||
    !clearCartBtnEl
  ) {
    console.error("JS is CRACKED!");
  } else {
    cartToggleBtnEL.addEventListener("click", toggleCartAside);
    cartCloseBtnEl.addEventListener("click", toggleCartAside);
    clearCartBtnEl.addEventListener("click", clearAllItemsFromCart);

    const products = getItemsFromStorage();

    renderCartItems(products);
  }
}

function toggleCartAside() {
  cartContainerEl.classList.toggle("is-open");
}

function cartTemplate({
  id,
  imgUrl = "",
  title = "Unknown",
  price = 0,
  alt = "No Alt provided",
}) {
  return `
  <article class="c-cart-container"> 
    <div class="c-cart-col-1">
      <a href="/product-details.html?id=${id}">
        <img src="${imgUrl}" alt="${alt}  class="c-cart-img"/>
      </a>
    </div>  
    <div class="c-cart-col-2">
        <a href="/product-details.html?id=${id}">
          <h3>${title}</h3>
        </a>
        <strong class="c-cart-item-price">${price} ${CURRENCY}</strong>
        <button class="c-cart-btn-remove" data-id="${id}">Remove</button>
    </div>
  </article>
  `;
}

function clearAllItemsFromCart() {
  setItemsToStorage([]);
  renderCartItems([]);
}

function renderCartItems(list = []) {
  clearNode(containerItemsEl);

  list.forEach(({ id, imgUrl, title, price }) => {
    const template = cartTemplate({
      id,
      title,
      imgUrl,
      price,
    });

    const createNewEl = createHTML(template);

    containerItemsEl.append(createNewEl);
  });
}

export function itemBtnAddToCart({ id, imgUrl, title, price }) {
  const items = getItemsFromStorage();

  const foundProductIndex = items.findIndex((item) => {
    return item.id === id;
  });

  if (foundProductIndex === -1) {
    items.push({
      id,
      title,
      imgUrl,
      price,
    });
  }

  setItemsToStorage(items);

  renderCartItems(items);
}

function getItemsFromStorage() {
  return JSON.parse(window.localStorage.getItem("cart")) ?? [];
}

function setItemsToStorage(items = []) {
  window.localStorage.setItem("cart", JSON.stringify(items));
}
