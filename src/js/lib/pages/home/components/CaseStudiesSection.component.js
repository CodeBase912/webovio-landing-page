import BaseSection from "../../../base/BaseSection.component";
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

export default class CaseStudiesSection extends BaseSection {
  /**
   *
   * @param {Config} config
   */
  constructor(config) {
    super(config.model);
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
    const SectionHeader__Component = new CardComponent({
      header: {
        content: {
          string: [this.model.projectsSection.sectionHeader.title],
        },
        attributes: [{ name: "class", value: "case-studies__header__title" }],
      },
      body: {
        content: {
          string: [this.model.projectsSection.sectionHeader.description],
        },
        attributes: [
          { name: "class", value: "case-studies__header__description" },
        ],
      },
    });
    // Add component to child components array
    this.addComponent = SectionHeader__Component;

    return `
      <section class="case-studies">
        <div class="case-studies__header">
          ${SectionHeader__Component.template}
        </div>
        <div class="case-studies__container"></div>
      </section>
    `;
  }
}
