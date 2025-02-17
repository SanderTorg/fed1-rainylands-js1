export function createHTML(template) {
  const parser = new DOMParser();
  const parsedDocument = parser.parseFromString(template, "text/html");
  return parsedDocument.body.firstChild;
}

export function clearNode(node) {
  node.innerHTML = "";
}

export const getDOMElements = (ids = [], container = document) => {
  if (!Array.isArray(ids) || !ids.every((id) => typeof id === "string")) {
    throw new Error("All IDs must be strings");
  }

  let DOMElements = [];

  ids.forEach((id) => {
    DOMElements.push(container.querySelector(`${id}`));
  });

  if (DOMElements.length === 0) {
    console.error(
      new Error(
        "Please check the HTML for missing DOM HTML element with the id='js-*'"
      )
    );

    return false;
  }

  return DOMElements;
};

export const areDOMElementPresent = (elements = []) => {
  if (
    !Array.isArray(elements) ||
    !elements.every((el) => el instanceof HTMLElement)
  ) {
    throw new Error("All elements must be valid HTMLElements");
  }

  return elements.length > 0;
};

export function setLocalItem(key = "", value) {
  window.localStorage.setItem(key, JSON.stringify(value));
}

export function getLocalItem(key = "") {
  return JSON.parse(window.localStorage.getItem(key));
}
