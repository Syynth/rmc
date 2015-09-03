import { createElement } from 'react'

export function renderData({ props, children, tagName }) {
  let kids = children.length > 0 ? children.map(renderData) : [];
  // TODO: Support lookups in the composite component registry
  let tagFn = tagName[0] === tagName[0].toLowerCase() ? tagName : null;
  return createElement(tagFn, props, ...kids);
}
