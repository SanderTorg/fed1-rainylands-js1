import { CURRENCY, ERROR_IF_NOT_GETTING_DATA, APIURL } from "../constants.mjs";
import {
  areDOMElementPresent,
  clearNode,
  createHTML,
  getDOMElements,
} from "../utils.mjs";
import { itemBtnAddToCart } from "../cart.mjs";

const DOMElements = getDOMElements(["#js-productDetails-render"], document);
const [containerProductsEl] = DOMElements;

setup();

function setup() {
  try {
    // Check if the containerEl and sortByEl elements exist in the DOM

    if (!areDOMElementPresent(DOMElements)) {
      return;
    }

    const id = getIdFromUrl();
    renderProductDetails(id, containerProductsEl);
  } catch (error) {
    // Log an error message if either element is missing
    console.error(
      "Could'nt find DOM elements. Please check the HTML",
      error?.message
    );
  }
}

async function fetchProductDetails(productId = "") {
  try {
    if (!productId) {
      throw new Error("No Product Id was supplied");
    }

    const response = await fetch(`${APIURL}/${productId}`);
    const { data } = await response.json();

    return data;
  } catch (error) {
    console.error(ERROR_IF_NOT_GETTING_DATA, error?.message);
  }
}

async function renderProductDetails(productId, containerProductsEl) {
  const { image, title, price, description } = await fetchProductDetails(
    productId
  );

  const template = detailsTemplate({
    primaryImgUrl: image.url,
    alt: image.alt,
    title,
    price,
    description,
  });

  const detailsEl = createHTML(template);
  const detailsElWithListener = addFormHandlerToDetailsEl(detailsEl);
  clearNode(containerProductsEl);
  containerProductsEl.appendChild(detailsElWithListener);
}

function detailsTemplate({
  id = "",
  primaryImgUrl = "https://placehold.com/400x500",
  title = "Unknown Product",
  price = 0,
  description = "This product doesn't have a discription",
  alt = "No Description present",
}) {
  return `
    <article class="c-productDetails-preview-details">
          <div class="c-productDetails-preview-image">  
              <img src="${primaryImgUrl}" alt="${alt}" />
          </div>

          <div class="c-productDetails-preview-info">
            <h1 class="c-productDetails-preview-title">
              ${title}
            </h1>

            <div class="c-productDetails-preview-price">${price} ${CURRENCY}</div>

            <div class="c-productDetails-preview-description">${description}</div>

            <form name="addToCartForm">
                <input name="id" value="${id}" hidden/>
                <input name="imgUrl" value="${primaryImgUrl}" hidden/>
                <input name="price" value="${price}" hidden/>
                <input name="title" value="${title}" hidden/>
                <div class="c-size">Size:</div>

                <div class="c-form-size">
                    <select name="Size" id="js-filter-size" class="c-filter-size-box">
                        <option value="Size">Choose Size</option>
                        <option value="Small">Small</option>
                        <option value="Medium">Medium</option>
                        <option value="Large">Large</option>
                    </select>
                </div>

                <button type="submit" class="c-productDetails-add-to-cart" id="js-add-to-cart-${id}">
                    Add to Cart
                </button>
            </form>

            <section class="c-ordering-info-container">
             <div class="c-ordering-info">
              <p> - Free shipping over 499kr</p>
              <p> - Fast shipping</p>
              <p> - Free returns </p>
              <p> - Home delivery</p>
             </div>
            </section>
          </div>
        </article>
  `;
}

function handleFormSubmit(event) {
  // NB: Prevent the form from refreshing the page;
  event.preventDefault();

  const formData = new FormData(event.target);

  itemBtnAddToCart({
    id: getIdFromUrl(),
    imgUrl: formData.get("imgUrl"),
    price: formData.get("price"),
    title: formData.get("title"),
    quantity: Number(formData.get("quantity")),
  });
}

function getIdFromUrl() {
  const myKeysValue = window.location.search;

  const UrlParams = new URLSearchParams(myKeysValue);

  const id = UrlParams.get("id");

  return id;
}

function addFormHandlerToDetailsEl(detailsEl = document.createElement()) {
  const addToCartForm = detailsEl.querySelector("form");
  addToCartForm.addEventListener("submit", handleFormSubmit);
  return detailsEl;
}
