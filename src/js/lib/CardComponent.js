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
   * the card configuration options
   * @property
   * @private
   * @type {{preventDefaultAttributes?: boolean}}
   */
  _configOptions;

  /**
   * the rendered card HTML
   * @property
   * @private
   * @type {HTMLDivElement}
   */
  html;

  /**
   *
   *
   * @param {{id?: string, header?: {id?: string, attributes?: {name: string, value: string}[], content: {string?: string, userCard?: {name: string, userInfo: string, userImg: {src: string, altText: string, dimensions?: {width: string, height: string}}}}}, body: {id?: string, attributes?: {name: string, value: string}[], content: {string?: string, userCard?: {name: string, userInfo: string, userImg: {src: string, altText: string, dimensions?: {width: string, height: string}}}}}, footer?: {id?: string, attributes?: {name: string, value: string}[], content: {string?: string, userCard?: {name: string, userInfo: string, userImg: {src: string, altText: string, dimensions?: {width: string, height: string}}}}}, options?: {preventDefaultAttributes?: boolean}}} config
   */
  constructor(config) {
    this.id = config?.id;
    this._header = config?.header;
    this._body = config.body;
    this._footer = config?.footer;
    this._configOptions = config?.options;

    // Set default element attributes (if they are not explicitly prevented)
    if (!this._configOptions?.preventDefaultAttributes) {
      this._setDefaultAttributes();
    }

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

    const cardTemplate = `
      <div id="${this.id}" class="content-card">
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
   * sets default attributes for the card's HTML elements
   * @method
   * @private
   */
  _setDefaultAttributes() {
    // const cardSections = {
    //   header: this._header,
    //   body: this._body,
    //   footer: this._footer,
    // };
    // Object.keys(cardSections).map((section) => {
    //   // Set the default section parent element atrributes
    //   cardSections[section][`attributes`]?.unshift({
    //     name: "class",
    //     value: `content-card__${section}`,
    //   });
    //   if (section === "header") {
    //     cardSections[section]["childElement"] = "h2";
    //   } else {
    //     cardSections[section]["childElement"] = "p";
    //   }
    //   cardSections[section]["childElementAttr"]?.unshift({
    //     name: "class",
    //     value: `content-card__${section}__content`,
    //   });
    // });
  }

  /**
   * the card footer configuration
   * @method
   * @private
   * @param {{id?: string, attributes?: {name: string, value: string}[], content: {string?: string, userCard?: {name: string, userInfo: string, userImg: {src: string, altText: string, dimensions?: {width: string, height: string}}}}}} sectionConfig
   * @param {string} section the card section to render
   * @returns {HTMLDivElement}  html template of a card section
   */
  _cardSectionTemplate = (section, sectionConfig) => {
    if (!sectionConfig) return;

    let classes = "";
    sectionConfig?.attributes?.map((attribute) => {
      if (attribute.name === "class") {
        classes += ` ${attribute.value}`;
      }
    });

    let headerTag;
    if (section === "header") {
      headerTag = "h2";
    }

    return `
    <div ${
      sectionConfig?.id && `id='${sectionConfig.id}'`
    } class="content-card__${section.toLowerCase()} ${classes}">
    ${
      // Render card content
      sectionConfig?.content?.string
        ? // If content if a string
          `<${headerTag ? headerTag : "p"}>${sectionConfig?.content?.string}</${
            headerTag ? headerTag : "p"
          }>`
        : // if content is a user card
          `
          <div>
            <div class="content-card__${section}__user-img-container">
              <img src="${sectionConfig.content.userCard.userImg.src}" alt="${
            sectionConfig.content.userCard.userImg.altText
          }" ${
            sectionConfig.content.userCard.userImg?.dimensions &&
            `width="${sectionConfig.content.userCard.userImg.dimensions.width}" height="${sectionConfig.content.userCard.userImg.dimensions.height}"`
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
          `
    }
    </div>
    `;
  };
}
