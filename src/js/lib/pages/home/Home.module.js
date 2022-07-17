import AboutUsSection from "./components/AboutUsSection.component";
import ButtonComponent from "./components/Button.component";
import CardComponent from "./components/Card.component";
import CaseStudiesSection from "./components/CaseStudiesSection.component";
import ImageListComponent from "./components/ImageList.component";
import ImageSliderComponent from "./components/ImageSlider.component";

// ---------------------------------------------------------------------
// TYPE DEFINITIONS
// ---------------------------------------------------------------------

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
 * @typedef {Object} Model
 * @property {ElementAttributes[] | undefined} ulElementAttr
 * @property {Image[]} images
 */

/**
 * @typedef {Object} CallToAction
 * @property {string} text
 * @property {string} style
 * @property {string?} link
 * @property {string} __type
 */

// "title": {
//         "content": {
//           "string": "A creative agency for redemptive brands",
//           "__type": "string"
//         }
//       }
/**
 * @typedef {import("./components/Card.component").UserCard} UserCard
 */

/**
 * @typedef {import("../../base/BaseButton.component").ButtonModel} CtaBtn
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
 * @typedef {Object} HeroContent
 * @property {APIContent} content
 * @property {string} description
 * @property {CallToAction} ctaButton
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

/**
 * @typedef {Object} Config
 * @property {string} appendTo
 */

// ---------------------------------------------------------------------
// HOMEPAGE CLASS DEFINITION
// ---------------------------------------------------------------------

export default class HomePage {
  /**
   * @property
   * @type {APIResponse}
   */
  apiData;

  /**
   * @property
   * @type {any[]}
   */
  components = [];

  constructor() {}

  async init() {
    await this.initComponents();

    // Render Template
    const root = document.querySelector("[data-component=\"HomePageComponent\"]");
    root.innerHTML = this.template;

    // Initiate Component events
    await this.initEvents();
  }

  async initComponents() {
    this.apiData = await this._fetchData();

    // ---------------------------------------------------------------------
    // Init Image Slider Component
    // ---------------------------------------------------------------------
    const images = this.apiData.heroSection.imgSlider;
    images.map((img) => {
      img.liElementAttr = [{ name: "class", value: "hero__img-slider__img" }];
    });
    const Slider__Component = new ImageSliderComponent({
      appendTo: "#hero-img-slider",
      model: {
        ulElementAttr: [
          {
            name: "class",
            value: "hero__img-slider__images-container skeleton-image",
          },
        ],
        images: images,
      },
    });
    this.addComponent = Slider__Component;

    // ---------------------------------------------------------------------
    // Init ClientLogos Component
    // ---------------------------------------------------------------------
    const clientLogos = this.apiData.heroSection.clientLogos;
    clientLogos.map((logo) => {
      logo.liElementAttr = [
        { name: "class", value: "hero__client-logos__img" },
      ];
    });
    const ClientLogos__Component = new ImageListComponent({
      appendTo: "#hero-client-logos",
      model: {
        ulElementAttr: [
          { name: "class", value: "hero__client-logos__container" },
        ],
        images: clientLogos,
      },
    });
    this.addComponent = ClientLogos__Component;

    // ---------------------------------------------------------------------
    // Init HeroContent Component
    // ---------------------------------------------------------------------

    const HeroContent__Cta_Btn__Component = new ButtonComponent({
      appendTo: "",
      model: {
        id: "hero-content-cta",
        ...this.apiData.heroSection.heroContent.footer[
          this.apiData.heroSection.heroContent.footer.__type
        ],
        attributes: [{ name: "class", value: "hero__content__cta-btn" }],
      },
    });

    const HeroContent__Component = new CardComponent({
      appendTo: "#hero-content",
      header: {
        content: {
          string:
            this.apiData.heroSection.heroContent.header[
              this.apiData.heroSection.heroContent.body.__type
            ],
          attributes: [{ name: "class", value: "hero__content__title" }],
        },
      },
      body: {
        content: {
          string:
            this.apiData.heroSection.heroContent.body[
              this.apiData.heroSection.heroContent.body.__type
            ],
          attributes: [{ name: "class", value: "hero__content__description" }],
        },
      },
      footer: {
        content: {
          string: [HeroContent__Cta_Btn__Component.template],
          attributes: [{ name: "class", value: "hero__content__cta" }],
        },
      },
    });
    this.addComponent = HeroContent__Component;

    // ---------------------------------------------------------------------
    // Init HeroContent Component
    // ---------------------------------------------------------------------

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
    this.addComponent = StatementCard__Component;
  }

  set addComponent(component) {
    this.components.push(component);
    console.log("this.components: ", this.components);
  }

  async initEvents() {
    // Init component events
    this.components.map((component) => {
      component.initEvents();
    });
  }

  async _fetchData() {
    const response = await fetch("http://127.0.0.1:5501/src/js/data2.json");
    const data = await response.json();
    delete data.__type;
    return data;
  }

  get template() {
    return this.renderTemplate();
  }

  /**
   * @returns {string} a HTML string of the component
   * @method
   * @protected
   */
  renderTemplate() {
    const AboutUsSection__Component = new AboutUsSection({
      model: this.apiData,
    });
    // Add component to child components array
    // TODO: there's some weird bug when we add the AboutUsSection__Component
    //       to the child components arry. INVESTIGATE!!
    // this.addComponent = AboutUsSection__Component;

    const CaseStudiesSection__Component = new CaseStudiesSection({
      model: this.apiData,
    });
    // Add component to child components array
    // this.addComponent = CaseStudiesSection__Component;

    return `
      <!-- About Us Section -->
      ${AboutUsSection__Component.template}

      <!-- Case Studies Section -->
      ${CaseStudiesSection__Component.template}

      <!-- Our Services Section -->
      <section class="our-services">
        <div class="our-services__intro"></div>
        <div class="our-services__container"></div>
      </section>
    `;
  }
}
