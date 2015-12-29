var React = require('react');
var ReactDOM = require('react-dom');

var obj = require('../package.json');
var obj2 = {
  aaaa: 1,
  bbbb: true,
  cccc: "abcd",
  dddd: {
    eeee: 1,
    ffff: [
      {
        gggg: 3
      },
      2,
      "string"
    ]
  }
};

var JSONPretty = require('react-json-pretty/JSONPretty.jsx');
require('react-json-pretty/JSONPretty.monikai.styl');

ReactDOM.render(
  <div>
    <div>
      <JSONPretty json={obj}></JSONPretty>
    </div>
    <div>
      <JSONPretty json={obj2}></JSONPretty>
    </div>
  </div>,
  document.getElementById('example')
);
