import BaseSection from "../../../base/BaseSection.component";
import ButtonComponent from "./Button.component";
import CardComponent from "./Card.component";

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
   * @public
   */
  initEvents() {
    // Initialize child component events
    this.components.map((component) => {
      component.initEvents();
    });
  }

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
        ...this.model.aboutUsSection.statement.footer[
          this.model.aboutUsSection.statement.footer.__type
        ],
        attributes: [{ name: "class", value: "" }],
      },
    });

    // Add component to child components array
    this.addComponent = StatementCard__Cta_Btn__Component;

    const StatementCard__Component = new CardComponent({
      header: {
        content: {
          string: [
            this.model.aboutUsSection.statement.header[
              this.model.aboutUsSection.statement.header.__type
            ],
          ],
          attributes: [{ name: "class", value: "hero__content__title" }],
        },
      },
      body: {
        content: {
          string: [
            this.model.aboutUsSection.statement.body[
              this.model.aboutUsSection.statement.body.__type
            ],
          ],
          attributes: [{ name: "class", value: "hero__content__description" }],
        },
      },
      footer: {
        content: {
          string: [StatementCard__Cta_Btn__Component.template],
          attributes: [{ name: "class", value: "hero__content__cta" }],
        },
      },
    });

    // Add component to child components array
    this.addComponent = StatementCard__Component;
    console.log(
      "msgFromCeo Footer: ",
      this.model.aboutUsSection.msgFromCEO.footer[
        this.model.aboutUsSection.msgFromCEO.footer.__type
      ]
    );
    const MsgFromCeoCard__Component = new CardComponent({
      body: {
        content: {
          string: [
            this.model.aboutUsSection.msgFromCEO.body[
              this.model.aboutUsSection.msgFromCEO.body.__type
            ],
          ],
          attributes: [{ name: "class", value: "hero__content__description" }],
        },
      },
      footer: {
        content: {
          userCard:
            this.model.aboutUsSection.msgFromCEO.footer[
              this.model.aboutUsSection.msgFromCEO.footer.__type
            ],
          attributes: [{ name: "class", value: "hero__content__cta" }],
        },
      },
    });

    // Add component to child components array
    this.addComponent = MsgFromCeoCard__Component;

    return `
      <section class="about-us">
        <div
          class="about-us__statement"
          data-content-id="aboutUsSection.statement"
        >
          ${StatementCard__Component.template}
        </div>
        <div class="about-us__founders-msg">
          ${MsgFromCeoCard__Component.template}
        </div>
      </section>
    `;
  }
}
