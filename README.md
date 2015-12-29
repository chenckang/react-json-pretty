# React JSON Pretty

## Introduction

This is a react component that help you to prettify your json strings on the browser based on JavaScript. Presently, it provides a monikai theme style for you, and of course you are free to add your own theme if you like for this is pretty easy.

## Install

    npm install --save react-json-pretty

## Usage

The usage is simple, assuming that you already have a react application of JavaScript, you can visit [Facebook React](https://facebook.github.io/react/) to create one or just take a look at the example provided.

Firstly, you need to require the react-json-pretty:

    var JSONPretty = require('react-json-pretty');

Or use the es2015 syntax with the help of babel:

  import JSONPretty from 'react-json-pretty';

Next, in your 'jsx' use it like the following:

    <JSONPretty json={obj}></JSONPretty>

And also import the style, here is an example of using webpack stylus-loader:

    require('react-json-pretty/JSONPretty.monikai.styl');

Or use the es2015

    import 'react-json-pretty/JSONPretty.monikai.styl';

Where `obj` is the JSON string or just a valid JavaScript object.

If you still do not get it, visit the [example](https://github.com/chenckang/react-json-pretty/tree/master/example).

Lastly, the preview is as below:



## License

MIT (http://www.opensource.org/licenses/mit-license.php)