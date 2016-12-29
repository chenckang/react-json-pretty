var React = require('react');
var ReactDOM = require('react-dom');

var obj = require('../package.json');
var obj2 = {
  aaaa: 1,
  bbbb: true,
  cccc: "ab\"cd\\",
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

var JSONPretty = require('react-json-pretty');
require('react-json-pretty/JSONPretty.adventure_time.styl');
obj.text = true;
obj.abc = false;
obj.number = 1234567890;

ReactDOM.render(
  <div>
    <div>
      <JSONPretty id="json-pretty" style={{fontSize: "1.5em"}} json={obj}></JSONPretty>
    </div>
    <div>
      <JSONPretty json={obj2}></JSONPretty>
    </div>
    <div>
      <JSONPretty json={React}></JSONPretty>
    </div>
  </div>,
  document.getElementById('example')
);
