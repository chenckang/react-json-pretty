# React JSON Pretty

[![npm version](https://badge.fury.io/js/react-json-pretty.svg)](https://badge.fury.io/js/react-json-pretty)

## Introduction

This is a react component that help you to prettify your json strings on the browser based on JavaScript. Presently, it provides a monikai theme style for you, and of course you are free to add your own theme if you like for this is pretty easy.

## Install

    npm install --save react-json-pretty

## Usage

The usage is quite simple, assuming that you already have a react application of JavaScript. If you don't, visit [Facebook React](https://facebook.github.io/react/) to create one or just take a look at the [example](https://github.com/chenckang/react-json-pretty/tree/master/example) provided.

Firstly, you need to require the react-json-pretty:

    var JSONPretty = require('react-json-pretty');

Or use the es2015 syntax with the help of babel:

    import JSONPretty from 'react-json-pretty';

Next, in your 'jsx' file use it like the following:

    <JSONPretty id="json-pretty" json={obj}></JSONPretty>

Where `obj` is the JSON string or just a valid JavaScript object.

And also you can import the style to the document, here is an example of using webpack loaders(`style!css!stylus`) to load style, You can visit (webpack)[https://webpack.github.io/] to get more details:

    require('react-json-pretty/JSONPretty.monikai.styl');

Or use the es2015

    import 'react-json-pretty/JSONPretty.monikai.styl';

If you still don't get it, visit the [example](https://github.com/chenckang/react-json-pretty/tree/master/example).

Lastly, if you succeed so far the preview will look like the below:

![previews, you can also find it in the example folder](http://chenckang.github.io/labs/imgs/preview.png)

Have your fun!

## License

MIT (http://www.opensource.org/licenses/mit-license.php)