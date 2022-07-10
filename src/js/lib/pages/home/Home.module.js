import ButtonComponent from "./components/Button.component";
import CardComponent from "./components/Card.component";
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

  constructor() {
    this.init();
  }

  async init() {
    await this.initComponents();

    // Render Template

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

    console.log(`\n\nSlider:>>>> `, Slider__Component);
  }

  set addComponent(component) {
    this.components.push(component);
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

  _generateTemplate() {
    return `
      <section class="about-us">
        <div
          class="about-us__statement"
          data-content-id="aboutUsSection.statement"
        >
          <!-- Dev: Card template -->
          <div class="content-card about-us__statement-card">
            <!-- Card Header -->
            <div class="content-card__header"></div>
            <!-- Card Body -->
            <div class="content-card__body"></div>
            <!-- Card Footer -->
            <div class="content-card__footer"></div>
          </div>
        </div>
        <div class="about-us__founders-msg"></div>
      </section>

      <!-- Case Studies Section -->
      <section class="case-studies">
        <div class="case-studies__intro"></div>
        <div class="case-studies__container"></div>
      </section>

      <!-- Our Services Section -->
      <section class="our-services">
        <div class="our-services__intro"></div>
        <div class="our-services__container"></div>
      </section>
    `;
  }
}
