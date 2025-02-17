import { CURRENCY } from "../constants.mjs";

export function productTemplate({
  id,
  title = "Unknown Item",
  imgUrl,
  imgAl,
  price = 0,
  description = "Missing description",
  index,
}) {
  const paramsString = `id=${id}&title=${title}`;
  const searchParams = new URLSearchParams(paramsString);
  const detailsUrl = `/product-details.html?${searchParams.toString()}`;

  // Got layout from the legend himself Mo Sineke but design myself
  return `
    <article class="c-product-preview-details ${index}" data-productId="${id}" data-component="productPreviewDetails">
      <div class="c-product-preview-image">
        <a href=${detailsUrl}>
          <img src="${imgUrl}" alt="${imgAl}" />
        </a>  
      </div>

      <div class="c-product-preview-info">
        <h1 class="c-product-preview-title">
          <a href=${detailsUrl}>${title}</a>
        </h1>

        <div class="c-product-preview-price">${price} ${CURRENCY}</div>
        <div class="c-product-preview-description">
          <p>
            ${description}
          </p>
        </div>
        <button class="c-product-add-to-cart" id="js-add-to-cart-${id}">Add to Cart</button>
      </div>
    </article>
 `;
}
