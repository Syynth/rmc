
const map = Symbol('map');
const set = Symbol('set');

class ComponentRegistry {

  constructor(preload, freeze) {
    this[map] = new Map();
    this[set] = new Set();
    if (preload) {
      Object.keys(preload)
        .forEach(key => this.register(key, preload[key]));
    }
    if (freeze) {
      delete this.register;
      this.register = undefined;
      delete this.deregister;
      this.deregister = undefined;
      Object.seal(this);
      Object.freeze(this);
      Object.preventExtensions(this);
    }

  }

  register(name, component) {
    if (this[set].has(component) || this[map].has(name)) {
      throw new Error('You cannot add the same component to a registry twice!');
    }
    this[set].add(component);
    this[map].set(name, component);
    Object.defineProperty(this, name, {
      configurable: true,
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

export { ComponentRegistry };
