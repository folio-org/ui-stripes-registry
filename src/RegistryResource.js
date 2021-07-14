class RegistryResource {
  /* ACCESS ONLY through getters and setters.
   * These fields should be made private once
   * https://github.com/tc39/proposal-private-methods#private-methods-and-fields
   * is in ECMA officially.
   *
   * Alternative is the use of a 'publicApi' function as below
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
  linksMap = new Map([['viewResources', null], ['viewResource', null]]);

  setLink = (linkName, link) => {
    this.linksMap.set(linkName, link);
  };

  getLink = (linkName) => {
    return this.linksMap.get(linkName);
  };

  getLinkMap = () => {
    return Object.fromEntries(this.linksMap);
  };

  setViewResource = (link) => {
    this.setLink('viewResource', link);
  };

  getViewResource = () => {
    return this.getLink('viewResource');
  };

  setViewResources = (link) => {
    this.setLink('viewResources', link);
  };

  getViewResources = () => {
    return this.getLink('viewResources');
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

  publicApi = () => ({
    setLink: this.setLink,
    getLink: this.getLink,
    getLinkMap: this.getLinkMap,
    setViewResource: this.setViewResource,
    getViewResource: this.getViewResource,
    setViewResources: this.setViewResources,
    getViewResources: this.getViewResources,
    addLookupComponent: this.addLookupComponent,
    getLookupComponent: this.getLookupComponent,
    setRenderFunction: this.setRenderFunction,
    getRenderFunction: this.getRenderFunction
  });
}

export default RegistryResource;
