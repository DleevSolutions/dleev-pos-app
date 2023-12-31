# Introduction

This is meant to be a guide to help new developers understand
the Dleev code style, build process and requirements.

# Installing

NB: take a look at package.json "engines". There you can find npm and node versions required for this app.

## For development

```shell
$ npm start
```

# Project organization

dleev-pos-app/
└── src/
├── assets/
├── components/
├── containers/
| ├── layouts/
| | ├── header/
| | ├── footer/
| | └── sidebar/
| ├── layout1.tsx
| └── layout2.tsx
├── hooks/
├── i18n/
├── types/
├── sagas/
├── store/
├── styles/ using theme props(padding, typography, colors etc) for styling.
├── tests/
├── utils/
└── pages/

## `assets/`

Fonts, images, icons and other stuff.

## `components/`

Stuff like buttons, inputs, labels and all presentational components that goes here. This components can also accept functions as props. Things should be as simple as possible. Using state is allowed but not recommended.

## `containers/`

Containers are built mostly from the composition of presentational components with some styles to layout them together. Containers can also store internal state and access refs to provide additional logic. Accessing store and dispatching actions is also allowed here.

## `pages/`

Page components can store state, receive route parameters and dispatch
Redux actions when applicable. Pages are the highest level of application's
components. They represent the application routes and most times are
displayed by a router. Pages are also responsible for handling container
components callbacks and flowing data into children components.

## `hooks/`

Custom hooks go here.

## `i18n/`

Translation files go here.

## `types/`

Interfaces, types, enums, constants, classes(class as interface)

## `sagas/`

For MVP we keep all the sagas here

## `store/`

For MVP we keep all the reducers here

## `styles/`

Global styles and mui theme settings.
We use styled-components and mui props/tools.
Use theme elements such as typography, palette, spacing, breakpoints as often as possible.

## `tests/`

Tests

## `utils/`

Common utility functions that may be reused across the application.

# Naming

## Styleguide

Follow google typescript guideline https://google.github.io/styleguide/tsguide.html

## Test naming

Test files must start with the entity name which will be tested followed by .test.

## Components naming

Component folders names must start with capital letter, be equal to folder's name(applies only to the main component of the directory) and have .tsx extention
