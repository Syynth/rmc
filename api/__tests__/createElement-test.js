jest.dontMock('../createElement');
jest.dontMock('../../test-data/simple-div.json');

const createElement = require('../createElement').createElement;
const DivElem = require('../../test-data/simple-div.json');

describe('createElement function', () => {

  describe('should allow nodes to be DOMStrings', () => {

    it('should create a DOM node (div)', () => {
      const React = require('react/addons');
      const { TestUtils } = React.addons;

      const result = TestUtils.renderIntoDocument(createElement(DivElem));

      expect(result.type).toEqual('div');
    });

  })

});
