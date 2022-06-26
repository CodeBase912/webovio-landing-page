console.log("test");

/**
 * initializes the slider images positions. Appends a clone of the first image
 * to the end of the slider images list and appends a clone of the last image
 * to the beginning of the slider images list
 * @param {string} imgsContainerIdentifier  the class/id selector of the images
 *                                          container element. Prepend a "." for
 *                                          a class selector and a "#" for a id
 *                                          selector. This function uses
 *                                          `element.querySelector()` to select
 *                                          elements
 * @param {string} dataAttributeIdentifier  the data attribute that contains the
 *                                          index of each image in the slider.
 *                                          Only refers to the data atrribute
 *                                          name and does not include the value.
 *                                          For example, for a data attribute of
 *                                          `data-img-index="0"` this value
 *                                          would be `data-img-index`
 *
 */
const sliderInit = (imgsContainerIdentifier, dataAttributeIdentifier) => {
  // Select the slider images container
  const imagesContainer = document.querySelector(
    "#hero-img-slider-images-container"
  );
  console.log("Images Container: ", imagesContainer);

  // Clone the first and last images
  const firstImg = imagesContainer
    .querySelector('[data-img-index="1"]')
    .cloneNode(true);
  firstImg &&
    firstImg.setAttribute(
      "data-img-index",
      imagesContainer.children.length + 1
    );
  const lastImg = imagesContainer
    .querySelector(`[data-img-index="${imagesContainer.children.length}"]`)
    .cloneNode(true);
  lastImg && lastImg.setAttribute("data-img-index", 0);

  console.log({ firstImg, lastImg });

  // Append the last image to the beginning of the image slider list
  imagesContainer.insertAdjacentElement("afterbegin", lastImg);
  // Append the first image to the end of the image slider list
  imagesContainer.insertAdjacentElement("beforeend", firstImg);
};

// Initialize the slider images
sliderInit();
