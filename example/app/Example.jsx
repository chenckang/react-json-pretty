var React = require('react');
var ReactDOM = require('react-dom');

var obj = require('../package.json');

var JSONPretty = require('react-json-pretty');
require('react-json-pretty/JSONPretty.styl');

ReactDOM.render(
  <div>
    <JSONPretty json={obj}></JSONPretty>
  </div>,
  document.getElementById('example')
);
