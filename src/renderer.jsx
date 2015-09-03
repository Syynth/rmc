import { Component, createElement, PropTypes } from 'react'

export function renderData(data, registry) {
  if (typeof data === 'string' || data instanceof String) {
    return data;
  }
  let { children, tagName, props } = data;
  let kids = children.length > 0 ? children.map(renderData) : [];
  let tagFn = tagName[0] == tagName[0].toLowerCase() ?
      tagName
    :
      registry[tagName];
  return createElement(tagFn, props, ...kids);
}

export class RmcRenderer extends Component {
  render() {
    return renderData(this.props.data, this.context.registry);
  }
}

RmcRenderer.propTypes = {
  data: PropTypes.shapeOf({
    tagName: PropTypes.string.isRequired,
    props: PropTypes.object.isRequired,
    children: PropTypes.arrayOf(PropTypes.oneOf([
      PropTypes.string, PropTypes.object
    ])).isRequired
  })
};

RmcRenderer.contextTypes = {
  registry: PropTypes.object
};
