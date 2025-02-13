import { APIURL, ERROR_IF_NOT_GETTING_DATA } from "./constants.mjs";
import { createHTML, clearNode } from "./utils.mjs";
import { productTemplate } from "./products/productTemplate.mjs";

const renderProductsEl = document.querySelector("#js-products-render");

//Gotta define pruducts wich is gotten from response.json
// let allProducts = [];

// If some of the variables dont work its cracked
// Else if its working then inwoke setup wich then again inwokes fetchingProducts

// Inwokes the fetchingProducts if JS is smexy

setup();

function setup() {
  if (!renderProductsEl) {
    console.error("JS is CRACKED!");
  } else {
    fetchingProducts();
  }
}

// Main section

// fetching (getting) products from an API with an async function
async function fetchingProducts() {
  try {
    const response = await fetch(APIURL);
    const { data: allProducts } = await response.json();
    window.localStorage.setItem("products", JSON.stringify(allProducts));
    renderProductsListEl(allProducts);
  } catch (error) {
    console.error(ERROR_IF_NOT_GETTING_DATA, error?.message);
  }
}

function renderProductsListEl(list = []) {
  // TODO: Make this a pure function
  clearNode(renderProductsEl);

  list.forEach(({ id, title, image, price, description }) => {
    const template = productTemplate({
      id,
      title,
      imgUrl: image.url,
      imgAl: image.alt,
      price,
      description,
    });

    const createNewEl = createHTML(template);
    // FIXME: Use data attribute
    const btn = createNewEl.querySelector("button");

    btn.addEventListener("click", () => {
      addToCart({
        id,
        title,
        imgUrl: image.url,
        price,
      });
    });

    renderProductsEl.append(createNewEl);
  });
}
