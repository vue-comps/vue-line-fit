# vue-line-fit

To make text automatically fit.

`vue-line-fit` is a small component which fits its content to its dimensions.

### [Demo](https://vue-comps.github.io/vue-line-fit)

# Install

```sh
npm install --save-dev vue-line-fit
```
or include `build/bundle.js`.

## Usage
```coffee
# link the components up
components:
  "line-fit": require "vue-line-fit"
  # or:
  "line-fit": window.vueComps.vueLineFit
```
```html
<line-fit>some text to fit</line-fit>
```
For examples see [`dev/`](https://github.com/vue-comps/vue-line-fit/tree/master/dev).

#### Props
| Name | type | default | description |
| ---:| --- | ---| --- |
| refit | Boolean | false | will refit on element resize |
| letter-spacing | Boolean | false | will use css 'letter-spacing' to fill the whole box|
| valign | Boolean | false | will align text vertically in the box|

# Development
Clone repository.
```sh
npm install
npm run dev
```
Browse to `http://localhost:8080/`.

## License
Copyright (c) 2016 Paul Pflugradt
Licensed under the MIT license.
