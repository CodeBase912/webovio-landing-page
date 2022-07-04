/**
 * Converts content api data for images to an object compatible
 * for the ImageListComponent input data
 * @param {*} imgDataArray
 * @returns an array of images data
 */
export const images = (imgDataArray) => {
  let images = [];
  imgDataArray.map((imgData) => {
    let image = { attributes: [] };
    imgData.attributes.map((attribute) => {
      if (attribute.name === "src") {
        image.src = attribute.value;
        return;
      }
      if (attribute.name === "alt") {
        image.altText = attribute.value;
        return;
      }

      let attr = {};
      attr.name = attribute.name;
      attr.value = `"${attribute.value}"`;
      image.attributes.push(attr);
    });
    images.push(image);
  });

  return images;
};
