import { getItemsFromStorage } from "../cart.mjs";
import { CURRENCY } from "../constants.mjs";
import { createHTML } from "../utils.mjs";

const summaryEl = document.querySelector("#js-summary-products");

const cartProducts = getItemsFromStorage();

renderCartProductsToCheckout(cartProducts);

function renderCartProductsToCheckout(list = []) {
  list.forEach((cartProduct) => {
    const summaryProductTemplate = createSummaryProductTemplate(cartProduct);
    const cartProductEl = createHTML(summaryProductTemplate);
    summaryEl.append(cartProductEl);
  });
}

function createSummaryProductTemplate(cartProducts) {
  return `
	<div class="c-checkoutProducts-cont">
        <div class"c-img-container">
            <img src="${cartProducts.imgUrl}" class="c-checkoutProducts-img" alt="${cartProducts.alt}">
            </img>
        </div>
        <div class="c-checkoutProduct-info">
			<p>${cartProducts.title}</p>
			<p>${CURRENCY} ${cartProducts.price}</p>
        </div>
    </div>
`;
}
