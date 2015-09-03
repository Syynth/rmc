import { createElement } from 'react'

export function renderData({ props, children, tagName }, registry) {
  let kids = children.length > 0 ? children.map(renderData) : [];
  let tagFn = tagName[0] == tagName[0].toLowerCase() ?
      tagName
    :
      registry[tagName];
  return createElement(tagFn, props, ...kids);
}
