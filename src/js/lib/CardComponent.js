export default class CardComponent {
  /**
   * card element's id attribute value
   * @property
   * @public
   * @type {string | undefined}
   */
  id;

  /**
   * the card header configuration
   * @property
   * @private
   * @type {{id?: string, attributes?: {name: string, value: string}[], content: {string?: string, userCard?: {name: string, userInfo: string, userImg: {src: string, altText: string, dimensions?: {width: string, height: string}}}}}}
   */
  _header;

  /**
   * the card body configuration
   * @property
   * @private
   * @type {{id?: string, attributes?: {name: string, value: string}[], content: {string?: string, userCard?: {name: string, userInfo: string, userImg: {src: string, altText: string, dimensions?: {width: string, height: string}}}}}}
   */
  _body;

  /**
   * the card footer configuration
   * @property
   * @private
   * @type {{id?: string, attributes?: {name: string, value: string}[], content: {string?: string, userCard?: {name: string, userInfo: string, userImg: {src: string, altText: string, dimensions?: {width: string, height: string}}}}}}
   */
  _footer;

  /**
   * the rendered card HTML
   * @property
   * @public
   * @type {HTMLDivElement}
   */
  html;

  /**
   *
   *
   * @param {{id?: string, header?: {id?: string, attributes?: {name: string, value: string}[], content: {string?: string, userCard?: {name: string, userInfo: string, userImg: {src: string, altText: string, dimensions?: {width: string, height: string}}}}}, body: {id?: string, attributes?: {name: string, value: string}[], content: {string?: string, userCard?: {name: string, userInfo: string, userImg: {src: string, altText: string, dimensions?: {width: string, height: string}}}}}, footer?: {id?: string, attributes?: {name: string, value: string}[], content: {string?: string, userCard?: {name: string, userInfo: string, userImg: {src: string, altText: string, dimensions?: {width: string, height: string}}}}}}} config
   */
  constructor(config) {
    this.id = config?.id;
    this._header = config?.header;
    this._body = config.body;
    this._footer = config?.footer;

    // Generate render string
    this.render();
  }

  // --------------------------------------------------------------------------
  // METHODS
  // --------------------------------------------------------------------------

  /**
   * generates the card's html string to be rendered
   * @method
   * @public
   */
  render() {
    const headerSection = this._cardSectionTemplate("header", this._header);
    const bodySection = this._cardSectionTemplate("body", this._body);
    const footerSection = this._cardSectionTemplate("footer", this._footer);
    // Define element attribute values
    const elementId = this.id ? `id="${this.id}"` : "";

    const cardTemplate = `
      <div ${elementId} class="content-card">
        ${headerSection && headerSection}
        ${bodySection}
        ${footerSection && footerSection}
      </div>
    `;

    this.html = cardTemplate;
  }

  // --------------------------------------------------------------------------
  // INTERNAL HELPER FUNCTIONS
  // --------------------------------------------------------------------------

  /**
   * the card footer configuration
   * @method
   * @private
   * @param {{id?: string, attributes?: {name: string, value: string}[], content: {string?: string, userCard?: {name: string, userInfo: string, userImg: {src: string, altText: string, dimensions?: {width: string, height: string}}}}}} sectionConfig
   * @param {string} section the card section to render
   * @returns {HTMLDivElement}  html template of a card section
   */
  _cardSectionTemplate = (section, sectionConfig) => {
    // If the sectionConfig is undefined return
    if (!sectionConfig) return "";

    // If both the string and userCard content attributes are both defined
    // log an error in the console
    if (sectionConfig?.content?.string && sectionConfig?.content?.userCard) {
      // Handle the error
      console.error(
        `CardContent Error: Both string & userCard attributes are defined for card ${section} section. Only one should be defined`
      );
    }

    // If neither the string and userCard content attributes are defined
    // log an error in the console
    if (!sectionConfig?.content?.string && !sectionConfig?.content?.userCard) {
      // Handle the error
      console.error(
        `CardContent Error: Both string & userCard attributes are undefined for card ${section} section. At least one should be defined`
      );
    }

    // Define contentStringElement
    let contentStringElement;
    if (sectionConfig?.content?.string) {
      const headerTag = section === "header" ? "h2" : "p";
      contentStringElement = `<${headerTag}>${sectionConfig?.content.string}</${headerTag}>`;
    }

    // Define contentUserCardElement
    let contentUserCardElement;
    if (sectionConfig?.content?.userCard) {
      contentUserCardElement = `
          <div>
            <div class="content-card__${section}__user-img-container">
              <img src="${sectionConfig.content.userCard.userImg.src}" alt="${
        sectionConfig.content.userCard.userImg.altText
      }" ${
        sectionConfig.content.userCard.userImg?.dimensions
          ? `width="${sectionConfig.content.userCard.userImg.dimensions.width}" height="${sectionConfig.content.userCard.userImg.dimensions.height}"`
          : ""
      } />
            </div>
            <div class="content-card__${section}__user-details">
            <p class="content-card__${section}__user-details__user-name">${
        sectionConfig.content.userCard.name
      }</p>
            <p class="content-card__${section}__user-details__user-info">${
        sectionConfig.content.userCard.userInfo
      }</p>
            </div>
          </div>
          `;
    }

    // Define element attributes
    const elementId = sectionConfig?.id ? `id='${sectionConfig.id}'` : "";
    let classes = "";
    sectionConfig?.attributes?.map((attribute) => {
      if (attribute.name === "class") {
        classes += ` ${attribute.value}`;
      }
    });

    return `
    <div ${elementId} class="content-card__${section.toLowerCase()} ${classes}">
    ${
      // Render card section content
      sectionConfig?.content?.string
        ? // If content if a string
          contentStringElement
        : // if content is a user card
          contentUserCardElement
    }
    </div>
    `;
  };
}
