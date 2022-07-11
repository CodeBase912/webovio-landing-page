import { assetsHost } from "../../../../config";
import BaseSection from "../../../base/BaseSection.component";
import ButtonComponent from "./Button.component";
import CardComponent from "./Card.component";

// ----------------------------------------------------------------------
// TYPES DEFINITION
// ----------------------------------------------------------------------

/**
 * @typedef {Object} Config
 * @property {string} id
 * @property {import("../../../base/BaseSection.component").CaseStudy} model
 */

// ----------------------------------------------------------------------
// CLASS DEFINITION
// ----------------------------------------------------------------------

export default class CaseStudy extends BaseSection {
  /**
   * @property
   * @public
   * @type {import("../../../base/BaseSection.component").CaseStudy}
   */
  model;

  /**
   * @property
   * @public
   * @type {string}
   */
  id;

  /**
   *
   * @param {Config} config
   */
  constructor(config) {
    super();
    this.model = config.model;
    this.id = config.id;
  }

  /**
   * @method
   * @public
   */
  async initEvents() {
    // Initialize child component events
    this.components.map((component) => {
      component.initEvents();
    });
  }

  renderTemplate() {
    // Define img element attributes
    let imgTagAttributes = "";
    if (this.model.caseImg?.attributes) {
      this.model.caseImg.attributes.map((attribute) => {
        if (attribute.name && attribute.value) {
          imgTagAttributes += `${attribute.name}='${attribute.value}' `;
        }
      });
    }

    const CaseStudy__CtaBtn__Component = new ButtonComponent({
      model: {
        id: this.id,
        ...this.model.caseDetails.footer[this.model.caseDetails.footer.__type],
      },
    });

    const DetailsContentCard__Component = new CardComponent({
      header: {
        content: {
          string:
            this.model.caseDetails.header[this.model.caseDetails.header.__type],
        },
      },
      body: {
        content: {
          string:
            this.model.caseDetails.body[this.model.caseDetails.body.__type],
        },
      },
      footer: {
        content: {
          string: [CaseStudy__CtaBtn__Component.template],
        },
      },
    });

    const MsgFromClientCard__Component = new CardComponent({
      body: {
        content: {
          string:
            this.model.msgFromClient.body[this.model.msgFromClient.body.__type],
        },
      },
      footer: {
        content: {
          userCard:
            this.model.msgFromClient.footer[
              this.model.msgFromClient.footer.__type
            ],
        },
      },
    });

    console.log(
      "MsgFromClientCard__Component: ",
      MsgFromClientCard__Component.template
    );

    return `
      <div class="case-studies__study">

        <!-- Case Study Details Content Card -->
        <div class="case-studies__study__details-card">
          <!-- CardComponent goes here -->
          ${DetailsContentCard__Component.template}
        </div>

        <!-- Case Study Image -->
        <div class="case-studies__study__img">
          <img src="${assetsHost}${this.model.caseImg.src}" alt="${this.model.caseImg.altText}" ${imgTagAttributes} />
           
          <!-- Case Study Message From Client Content Card -->
          <div class="case-studies__study__msgFromClient-card">
            <!-- CardComponent goes here -->
            ${MsgFromClientCard__Component.template}
          </div>
        </div>
         
      </div>
    `;
  }
}
