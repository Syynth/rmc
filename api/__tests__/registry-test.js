jest.dontMock('../registry.js');

const ComponentRegistry = require('../registry.js');

describe('ComponentRegistry', () => {

  describe('api', () => {

    it('should have a register method', () => {
      let inst = new ComponentRegistry();
      expect(inst.register).toBeDefined();
    });

    it('should have a deregister method', () => {
      let inst = new ComponentRegistry();
      expect(inst.deregister).toBeDefined();
    });

  });

  describe('component registration', () => {

    it('should add registered components as properties on the registry', () => {
      let inst = new ComponentRegistry();
      expect(inst.someComponent).not.toBeDefined();
      inst.register('someComponent', () => 0);
      expect(inst.someComponent).toBeDefined();
    });

    it('should now allow two components with the same name to be registered', () => {
      let inst = new ComponentRegistry();
      expect(() => inst.register('someComponent', () => 0)).not.toThrow();
      expect(() => inst.register('someComponent', () => 0)).toThrow();
    });

  });

  describe('component deregistration', () => {

    it('should remove registered components as properties on the registry', () => {
      let inst = new ComponentRegistry();
      inst.register('someComponent', () => 0);
      expect(inst.someComponent).toBeDefined();
      inst.deregister('someComponent');
      expect(inst.someComponent).not.toBeDefined();
    });

  })

  describe('freezing behavior', () => {

    it('should remove the register/deregister methods when constructed', () => {
      let inst = new ComponentRegistry(null, true);
      expect(inst.register).not.toBeDefined();
      expect(inst.deregister).not.toBeDefined();
    });

    it('should prevent extensions if freeze is passed to the constructor', () => {
      expect(Object.isExtensible(new ComponentRegistry(null, true)))
        .toEqual(false);
    });

    it('should seal registry if freeze is passed to the constructor', () => {
      expect(Object.isSealed(new ComponentRegistry(null, true)))
        .toEqual(true);
    });

    it('should freeze registry if freeze is passed to the constructor', () => {
      expect(Object.isFrozen(new ComponentRegistry(null, true)))
        .toEqual(true);
    });

  });

});
