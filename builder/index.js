
import { render } from 'react-dom'
import { createElement } from '../api'
import DivElem from '../test-data/simple-div'

render(createElement(DivElem), document.body);
