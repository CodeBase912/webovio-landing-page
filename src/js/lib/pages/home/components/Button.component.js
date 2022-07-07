// @ts-check
import BaseButton from "../../../base/BaseButton.component";

// ----------------------------------------------------------------------
// TYPE DEFINITIONS
// ----------------------------------------------------------------------

/**
 * @typedef {Object} ButtonOptions
 * @property {"contained" | "outlined" | "text"} type the type of button to
 *                                                    render. Default value
 *                                                    is `contained`
 */

/**
 * @typedef {Object} Config
 * @property {string} appednTo
 * @property {import("../../../base/BaseButton.component").ButtonModel} model
 * @property {ButtonOptions | undefined} options
 */

// ----------------------------------------------------------------------
// CLASS DEFINITION
// ----------------------------------------------------------------------

export default class ButtonComponent extends BaseButton {
  /**
   * @constructor
   * @param {Config} config
   */
  constructor(config) {
    super(config.model);

    // Set options property
    /**
     * @type {ButtonOptions}
     */
    const defaultOptions = { type: "contained" };
    this._options = config?.options ? config?.options : defaultOptions;

    // Add configuration options to the model
    if (config?.options) {
      if (this.model?.className) {
        this.model.className += ` btn-${config.options.type}`;
      } else {
        this.model.className = `btn-${config.options.type}`;
      }
    }
  }
}
