import RegistryException from './RegistryException';
import RegistryResource from './RegistryResource';

// This is kept outside the class only because this is a singleton. Would not work otherwise.
const resourceMap = new Map();

const Registry = {

  getRegistry: () => {
    // Return the Map above as an Object, exposing only the publicApi
    return Object.fromEntries(
      Array.from(resourceMap).map(([key, val]) => [key, val.publicApi()])
    );
  },

  getRegistryCount: () => {
    return resourceMap.size;
  },

  getResource: (resourceName) => {
    return resourceMap.get(resourceName)?.publicApi();
  },

  registerResource: (resourceName) => {
    if (resourceMap.has(resourceName)) {
      throw new RegistryException(`Attempted to add existing resourceName (${resourceName}) to the registry`);
    }
    resourceMap.set(resourceName, new RegistryResource({ name: resourceName }));

    return Registry.getResource(resourceName);
  },

  /* Use these to set up/fetch a custom render function for a specific field on a resource.
   * This should not be necessary for a simple resource.path.to.field display
   * but in cases such as returning a field from a speific element of an array,
   * or displaying data from two or more fields as a single string, it can be useful.
   */
  setRenderFunction: (resourceName, fieldName, func) => {
    const resource = Registry.getResource(resourceName);

    if (!resource) {
      throw new RegistryException(`No resource with resourceName (${resourceName}) exists in the registry`);
    }
    resource.setRenderFunction(fieldName, func);
  },

  getRenderFunction: (resourceName, fieldName) => {
    const resource = Registry.getResource(resourceName);
    if (!resource) {
      return undefined;
    }
    return resource.getRenderFunction(fieldName);
  }
};

Object.freeze(Registry);

export default Registry;
