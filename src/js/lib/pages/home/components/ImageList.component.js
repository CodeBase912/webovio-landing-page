//@ts-check

import BaseImageList from "../../../base/BaseImageList";

// ----------------------------------------------------------------------
// TYPE DEFINITIONS
// ----------------------------------------------------------------------

/**
 * HTML element attributes
 * @typedef {Object} ElementAttributes
 * @property {string} name  attribute name
 * @property {string} value attribute name
 */

/**
 * @typedef {Object} Image
 * @property {ElementAttributes[] | undefined} liElementAttr  list tag element attributes
 * @property {string} src  img tag src attributes
 * @property {string} altText  img tag alt attributes
 * @property {ElementAttributes[] | undefined} attributes  img tag attributes
 */

/**
 * @typedef {Object} Model
 * @property {ElementAttributes[] | undefined} ulElementAttr
 * @property {Image[]} images
 */

/**
 * @typedef {Object} Config
 * @property {string | undefined} appendTo
 * @property {Model} model
 */

// ----------------------------------------------------------------------
// CLASS PROPERTY DEFINITIONS
// ----------------------------------------------------------------------

export default class ImageListComponent extends BaseImageList {
  /**
   * @contructor
   * @param {Config} config
   */
  constructor(config) {
    super(config.model);

    // If appendTo is defined render the component
    if (config?.appendTo) {
      const parentElement = document.querySelector(config.appendTo);
      if (parentElement) {
        parentElement.innerHTML = this.template;
      }
    }
  }
}
