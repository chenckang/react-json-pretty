# React JSON Pretty

[![npm version](https://badge.fury.io/js/react-json-pretty.svg)](https://badge.fury.io/js/react-json-pretty)
[![npm downloads](https://img.shields.io/npm/dm/react-json-pretty.svg)](https://www.npmjs.com/package/react-json-pretty)
[![build status](https://api.travis-ci.org/chenckang/react-json-pretty.svg?branch=master)](https://travis-ci.org/chenckang/react-json-pretty)
![MIT license](https://img.shields.io/github/license/mashape/apistatus.svg)

## Introduction

This is a react component that help you to prettify your json strings on the browser based on JavaScript. Presently, it provides a monikai theme style for you, and of course you are free to add your own theme if you like for this is pretty easy.

## Install
```bash
npm install --save react-json-pretty
```

## Usage

The usage is quite simple, assuming that you already have a react application of JavaScript. If you don't, visit [Facebook React](https://facebook.github.io/react/) to create one or just take a look at the [example](https://github.com/chenckang/react-json-pretty/tree/master/example) provided.

Firstly, you need to require the react-json-pretty:

```javascript
var JSONPretty = require('react-json-pretty');
```
Or use the es2015 syntax with the help of babel:

```javascript
import JSONPretty from 'react-json-pretty';
```

Next, in your 'jsx' file use it like the following:

```javascript
<JSONPretty id="json-pretty" json={obj}></JSONPretty>
```

Where `obj` is the JSON string or just a valid JavaScript object.

And also you can import the style to the document, here is an example of using webpack loaders(`style!css!stylus`) to load style, You can visit [webpack](https://webpack.github.io/) to get more details:

```javascript
require('react-json-pretty/JSONPretty.monikai.styl');
```

Or use the es2015

```javascript
import 'react-json-pretty/JSONPretty.monikai.styl';
```

If you still don't get it, visit the [example](https://github.com/chenckang/react-json-pretty/tree/master/example).

Lastly, if you succeed so far the preview will look like the below:

![previews, you can also find it in the example folder](http://imgs.co/u/16/07/18/VjeAR.png)

## Upgrade

### Formation

Actually, react-json-pretty is based on `JSON.stringify(value[, replacer[, space]])`. However, `JSON.stringify(value[, replacer[, space]])` has some optional parameters additionally such as `replacer` and `space`. so since the version 1.7.0, we extend react-json-pretty to support these two parameters.

Here is the example:

```javascript
<JSONPretty json={yourJSON} replacer={
    function (key, value) {
        if (key === 'cccc') {
            value += '~~~abc';
        }
        if (key === 'gggg') {
            value *=10;
        }
        return value;
    }
} space="4"
>
</JSONPretty>
```

The default value for property `replacer` is `null`，and `space` is `2`.

You can visit the [example](https://github.com/chenckang/react-json-pretty/tree/master/example) to see the details.

### Class

Since the version 1.7.0, we add `themeClassName` property for adding custom theme `className`，the default `className` for theme is `json-pretty`. but in case you want to have your own name, you use `themeClassName` property to modify it;

```javascript
// The final className will be 'test-class custom-json-pretty'
<JSONPretty className="test-class" themeClassName="custom-json-pretty"
    json={yourjson}
>
</JSONPretty>
```

### Themes

Since the version 1.3.0, we have added more color themes to this package, including "Adventure Time", acai and 1337, to provide users more ready-made options.

![Adventure Time](https://go.imgs.co/u/2016/12/29/2DjoGR.png)
![1337](https://go.imgs.co/u/2016/12/29/24Wp3D.md.png)
![acai](https://go.imgs.co/u/2016/12/29/2Dji9i.md.png)

## Changelog

### 1.7.0

1. Add JSON formation properties —— `replacer` `space`
2. Add class propertieds —— `themeClassName`
3. Add .npmignore

### 1.6.3

1. Add jest coverage
2. Add eslint
3. Add husky for git hook

### 1.6.2

1. Add testcases(using jest)
2. Add .travis.yml for travis ci

### 1.6.1

1. Upgrade examples to depress warnings

### 1.6.0

1. Use npm creat-react-class instead of using React.createClass to avoid react deprecated warning
2. Peer Dependencies of react update to ">=15.5.0"
3. Build all stylus files to css files
4. Upgrade examples(use `npm link` command to add react-json-pretty as dependencies)
5. Fix circular json problems in examples

## License

MIT (http://www.opensource.org/licenses/mit-license.php)
