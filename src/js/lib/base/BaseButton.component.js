// @ts-check
// ----------------------------------------------------------------------
// TYPE DEFINITIONS
// ----------------------------------------------------------------------

/**
 * @typedef {import("./BaseImageList.js").ElementAttributes} ElementAttributes
 */

/**
 * @typedef {Object} ButtonModel
 * @property {string} id
 * @property {string} text
 * @property {string | undefined} link
 * @property {string | undefined} className
 * @property {ElementAttributes[] | undefined} attibutes
 */

// ----------------------------------------------------------------------
// CLASS DEFINITION
// ----------------------------------------------------------------------

export default class BaseButton {
  /**
   * the rendered image list HTML
   * @property
   * @public
   * @type {ButtonModel}
   */
  model;

  /**
   * @constructor
   * @param {ButtonModel} model
   */
  constructor(model) {
    this.model = model;
  }

  initEvent() {}

  _renderTemplate() {
    // Log an error in the console if there is no id property
    // in the model
    if (!this.model.id) {
      console.error(
        "Button Component Error: \n Button model has no 'id' attribute"
      );
    }
    const idAttr = this.model?.id ? `id=${this.model.id}` : "";

    // Log an error in the console if there is no text property
    // in the model
    if (!this.model.text) {
      console.error(
        "Button Component Error: \n Button model has no 'text' attribute"
      );
    }
    const text = this.model?.text ? this.model.text : "";

    // Define the button class attribute
    let classAttr = "";
    if (this.model?.className) {
      classAttr += `class=${this.model.className}`;
    }

    // Define the button attributes
    let attributes = "";
    this.model?.attibutes &&
      this.model?.attibutes.map((attribute) => {
        attributes += `${attribute.name}=${attribute.value}`;
      });

    return `
    <button ${idAttr} ${classAttr} ${attributes}>
      ${text}
    </button>
    `;
  }
}
