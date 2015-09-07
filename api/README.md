# React Meta Components
The _React Meta Components_ project (`rmc`) is essentially a minimal
implementation of at least three independent pieces. In the future, this
repository will likely house all three tied together in a user-friendly fashion.
These are given alphabetic names corresponding to their level of complexity:
`rmc-a`, `rmc-b`, `rmc-c`

## React Meta Components API (`rmc-a`)
The core of rmc will be the rendering API. This package defines two
core primitives which are built upon by the higher level projects. First, it
defines a data specification (if the project matures and is successful, this
  could be handled as a separate, formal spec), and it defines a rendering
library for creating web pages from the data objects described in the spec.

This may eventually be broken into two smaller pieces, `rmc-data` and
`rmc-render` (or `rmc-react`)

## React Meta Components Builder (`rmc-b`)
The second level of abstraction under the RMC umbrella will be the 'builder'
project which provides a set of APIs for easily constructing, manipulating,
and accessing RMC data objects. In addition to these builder APIs, this phase of
development will also center around creating a WSYWIG editor which uses the APIs
of both the builders and the renderers to edit/create/view RMC objects in a
friendly manner for developers and non-developer web professionals alike.

## React Meta Components CMS (`rmc-c`)
The final level of React Meta Components is to provide a data model and back end
service through [React](http://facebook.github.io/react/),
[Relay](http://facebook.github.io/relay/), and
[GraphQL](http://facebook.github.io/graphql/). This should essentially be
provided as a series of plugins for `rmc-b`, as well as a default project for
the backend which requires minimal configuration to be useful. Perhaps this will
be available as a [yeoman](https://github.com/yeoman/yo) generator.
In principle, `rmc-c` could be implemented in multiple languages, and portable
between such back ends, provided they are all at the same API level/feature set.
