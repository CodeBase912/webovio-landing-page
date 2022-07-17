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
 * @property {ElementAttributes[] | undefined} attributes
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

  get template() {
    return this.renderTemplate();
  }

  /**
   * @returns {string} a HTML string of the component
   * @method
   * @protected
   */
  renderTemplate() {
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
      classAttr += `class="${this.model.className}"`;
    }

    // Define the button href attribute
    let hrefAttr = "";
    if (this.model?.link) {
      hrefAttr += `href="${this.model.link}"`;
    }

    // Define the button attributes
    let attributes = "";
    this.model?.attributes &&
      this.model?.attributes.map((attribute) => {
        attributes += `${attribute.name}=${attribute.value}`;
      });

    return `
    ${hrefAttr && `<a ${hrefAttr}>`}
      <button ${idAttr} ${classAttr} ${attributes}>
        ${text}
      </button>
    ${hrefAttr && "</a>"}
    `;
  }
}
