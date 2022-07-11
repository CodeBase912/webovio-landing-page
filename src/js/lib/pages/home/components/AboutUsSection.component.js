import BaseSection from "../../../base/BaseSection.component";

// ----------------------------------------------------------------------
// TYPES DEFINITION
// ----------------------------------------------------------------------

/**
 * @typedef {Object} Config
 * @property {import("../../../base/BaseSection.component").APIResponse} model
 */

// ----------------------------------------------------------------------
// CLASS DEFINITION
// ----------------------------------------------------------------------

export default class AboutUsSection extends BaseSection {
  /**
   * @constructor
   * @param {Config} config
   */
  constructor(config) {
    super(config.model);
  }

  /**
   * @method
   * @protected
   */
  async initComponents() {}

  /**
   * @returns {string} a HTML string of the component
   * @method
   * @protected
   */
  renderTemplate() {
    const StatementCard__Cta_Btn__Component = new ButtonComponent({
      appendTo: "",
      model: {
        id: "statement-card-cta",
        ...this.apiData.aboutUsSection.statement.footer[
          this.apiData.aboutUsSection.statement.footer.__type
        ],
        attributes: [{ name: "class", value: "" }],
      },
    });

    // Add component to child components array
    this.addComponent = StatementCard__Cta_Btn__Component;

    const StatementCard__Component = new CardComponent({
      header: {
        content: {
          string:
            this.apiData.aboutUsSection.statement.header[
              this.apiData.aboutUsSection.statement.header.__type
            ],
          attributes: [{ name: "class", value: "hero__content__title" }],
        },
      },
      body: {
        content: {
          string:
            this.apiData.aboutUsSection.statement.body[
              this.apiData.aboutUsSection.statement.body.__type
            ],
          attributes: [{ name: "class", value: "hero__content__description" }],
        },
      },
      footer: {
        content: {
          string: StatementCard__Cta_Btn__Component.template,
          attributes: [{ name: "class", value: "hero__content__cta" }],
        },
      },
    });

    // Add component to child components array
    this.addComponent = StatementCard__Component;

    return `
      <section class="about-us">
        <div
          class="about-us__statement"
          data-content-id="aboutUsSection.statement"
        >
          ${StatementCard__Component.template}
        </div>
        <div class="about-us__founders-msg"></div>
      </section>
    `;
  }
}
