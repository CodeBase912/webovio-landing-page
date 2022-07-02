/**
 * gets the value of an object property. The property can be chained using
 * a period (`.`) to get the values of nested object properties.
 * @example Given the object `{person: {firstName: "John", lastName: 'Doe}}`,
 *          the value of the property `firstName` get be obtained by chaining
 *          the relevant props as follows `person.firstName`. Therefore,
 *          calling the function like this `getObjectProps(object, 'person.firstName`)`
 *          would return "John"
 * @param {Object} obj
 * @param {string} property
 * @returns {string | Object}
 */
const getObjectProps = (obj, property) => {
  let selectedProp;
  const propArray = property.trim().split(".");
  propArray.forEach((prop) => {
    if (!selectedProp) {
      selectedProp = obj[prop];
      return;
    }

    selectedProp = selectedProp[prop];
  });

  return selectedProp;
};

export default getObjectProps;
