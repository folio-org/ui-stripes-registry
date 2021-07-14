class RegistryResource {
  /* ACCESS ONLY through getters and setters.
   * These fields should be made private once
   * https://github.com/tc39/proposal-private-methods#private-methods-and-fields
   * is in ECMA officially.
   */
  viewAll;
  viewAllTemplate;
  viewTemplate;
  lookupComponent;
  renderFunctionMap = new Map();

  /* Contains key-value pairs where key is a string,
   * and value is either a string or a function.
   *
   * A string will indicate a static path, ie /erm/agreements
   * A function will indicate a path which contains variables, ie /erm/agreements/{id}
   *
   * For any of the 'default' keys (especially viewResources and viewResource)
   * any functions provided will need to meet a set parameter shape in order
   * that this can be used automatically and dynamically.
   */

  // Eventually we might want to convert these to TypeScript to enforce some of this.
  linksMap = new Map(['viewResources', null], ['viewResource', null]);

  setLink = (linkName, link) => {
    this.linksMap.set(linkName, link);
  };

  getLink = (linkName) => {
    return this.linksMap.get(linkName);
  };

  setViewResource = (link) => {
    this.linksMap.set('viewResource', link);
  };

  getViewResource = () => {
    this.linksMap.get('viewResource');
  };

  setViewResources = (link) => {
    this.linksMap.set('viewResources', link);
  };

  getViewResources = () => {
    this.linksMap.get('viewResources');
  };

  addLookupComponent = (component) => {
    this.lookupComponent = component;
  };

  getLookupComponent = () => {
    return this.lookupComponent;
  };

  setRenderFunction = (name, func) => {
    this.renderFunctionMap.set(name, func);
  };

  getRenderFunction = (name) => {
    return this.renderFunctionMap.get(name);
  };
}

export default RegistryResource;
