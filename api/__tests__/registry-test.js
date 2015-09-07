jest.dontMock('../registry.js');

const { ComponentRegistry } = require('../registry.js');

const renderFn = jest.genMockFn();
const defArgs = { renderFn };
const freezeItArgs = { renderFn, freeze: true };

describe('ComponentRegistry', () => {

  describe('api', () => {

    it('should have a register method', () => {
      let inst = new ComponentRegistry(defArgs);
      expect(inst.register).toBeDefined();
    });

    it('should have a deregister method', () => {
      let inst = new ComponentRegistry(defArgs);
      expect(inst.deregister).toBeDefined();
    });

  });

  describe('component registration', () => {

    it('should add registered components as properties on the registry', () => {
      let inst = new ComponentRegistry(defArgs);
      expect(inst.someComponent).not.toBeDefined();
      inst.register('someComponent', () => 0);
      expect(inst.someComponent).toBeDefined();
    });

    it('should now allow two components with the same name to be registered', () => {
      let inst = new ComponentRegistry(defArgs);
      expect(() => inst.register('someComponent', () => 0)).not.toThrow();
      expect(() => inst.register('someComponent', () => 0)).toThrow();
    });

  });

  describe('component deregistration', () => {

    it('should remove registered components as properties on the registry', () => {
      let inst = new ComponentRegistry(defArgs);
      inst.register('someComponent', () => 0);
      expect(inst.someComponent).toBeDefined();
      inst.deregister('someComponent');
      expect(inst.someComponent).not.toBeDefined();
    });

  })

  describe('freezing behavior', () => {

    it('should remove the register/deregister methods when constructed', () => {
      let inst = new ComponentRegistry(freezeItArgs);
      expect(inst.register).not.toBeDefined();
      expect(inst.deregister).not.toBeDefined();
    });

    it('should prevent extensions if freeze is passed to the constructor', () => {
      expect(Object.isExtensible(new ComponentRegistry(freezeItArgs)))
        .toEqual(false);
    });

    it('should seal registry if freeze is passed to the constructor', () => {
      expect(Object.isSealed(new ComponentRegistry(freezeItArgs)))
        .toEqual(true);
    });

    it('should freeze registry if freeze is passed to the constructor', () => {
      expect(Object.isFrozen(new ComponentRegistry(freezeItArgs)))
        .toEqual(true);
    });

  });

});
