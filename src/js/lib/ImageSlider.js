export default class ImageSilder {
  _deviceWidth;
  _imgSliderIdentifier;
  _transitionStyle;
  _prevBtnId;
  _nextBtnId;
  _autoSwitch;
  _switchAfter;
  _currentIndex;
  _upperBound;
  _lowerBound;
  _nextIndex;
  _prevIndex;

  constructor({
    imgSliderIdentifier = "",
    dataAttributeIdentifier = "",
    prevBtnId = "",
    nextBtnId = "",
    autoSwitch = false,
    switchAfter = 5000,
  }) {
    this._imgSliderIdentifier = imgSliderIdentifier;
    this._prevBtnId = prevBtnId;
    this._nextBtnId = nextBtnId;
    this._currentIndex = 1;
    this._deviceWidth = window.innerWidth;
    this._autoSwitch = autoSwitch;
    this._switchAfter = switchAfter;

    const imageSlider = document.querySelector(imgSliderIdentifier);
    // this._deviceWidth = window.innerWidth;
    // this._deviceWidth = imageSlider.getBoundingClientRect().width;
    console.log("ImageSilder Width: ", this._deviceWidth);
    console.log(
      ("Image width: ",
      imageSlider.querySelector("img").getBoundingClientRect())
    );
    this.sliderInit(imgSliderIdentifier, dataAttributeIdentifier);

    // This sliderInit() function add two more elements to the images NodeList,
    // so the upper bound and lower bound should exclude the positions of these
    // two extra elements clones
    const imagesContainer = imageSlider.querySelector(
      "[data-slider-container]"
    );
    console.log("After sliderInit: ", imagesContainer);
    this._lowerBound = 0;
    this._upperBound = imagesContainer.children.length - 1;

    this._initEvents();
  }

  /**
   * initializes the slider images positions. Appends a clone of the first image
   * to the end of the slider images list and appends a clone of the last image
   * to the beginning of the slider images list.
   *
   * @param {string} imgSliderIdentifier  the class/id selector of the images
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
  sliderInit(imgSliderIdentifier, dataAttributeIdentifier) {
    // Select the slider images container
    const imageSlider = document.querySelector(imgSliderIdentifier);
    const imagesContainer = imageSlider.querySelector(
      "[data-slider-container]"
    );
    console.log("Images Container: ", imagesContainer);

    // Clone the first and last images
    const firstImg = imagesContainer
      .querySelector(`[${dataAttributeIdentifier}="1"]`)
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

    if (
      !imagesContainer.style.transition ||
      imagesContainer.style.transition === "unset"
    ) {
      imagesContainer.style.transition = "opacity 0.4s ease-in-out"; // To prevent the slider from scrolling on page load
      imagesContainer.style.transform = `translateX(-${this._deviceWidth}px)`;
      this._transitionStyle = "all 0.4s ease-in-out";
    } else {
      this._transitionStyle = imagesContainer.style.transition;
      imagesContainer.style.transition = "opacity 0.4s ease-in-out"; // To prevent the slider from scrolling on page load
      imagesContainer.style.transform = `translateX(-${this._deviceWidth}px)`;
    }
  }

  /**
   * handles adding slider click events to slider related DOM elements
   */
  _initEvents() {
    // Add window resize event to update deviceWidth
    window.addEventListener("resize", (e) => {
      // this._deviceWidth = document
      //   .querySelector(this._imgSliderIdentifier)
      //   .getBoundingClientRect().width;

      this._deviceWidth = e.target.innerWidth;
      // console.log("_deviceWidth: ", this._deviceWidth);
    });

    // Add click event to nextBtn
    this._nextBtnId &&
      document.querySelector(this._nextBtnId).addEventListener("click", (e) => {
        e.prevntDefault();
        console.log("Show next Img");
      });

    // Add click event to nextBtn
    this._prevBtnId &&
      document.querySelector(this._prevBtnId).addEventListener("click", (e) => {
        e.prevntDefault();
        console.log("Show prev Img");
      });

    if (this._autoSwitch || (!this._prevBtnId && !this._nextBtnId)) {
      setInterval(() => {
        this._changeImg("next");
      }, this._switchAfter);
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
    const imageSlider = document.querySelector(this._imgSliderIdentifier);
    const imagesContainer = imageSlider.querySelector(
      "[data-slider-container]"
    );
    // console.log("this._currentIndex before change: ", this._currentIndex);
    // console.log("images length: ", imagesContainer.children.length);
    // console.log("upperBound: ", this._upperBound);

    if (direction === "next") {
      // element.scrollLeft > 0 scroll forwards
      imagesContainer.style.transition = this._transitionStyle;
      imagesContainer.style.transform = `translateX(-${this._scrollToDist(
        this._currentIndex + 1
      )}px)`;

      imagesContainer.ontransitionend = () => {
        // Current Index is the last element (img shown is the last first)
        if (this._currentIndex === this._upperBound) {
          // Jump to the first image, i.e. to lowerBound
          imagesContainer.style.transition = "opacity 0.4s ease-in-out";
          imagesContainer.style.transform = `translateX(-${this._scrollToDist(
            this._lowerBound + 1
          )}px)`;
        }
      };
    }
    if (direction === "previous") {
      // element.scrollLeft > 0 scroll forwards
      imagesContainer.style.transition = this._transitionStyle;
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
   * @param {int} index  image index to scroll to
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
