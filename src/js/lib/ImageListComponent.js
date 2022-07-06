//@ts-check
export default class ImageListComponent {
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

  // ----------------------------------------------------------------------
  // CLASS PROPERTY DEFINITIONS
  // ----------------------------------------------------------------------

  /**
   * the rendered image list HTML
   * @property
   * @public
   * @type {Model}
   */
  model;

  /**
   * @contructor
   * @param {Model} model
   */
  constructor(model) {
    this.model = model;
  }

  initEvents() {}

  get template() {
    return this._renderTemplate();
  }

  /**
   * @returns {string} a HTML string of the component
   * @method
   * @private
   */
  _renderTemplate() {
    let imgList = "";
    this.model.images.map((img) => {
      // Define img element attributes
      let imgAttributes = "";
      img?.attributes
        ? img.attributes.map((attribute) => {
            imgAttributes += `${attribute.name}=${attribute.value} `;
          })
        : "";

      // Define li element attributes
      let liAttributes = "";
      img?.liElementAttr
        ? img.liElementAttr.map((attribute) => {
            if (attribute.name === "class") {
              liAttributes += `${attribute.name}="skeleton-img ${attribute.value}" `;
            } else {
              liAttributes += `${attribute.name}=${attribute.value} `;
            }
          })
        : "";
      console.log("img: ", img);

      imgList += `
        <li ${liAttributes}>
          <img src="${img.src}" alt="${img.altText}" ${imgAttributes}/>
        <li>
        `;
    });

    // Define ul element attributes
    let ulAttributes = "";
    this.model.ulElementAttr
      ? this.model.ulElementAttr.map((attribute) => {
          ulAttributes += `${attribute.name}=${attribute.value} `;
        })
      : "";

    return `
      <ul ${ulAttributes}>${imgList}</ul>
    `;
  }
}
