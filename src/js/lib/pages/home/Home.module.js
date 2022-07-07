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

/**
 * @typedef {Object} HeroContent
 * @property {string} title
 * @property {string} description
 * @property {CallToAction} ctaButton
 */

/**
 * @typedef {Object} HeroSection
 * @property {HeroContent} heroContent
 * @property {Image[]} imgSlider
 * @property {Image[]} clientLogos
 */

/**
 * @typedef {Object} APIResponse
 * @property {HeroSection} heroSection
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
    const HeroContent__Component = new CardComponent({
      appendTo: "#hero-content",
      header: {
        content: {
          string: this.apiData.heroSection.heroContent.title,
          attributes: [{ name: "class", value: "hero__content__title" }],
        },
      },
      body: {
        content: {
          string: this.apiData.heroSection.heroContent.description,
          attributes: [{ name: "class", value: "hero__content__description" }],
        },
      },
      footer: {
        content: {
          string: `
            <button class="hero__content__cta-btn">
              ${this.apiData.heroSection.heroContent.ctaButton.text}
            </button>
          `,
          attributes: [{ name: "class", value: "hero__content__cta" }],
        },
      },
    });

    // ---------------------------------------------------------------------
    // Init HeroContent Component
    // ---------------------------------------------------------------------
    const StatementCard__Component = new CardComponent({
      header: {
        content: {
          string: this.apiData.heroSection.heroContent.title,
          attributes: [{ name: "class", value: "hero__content__title" }],
        },
      },
      body: {
        content: {
          string: this.apiData.heroSection.heroContent.description,
          attributes: [{ name: "class", value: "hero__content__description" }],
        },
      },
      footer: {
        content: {
          string: `
            <button class="hero__content__cta-btn">
              ${this.apiData.heroSection.heroContent.ctaButton.text}
            </button>
          `,
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
