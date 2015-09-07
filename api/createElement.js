import { createElement } from 'react'

isString = o => typeof o === 'string' || typeof o === 'String';
isFunction = o => typeof o === 'function';

function lookupComponent(tagName) {
  return tagName;
}

function render(element, props, ...children) {
  if (isString(element) || isFunction(element)) {
    return createElement(element, props, ...children.map(render));
  }
  const tagConstructor = lookupComponent(element.tagName);
  return createElement(tagConstructor, props, ...children.map(render));
}

export { render as createElement };
