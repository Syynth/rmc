
const map = Symbol('map');
const set = Symbol('set');
const render = Symbol('render');

class ComponentRegistry {

  constructor({ renderFn, preload, freeze = false }) {
    this[map] = new Map();
    this[set] = new Set();
    if (!renderFn) {
      throw new TypeError('Component Registry must be given a render function');
    }
    this[render] = renderFn;
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
    let componentJSON = JSON.stringify(component);
    if (this[set].has(componentJSON) || this[map].has(name)) {
      throw new Error('You cannot add the same component to a registry twice!');
    }
    this[set].add(componentJSON);
    this[map].set(name, component);
    Object.defineProperty(this, name, {
      configurable: true,
      get: () => _ => this[render](this[map].get(name), this)
    });
    return this;
  }

  deregister(name) {
    this[set].delete(JSON.stringify(this[map].get(name)));
    this[map].delete(name);
    delete this[name];
    return this;
  }

}

export { ComponentRegistry };
