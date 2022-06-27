// Import ImageSlider Class Library
import ImageSilder from "./lib/ImageSlider.js";

console.log("test");

// Initialize the image slider
const imgSlider = new ImageSilder({
  imgSliderIdentifier: "#hero-img-slider",
  dataAttributeIdentifier: "data-img-index",
});
