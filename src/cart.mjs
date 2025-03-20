// Cart js

import { CURRENCY } from "./constants.mjs";
import { createHTML, clearNode } from "./utils.mjs";

const cartToggleBtnEL = document.querySelector("#js-cart-toggle");
const cartContainerEl = document.querySelector("#js-cart");
const cartCloseBtnEl = document.querySelector("#js-close-cart");
const containerItemsEl = document.querySelector("#js-cart-products");
const clearCartBtnEl = document.querySelector("#js-clear-cart");
const totalCartPriceEl = document.querySelector("#js-total");

setup();

function setup() {
  if (
    !cartToggleBtnEL ||
    !cartContainerEl ||
    !cartCloseBtnEl ||
    !containerItemsEl ||
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
        <button class="c-cart-btn-remove" item-btn="removeCartItem" id="${id}">Remove</button>
    </div>
  </article>
  `;
}

function renderCartItems(items = []) {
  clearNode(containerItemsEl);

  items.forEach(({ id, imgUrl, title, price }) => {
    const template = cartTemplate({
      id,
      title,
      imgUrl,
      price,
    });

    const createNewEl = createHTML(template);

    const removeBtnEl = createNewEl.querySelector(
      '[item-btn="removeCartItem"]'
    );

    removeBtnEl.addEventListener("click", (event) => {
      removeItemFromCart(items, event.target.id);
    });

    containerItemsEl.append(createNewEl);
  });
}

export function itemBtnAddToCart({ id, imgUrl, title, price, quantity = 1 }) {
  const products = getItemsFromStorage();

  products.push({
    id,
    title,
    imgUrl,
    price,
    quantity: quantity,
  });

  setItemsToStorage(products);

  renderCartItems(products);
}

export function getItemsFromStorage() {
  return JSON.parse(window.localStorage.getItem("cart")) ?? [];
}

function setItemsToStorage(items = []) {
  window.localStorage.setItem("cart", JSON.stringify(items));
}

function clearAllItemsFromCart() {
  setItemsToStorage([]);
  renderCartItems([]);
}

function removeItemFromCart(items = [], productId) {
  const temp = items.filter((item) => item.id != productId);

  setItemsToStorage(temp);

  renderCartItems(temp);
}

function renderCartPrice(items = []) {
  clearNode(totalCartPriceEl);

  items.forEach(({ price, quantity }) => {
    const template = totalPricetemplate({
      price,
      quantity,
    });
    const createNewEl = createHTML(template);
    const total = calcTotalPrice(createNewEl);

    totalCartPriceEl.append(total);
  });
}

function totalPricetemplate({ price }) {
  return `
  
  <span>${price} ${CURRENCY}</span>
  `;
}

function calcTotalPrice(items = []) {
  const calculateQty = items.reduce((total, item) => {
    return total + item.quantity;
  });

  getItemsFromStorage(calculateQty);

  renderCartPrice(calculateQty);
}
