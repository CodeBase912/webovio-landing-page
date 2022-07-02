import { assetsHost } from "../config";

/**
 * creates an HTML element or a nested structure of HTML elements
 * @param {string} type  the type of element or nested element structure to
 *                       create. Nested structures are concatinated with a
 *                       a period (`"."`).
 * @param {object} attributes  an object that contains the HTML tags attribute
 *                             names and values
 * @returns {HTMLElement}
 */
const createElement = (type, attributes) => {
  switch (type) {
  case "li.img": {
    // Image list
    const listItemTag = document.createElement("li");
    // Set parent element attributes
    attributes.parent?.map((attribute) => {
      listItemTag.setAttribute(attribute.name, attribute.value);
    });

    // Create child element
    const imgTag = document.createElement("img");
    // Set child element attributes
    attributes.child?.map((attribute) => {
      if (attribute.name === "src") {
        imgTag.setAttribute(
          attribute.name,
          `${assetsHost}${attribute.value}`
        );
        return;
      }
      imgTag.setAttribute(attribute.name, attribute.value);
    });

    // Append child element to parent element
    listItemTag.append(imgTag);
    return listItemTag;
  }
  default:
    return;
  }
};

export default createElement;
