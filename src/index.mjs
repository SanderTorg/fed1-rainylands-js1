import { APIURL, ERROR_IF_NOT_GETTING_DATA } from "./constants.mjs";
import { createHTML, clearNode } from "./utils.mjs";
import { productTemplate } from "./products/productTemplate.mjs";
import { loadingSkeleton } from "./products/skeletonTemplate.mjs";
import { itemBtnAddToCart } from "./cart.mjs";

const containerProductsEl = document.querySelector("#js-products-render");
const sortPriceEl = document.querySelector("#js-sort-price");
const filterGenderEl = document.querySelector("#js-filter-gender");

//Gotta put em products in a list
let allProducts = [];

// If some of the variables dont work its cracked
// Else if its working then inwoke setup wich then again inwokes fetchingProducts

// Inwokes the fetchingProducts if JS is smexy

setup();

async function setup() {
  if (!containerProductsEl || !sortPriceEl || !filterGenderEl) {
    console.error("JS is CRACKED!");
  } else {
    loadingSkeleton(containerProductsEl);

    const { allProducts } = await fetchingProducts();

    renderProductsListEl(allProducts);

    containerProductsEl.addEventListener("click", onProductClick);
  }
}

filterGenderEl.addEventListener("change", (event) => {
  clearNode(containerProductsEl);
  loadingSkeleton(containerProductsEl);

  const val = event.target.value;

  if (val === "men") {
    const maleJackets = allProducts.filter(
      (jacket) => jacket.gender === "Male"
    );
    renderProductsListEl(maleJackets);
  } else if (val === "women") {
    const femaleJackets = allProducts.filter(
      (jacket) => jacket.gender === "Female"
    );
    renderProductsListEl(femaleJackets);
  } else if (val === "gender") {
    const defaultGender = allProducts;
    renderProductsListEl(defaultGender);
  }
});

sortPriceEl.addEventListener("change", (event) => {
  clearNode(containerProductsEl);
  loadingSkeleton(containerProductsEl);

  const val = event.target.value;

  if (val === "LowHigh") {
    highToLow();
  } else if (val === "HighLow") {
    lowToHigh();
  }

  renderProductsListEl(allProducts);
});

// fetching (getting) products from an API with an async function
async function fetchingProducts() {
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

    containerProductsEl.append(createNewEl);
  });
}

function highToLow(list = allProducts) {
  list.sort((a, b) => a.price - b.price);
}

function lowToHigh(list = allProducts) {
  list.sort((a, b) => b.price - a.price);
}

// The on product is heavily influenced by Monde Sineke (My teacher) :)

export function onProductClick(event) {
  const target = event.target;

  const container = target.closest("[data-component='productPreviewDetails']");
  const productId = container?.dataset?.productid;

  if (target.tagName === "BUTTON" && container) {
    const products = allProducts;
    const selectedProduct = products.find((p) => p.id === productId);

    if (selectedProduct) {
      itemBtnAddToCart({
        id: selectedProduct.id,
        title: selectedProduct.title,
        imgUrl: selectedProduct.image.url,
        price: selectedProduct.price,
      });
    }
  } else if (target.tagName === "IMG" && container) {
    console.error(`Navigate to product details for product ID: ${productId}`);
  }
}
