// @ts-check
// ----------------------------------------------------------------------
// TYPES DEFINITION
// ----------------------------------------------------------------------

/**
 * HTML element attributes
 * @typedef {Object} ElementAttributes
 * @property {string} name  attribute name
 * @property {string} value attribute name
 */

/**
 * @typedef {Object} Image
 * @property {string} src  img tag src attributes
 * @property {string} altText  img tag alt attributes
 * @property {ElementAttributes[] | undefined} attributes  img tag attributes
 */

/**
 * @typedef {import("../pages/home/components/Card.component").UserCard} UserCard
 */

/**
 * @typedef {import("./BaseButton.component").ButtonModel} CtaBtn
 */

/**
 * @typedef {Object} APIContent
 * @property {string[] | undefined} string
 * @property {UserCard | undefined} userCard
 * @property {CtaBtn | undefined} ctaBtn
 * @property {"string" | "userCard" | "ctaBtn"} __type
 */

/**
 * @typedef {Object} ContentCard
 * @property {APIContent | undefined} header
 * @property {APIContent} body
 * @property {APIContent | undefined} footer
 */

/**
 * @typedef {Object} HeroSection
 * @property {ContentCard} heroContent
 * @property {Image[]} imgSlider
 * @property {Image[]} clientLogos
 */

/**
 * @typedef {Object} AboutUsSection
 * @property {ContentCard} statement
 * @property {ContentCard} msgFromCEO
 */

/**
 * @typedef {Object} CaseStudy
 * @property {Image} caseImg
 * @property {ContentCard} caseDetails
 * @property {ContentCard} msgFromClient
 */

/**
 * @typedef {Object} SectionTitle
 * @property {string} title
 * @property {string} description
 */

/**
 * @typedef {Object} ProjectsSection
 * @property {SectionTitle} sectionHeader
 * @property {CaseStudy[]} caseStudies
 */

/**
 * @typedef {Object} OurServicesSection
 * @property {SectionTitle} sectionHeader
 * @property {ContentCard[]} ourServices
 * @property {ContentCard} letsGetStarted
 */

/**
 * @typedef {Object} APIResponse
 * @property {HeroSection} heroSection
 * @property {AboutUsSection} aboutUsSection
 * @property {ProjectsSection} projectsSection
 * @property {OurServicesSection} ourServicesSection
 */

// ----------------------------------------------------------------------
// CLASS DEFINITION
// ----------------------------------------------------------------------

export default class BaseSection {
  /**
   * @property
   * @type {APIResponse}
   */
  model;

  /**
   * @property
   * @type {any[]}
   */
  components = [];

  /**
   * @constructor
   * @param {APIResponse} model
   */
  constructor(model) {
    this.model = model;
  }

  async init() {
    // Initialize child components
    await this.initComponents();
  }

  /**
   * @method
   * @protected
   */
  async initComponents() {}

  initEvents() {}

  get template() {
    return this.renderTemplate();
  }

  set addComponent(component) {
    this.components.push(component);
  }

  /**
   * @returns {string} a HTML string of the component
   * @method
   * @protected
   */
  renderTemplate() {
    throw "Base Section Component Error: method `renderTemplate()` has no implementation";
  }
}
