var React = require('react');
var ReactDOM = require('react-dom');
var CircularJSON = require('circular-json')

var obj = require('../package.json');
var obj2 = {
  aaaa: 1,
  'bb:bb': true,
  cccc: "ab\"cd\\",
  ':i\"iii:': ":ii:ii",
  dddd: {
    eeee: 1,
    ffff: [
      {
        gggg: 3
      },
      2,
      "str:ing"
    ]
  }
};

var JSONPretty = require('react-json-pretty');
require('react-json-pretty/JSONPretty.adventure_time.styl');
require('../assets/custom.styl');
obj.text = true;
obj.abc = false;
obj.number = 1234567890;

ReactDOM.aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa = 'bbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbb';
var obj3 = CircularJSON.stringify(ReactDOM);

ReactDOM.render(
  <div>
    <div>
      <JSONPretty id="json-pretty" style={{fontSize: "1.1em"}} json={obj}></JSONPretty>
    </div>
    <div>
      <JSONPretty json={obj2}></JSONPretty>
      <JSONPretty json={obj2} space="4"></JSONPretty>
      <JSONPretty json={obj2} replacer={
        function (key, value) {
          if (key === 'cccc') {
            value += '~~~abc';
          }
          if (key === 'gggg') {
            value *=10;
          }
          return value;
        }
      } space="4"></JSONPretty>
    </div>
    <div>
      <JSONPretty json={obj3}></JSONPretty>
      <JSONPretty className="test-3" json={obj3}></JSONPretty>
      <JSONPretty className="test-3" themeClassName="custom-json-pretty" json={obj3}></JSONPretty>
    </div>
  </div>,
  document.getElementById('example')
);
