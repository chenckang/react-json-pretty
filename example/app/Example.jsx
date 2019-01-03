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
require('react-json-pretty/themes/JSONPretty.adventure_time.css');
require('../assets/custom.styl');
obj.text = true;
obj.abc = false;
obj.number = 1234567890;

document.aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa = 'bbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbb';
var obj3 = CircularJSON.stringify(document);

class Tick extends React.Component {
  constructor() {
    super();
    this.themes = [
      {
        main: 'background-color: #999',
        key: 'color:rgba(255,94,94,1);',
        value: 'color:rgba(253,176,130,1);',
        string: 'color:rgba(233,253,172,1);',
        boolean: 'rgba(102,153,204,1);',
      },
      {
        main: 'background-color:rgba(116,128,150,1)',
        key: 'color:rgba(181,83,191,1);',
        value: 'color:rgba(147,163,191,1);',
        string: 'color:rgba(251,168,86,1);',
        boolean: 'color:rgba(68,138,169,1);',
      },
      {
        main: 'background-color#1e1e1e;color:rgba(245,187,18,1)',
        key: 'color:rgba(211,66,46,1);',
        value: 'color:rgba(191,215,219,1);',
        string: 'color:rgba(127,214,250,1);',
        boolean: 'color:rgba(75,174,22,1);',
      }
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
    }, 3000);
  }
}

ReactDOM.render(
  <div>
    <div>
      <JSONPretty id="json-pretty" style={{fontSize: "1.1em"}} data={obj}></JSONPretty>
    </div>
    <div>
      <Tick></Tick>
      <JSONPretty data={obj2} space="4" style={{backgroundColor: '#eee'}} themeClassName="abc"></JSONPretty>
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
      <JSONPretty data={obj3}></JSONPretty>
      <JSONPretty className="test-3" data={obj3}></JSONPretty>
      <JSONPretty className="test-3" themeClassName="custom-json-pretty" data={obj3}></JSONPretty>
    </div>
  </div>,
  document.getElementById('example')
);
