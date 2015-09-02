
const map = Symbol('map');
const set = Symbol('set');

class ComponentRegistry {

  constructor(preload = {}, freeze = false) {
    this[map] = new Map();
    this[set] = new Set();
    if (preload) {
      Object.keys(preload)
        .forEach(key => this.register(key, preload[key]));
    }
    if (freeze) {
      Object.preventExtensions(this);
      Object.freeze(this);
      delete this.register;
      delete this.deregister;
    }

  }

  register(component, name) {
    if (this[set].has(component)) {
      throw new Error('You cannot add the same component to a registry twice!');
    }
    this[set].add(component);
    this[map].set(name, component);
    Object.defineProperty(this, name, {
      // TODO: This might be a big-time bad idea.
      get: () => this[map].get(name)
    });
    return this;
  }

  deregister(name) {
    this[set].delete(this[name]);
    this[map].delete(name);
    delete this[name];
    return this;
  }

}

export default ComponentRegistry;
