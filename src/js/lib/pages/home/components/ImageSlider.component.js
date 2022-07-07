//@ts-check
import BaseImageList from "../../../base/BaseImageList.js";

// ---------------------------------------------------------------------
// TYPE DEFINITIONS
// ---------------------------------------------------------------------
/**
 * @typedef {import('../../../base/BaseImageList.js').Model} Model
 */

/**
 * @typedef {Object} Options
 * @property {boolean | undefined} autoSwitch
 * @property {number | undefined} switchAfter
 * @property {string | undefined} slideDuration
 */

/**
 * @typedef {Object} Config
 * @property {string} appendTo
 * @property {Model} model
 * @property {Options | undefined} options
 */

// ---------------------------------------------------------------------
// CLASS DEFINITION
// ---------------------------------------------------------------------

export default class ImageSliderComponent extends BaseImageList {
  /**
   * the identifier of the HTML element to append the slider to
   * @property
   * @public
   * @type {string}
   */
  appendTo;

  /**
   * the duration (in miliseconds) that the slider should change the
   * current image (i.e., the image that is currently displayed).
   * Default value is `5000` (or 5 seconds)
   * @property
   * @public
   * @type {number}
   */
  switchAfter;

  /**
   * if set to true, the slider will autoswitch the images. Default
   * value is `true`
   * @property
   * @public
   * @type {boolean}
   */
  autoSwitch;

  /**
   * the duration it takes the slider to change an image. Default is `0.4s`
   * (0.4 seconds). It is a the duration property of a CSS transition
   * @property
   * @public
   * @type {string}
   */
  slideDuration;

  /**
   * index of the clone of the first image in the slider
   * @property
   * @private
   * @type {number}
   */
  _lowerBound;

  /**
   * index of the clone of the last image in the slider
   * @property
   * @private
   * @type {number}
   */
  _upperBound;

  /**
   * index of the slider image that is currently displayed
   * @property
   * @private
   * @type {number}
   */
  _currentIndex;

  /**
   * width of the device screen
   * @property
   * @private
   * @type {number}
   */
  _deviceWidth;

  /**
   * @constructor
   * @param {Config} config
   */
  constructor(config) {
    super(config.model);

    this.appendTo = config.appendTo;

    this.autoSwitch = config?.options?.autoSwitch
      ? config.options.autoSwitch
      : true;

    this.switchAfter = config?.options?.switchAfter
      ? config.options.switchAfter
      : 5000;

    this.slideDuration = config?.options?.slideDuration
      ? config.options.slideDuration
      : "0.4s";

    this._currentIndex = 1;
    this._deviceWidth = window.innerWidth;

    this.init();
  }

  init() {
    // Clone first image and add it to the end of the image list
    this.model.images.push(this.model.images[0]);

    // Clone last image and add it to the beginning of the image list
    this.model.images.unshift(this.model.images[this.model.images.length - 1]);

    // Move the slider to the first (non-cloned) image
    this.model.ulElementAttr?.push({
      name: "style",
      value: `{transition: all 0s ease-in-out ,transfrom: translateX(-${this._deviceWidth}px)}`,
    });

    this._upperBound = this.model.images.length - 1;
    this._lowerBound = 0;

    // Render the template in the DOM
    this._render();
  }

  /**
   * initalize image slider DOM event listeners
   * @method
   * @public
   */
  initEvents() {
    // Add window resize event to update deviceWidth
    window.addEventListener("resize", (e) => {
      // @ts-ignore
      this._deviceWidth = e?.target?.innerWidth;
    });

    setInterval(() => {
      this._changeImg("next");
    }, this.switchAfter);
  }

  /**
   * render the image slider in the page
   * @method
   * @private
   */
  _render() {
    const parentElement = document.querySelector(this.appendTo);
    if (parentElement) {
      parentElement.innerHTML = this.template;
    } else {
      // Console an error in teh console
      console.error(
        `ImageSlider Component Error: \n No element with the identifier = '${this.appendTo}'. Update the 'appendTo' property when instantiating this component class
        `
      );
    }
  }

  /**
   * handles sliding images into view
   * @param {string} direction  the direction of the change. Either "next" or
   *                            "previous"
   * @method
   * @private
   */
  _changeImg(direction) {
    /**
     * @type {HTMLElement?}
     */
    const parentElement = document.querySelector(this.appendTo);

    /**
     * @type {HTMLElement?}
     */
    const imagesContainer =
      parentElement && parentElement.querySelector("[data-slider-container]");
    // console.log("this._currentIndex before change: ", this._currentIndex);
    // console.log("images length: ", imagesContainer.children.length);
    // console.log("upperBound: ", this._upperBound);

    if (direction === "next" && imagesContainer) {
      // element.scrollLeft > 0 scroll forwards
      imagesContainer.style.transition = `all ${this.slideDuration} ease-in-out`;
      imagesContainer.style.transform = `translateX(-${this._scrollToDist(
        this._currentIndex + 1
      )}px)`;

      imagesContainer.ontransitionend = () => {
        // Current Index is the last element (img shown is the last first)
        if (this._currentIndex === this._upperBound) {
          // Jump to the first image, i.e. to lowerBound
          imagesContainer.style.transition = "all 0s ease-in-out";
          imagesContainer.style.transform = `translateX(-${this._scrollToDist(
            this._lowerBound + 1
          )}px)`;
        }
      };
    }
    if (direction === "previous" && imagesContainer) {
      // element.scrollLeft > 0 scroll forwards
      imagesContainer.style.transition = `all ${this.slideDuration} ease-in-out`;
      imagesContainer.style.transform = `translateX(-${this._scrollToDist(
        this._currentIndex - 1
      )}px)`;

      imagesContainer.ontransitionend = () => {
        // Current Index is the last element (img shown is the last first)
        if (this._currentIndex === this._lowerBound) {
          // Jump to the last image, i.e. to upperBound
          imagesContainer.style.transition = "opacity 0.4s ease-in-out";
          imagesContainer.style.transform = `translateX(-${this._scrollToDist(
            this._upperBound - 1
          )}px)`;
        }
      };
    }
  }

  /**
   * determines the distance the image slider should scroll to display the
   * given image index
   *
   * @param {number} index  image index to scroll to
   * @method
   * @private
   */
  _scrollToDist(index) {
    if (this._currentIndex === index) return 0;

    // Update the current index property
    this._currentIndex = index;

    // Return the scroll distance
    // console.log("Scroll Dist>>>> ", index * this._deviceWidth);
    return index * this._deviceWidth;
  }
}
