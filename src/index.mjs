import { APIURL, ERROR_IF_NOT_GETTING_DATA } from "./constants.mjs";
import { createHTML, clearNode } from "./utils.mjs";
import { productTemplate } from "./products/productTemplate.mjs";
import { loadingSkeleton } from "./products/skeletonTemplate.mjs";

const containerProductsEl = document.querySelector("#js-products-render");
const sortPriceEl = document.querySelector("#js-sort-price");
const filterGenderEl = document.querySelector("#js-filter-gender");

//Gotta put em products in a list

// If some of the variables dont work its cracked
// Else if its working then inwoke setup wich then again inwokes fetchingProducts

// Inwokes the fetchingProducts if JS is smexy

setup();

async function setup() {
  if (!containerProductsEl || !sortPriceEl) {
    console.error("JS is CRACKED!");
  } else {
    loadingSkeleton(containerProductsEl);

    const { allProducts } = await fetchingProducts();

    renderProductsListEl(allProducts);
  }
}

sortPriceEl.addEventListener("change", (event) => {
  clearNode(containerProductsEl);
  loadingSkeleton(containerProductsEl);

  const val = event.target.value;

  if (val === "LowHigh") {
    highToLow();
  } else if (val === "HighLow") {
    lowToHigh();
  }

  renderProductsListEl(containerProductsEl);
});

// Main section

// fetching (getting) products from an API with an async function
async function fetchingProducts() {
  let allProducts = [];
  let error = null;

  try {
    const response = await fetch(APIURL);
    const { data } = await response.json();
    allProducts = data;
    window.localStorage.setItem("products", JSON.stringify(allProducts));
  } catch (shiii) {
    console.error(ERROR_IF_NOT_GETTING_DATA, error?.message);
    error = shiii;
  }

  return {
    allProducts,
    error,
  };
}

function renderProductsListEl(list = []) {
  clearNode(containerProductsEl);

  list.forEach(({ id, title, image, price, description }) => {
    const template = productTemplate({
      id: id,
      title: title,
      imgUrl: image.url,
      imgAl: image.alt,
      price: price,
      description: description,
    });

    const createNewEl = createHTML(template);

    const btn = createNewEl.querySelector("button");

    btn.addEventListener("click", () => {
      addToCart({
        id,
        title,
        imgUrl: image.url,
        price,
      });
    });

    containerProductsEl.append(createNewEl);
  });
}

function highToLow(list = allProducts) {
  list.sort((a, b) => a.price - b.price);
}

function lowToHigh(list = allProducts) {
  list.sort((a, b) => b.price - a.price);
}
