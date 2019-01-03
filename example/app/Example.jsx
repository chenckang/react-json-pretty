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
require('react-json-pretty/themes/monikai.css');
require('../assets/custom.styl');
obj.text = true;
obj.abc = false;
obj.number = 1234567890;

var JSONPretty1337 = require('react-json-pretty/dist/1337');
var JSONPrettyAcai = require('react-json-pretty/dist/acai');
var JSONPrettyAdv = require('react-json-pretty/dist/adventure_time');
var JSONPrettyMon = require('react-json-pretty/dist/monikai');

document.aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa = 'bbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbb';
var obj3 = CircularJSON.stringify(document);

class Tick extends React.Component {
  constructor() {
    super();
    this.themes = [
      JSONPretty1337,
      JSONPrettyAcai,
      JSONPrettyAdv,
      JSONPrettyMon,
    ];
    this.state = {
      acc: 0,
    };
  }
  
  render() {
    return (
      <JSONPretty data={obj2} 
        theme={
          this.themes[this.state.acc % this.themes.length]
        }
      ></JSONPretty>
    );
  }

  componentDidMount() {
    setInterval(() => {
      this.setState({
        acc: this.state.acc + 1,
      });
    }, 1000);
  }
}

ReactDOM.render(
  <div>
    <div>
      <h4>Use default monikai theme:</h4>
      <JSONPretty id="json-pretty" style={{fontSize: "1.1em"}} data={obj}></JSONPretty>
    </div>
    <div>
      <h4>Switch between themes:</h4>
      <Tick></Tick>
      <h4>Custom themeClassName:</h4>
      <JSONPretty data={obj2} space="4" style={{backgroundColor: '#eee'}} themeClassName="abc"></JSONPretty>
      <h4>Custom formation:</h4>
      <JSONPretty data={obj2} replacer={
        function (key, value) {
          if (key === 'cccc') {
            value += '~~~abc';
          }
          if (key === 'gggg') {
            value *=10;
          }
          return value;
        }
      } space="2"></JSONPretty>
    </div>
    <div>
      <h4>Complex object:</h4>
      <JSONPretty data={obj3}></JSONPretty>
      <JSONPretty className="test-3" data={obj3}></JSONPretty>
      <h4>Custom theme:</h4>
      <JSONPretty className="test-3" themeClassName="custom-json-pretty" data={obj3}></JSONPretty>
    </div>
  </div>,
  document.getElementById('example')
);
