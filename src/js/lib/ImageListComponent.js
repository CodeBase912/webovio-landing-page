export default class ImageListComponent {
  /**
   * the rendered image list HTML
   * @property
   * @public
   * @type {{ulElementAttr?: {name: string, value: string}[], images: {liElementAttr?: {name: string, value: string}[], src: string, altText: string, attributes?: {name: string, value: string}[]}[]}}
   */
  model;

  /**
   * @contructor
   * @param {{ulElementAttr?: {name: string, value: string}[], images: {liElementAttr?: {name: string, value: string}[], src: string, altText: string, attributes?: {name: string, value: string}[]}[]}} model
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
      let imgAttributes;
      this.model.attributes
        ? this.model.attributes.map((attribute) => {
            imgAttributes += `${attribute.name}=${attribute.value} `;
          })
        : "";

      // Define li element attributes
      let liAttributes;
      this.model.liElementAttr
        ? this.model.liElementAttr.map((attribute) => {
            liAttributes += `${attribute.name}=${attribute.value} `;
          })
        : "";

      imgList += `
        <li ${liAttributes}>
          <img src="${this.model.src}" alt="${this.model.alt}" ${imgAttributes}/>
        <li>
        `;
    });

    // Define ul element attributes
    let ulAttributes;
    this.model.ulElementAttr
      ? this.model.ulElementAttr.map((attribute) => {
          ulElementAttr += `${attribute.name}=${attribute.value} `;
        })
      : "";

    return `
      <ul ${ulElementAttr}>${imgList}</ul>
    `;
  }
}
