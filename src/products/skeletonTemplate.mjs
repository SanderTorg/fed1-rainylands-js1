import { createHTML } from "../utils.mjs";

export function skeletonTemplate() {
  return `
    <article class="c-skeleton-preview-details">
          <div class="c-skeleton-preview-image"></div>
    
          <div class="c-skeleton-preview-info">
            <h1 class="c-skeleton-preview-title"></h1>
    
            <div class="c-skeleton-preview-price"></div>
            <div class="c-skeleton-preview-description"></div>
            <button class="c-skeleton-add-to-cart"></button>
          </div>
        </article>
    `;
}

export function loadingSkeleton(containerNode, count = 4) {
  [...Array(count)].forEach(() => {
    const template = skeletonTemplate();
    const newEl = createHTML(template);
    containerNode.append(newEl);
  });
}
