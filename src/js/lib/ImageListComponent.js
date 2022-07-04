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
