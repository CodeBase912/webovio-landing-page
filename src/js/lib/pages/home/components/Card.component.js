//@ts-check

import { assetsHost } from "../../../../config.js";

// ---------------------------------------------------------------------
// TYPE DEFINITIONS
// ---------------------------------------------------------------------

/**
 * @typedef {Object} ImageDimensions
 * @property {string} width
 * @property {string} height
 */

/**
 * @typedef {Object} Image
 * @property {string} src  img tag src attributes
 * @property {string} altText  img tag alt attributes
 * @property {ImageDimensions} dimensions img tag dimensions
 */

/**
 * @typedef {Object} UserCard
 * @property {string} name
 * @property {string} userInfo
 * @property {Image} userImg
 */

/**
 * @typedef {Object} Content
 * @property {string[] | undefined} string
 * @property {UserCard | undefined} userCard
 * @property {import("./ImageList.component.js").ElementAttributes[] | undefined} attributes
 */

/**
 * @typedef {Object} CardSection
 * @property {string | undefined} id  card section element id
 * @property {Content} content
 * @property {import("./ImageList.component.js").ElementAttributes[] | undefined} attributes
 */

/**
 * @typedef {Object} Config
 * @property {string | undefined} appendTo
 * @property {CardSection | undefined} header
 * @property {CardSection} body
 * @property {CardSection | undefined} footer
 */

// ---------------------------------------------------------------------
// CLASS DEFINITION
// ---------------------------------------------------------------------

export default class CardComponent {
  /**
   * card element's id attribute value
   * @property
   * @public
   * @type {string}
   */
  appendTo;

  /**
   * the card header configuration
   * @property
   * @private
   * @type {CardSection | undefined}
   */
  _header;

  /**
   * the card body configuration
   * @property
   * @private
   * @type {CardSection}
   */
  _body;

  /**
   * the card footer configuration
   * @property
   * @private
   * @type {CardSection | undefined}
   */
  _footer;

  /**
   * the rendered card HTML
   * @property
   * @public
   * @type {string}
   */
  html;

  /**
   *
   *
   * @param {Config} config
   */
  constructor(config) {
    this.appendTo = config?.appendTo ? config?.appendTo : "";
    this._header = config?.header;
    this._body = config.body;
    this._footer = config?.footer;

    // Generate render string
    if (this.appendTo) {
      const parentElement = document.querySelector(this.appendTo);
      if (parentElement) {
        parentElement.innerHTML = this.renderTemplate();
      }
    }
  }

  // --------------------------------------------------------------------------
  // METHODS
  // --------------------------------------------------------------------------

  get template() {
    return this.renderTemplate();
  }

  /**
   * @returns {string} a HTML string of the component
   * @method
   * @protected
   */
  renderTemplate() {
    const headerSection = this._cardSectionTemplate("header", this._header);
    const bodySection = this._cardSectionTemplate("body", this._body);
    const footerSection = this._cardSectionTemplate("footer", this._footer);

    const cardTemplate = `
      <div class="content-card">
        ${headerSection && headerSection}
        ${bodySection}
        ${footerSection && footerSection}
      </div>
    `;

    return cardTemplate;
  }

  // --------------------------------------------------------------------------
  // INTERNAL HELPER FUNCTIONS
  // --------------------------------------------------------------------------

  /**
   * the card footer configuration
   * @method
   * @private
   * @param {CardSection | undefined} sectionConfig
   * @param {string} section the card section to render
   * @returns {string}  html template of a card section
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
    let contentStringElement = "";
    if (sectionConfig?.content?.string) {
      let contentTagAttributes = "";
      sectionConfig.content?.attributes?.map((attribute) => {
        if (attribute.name === "class") {
          classes += ` ${attribute.value}`;
        }
        contentTagAttributes += `${attribute.name}='${attribute.value}'`;
      });
      const headerTag = section === "header" ? "h2" : "p";
      sectionConfig.content.string.map((string) => {
        contentStringElement += `<${headerTag} ${contentTagAttributes}>${string}</${headerTag}>`;
      });
    }

    // Define contentUserCardElement
    let contentUserCardElement;
    if (sectionConfig?.content?.userCard) {
      contentUserCardElement = `
          <div>
            <div class="content-card__${section}__user-img-container">
              <img 
                src="${assetsHost}${
  sectionConfig.content.userCard.userImg.src
}" 
                alt="${sectionConfig.content.userCard.userImg.altText}" 
                ${
  sectionConfig.content.userCard.userImg?.dimensions
    ? `width="${sectionConfig.content.userCard.userImg.dimensions.width}" 
                    height="${sectionConfig.content.userCard.userImg.dimensions.height}"`
    : ""
} 
              />
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
