import { assetsHost } from "../config";

const createElement = (type, attributes) => {
  switch (type) {
    case "li.img":
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
    default:
      return;
  }
};

export default createElement;
