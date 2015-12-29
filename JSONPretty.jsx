var React = require('react');

module.exports = React.createClass({
  // 格式化函数
  _replace: function (match, ind, key, val, tra) {
    var spanEnd = '</span>';
    var keySpan = '<span class=json-key>';
    var valSpan = '<span class=json-value>';
    var strSpan = '<span class=json-string>';
    var sps = ind || '';
    if (key) {
      sps = sps + '"' + keySpan + key.replace(/[": ]/g, '') + spanEnd + '": ';
    }
    if (val) {
      sps = sps + (val[0] == '"' ? strSpan : valSpan) + val + spanEnd;
    }
    return sps + (tra || '');
  },
  // JSON =》 HTML转换器
  _pretty: function (obj) {
    // 逐行匹配，列举：“key”: "value" | "key": value | "key": [ | "key": { | "key": [],| "Key": {},
    var regLine = /^( *)("[^"]+": )?("[^"]*"|[\w.+-]*)?([,[{]|\[\s*\],?|\{\s*\},?)?$/mg;
      return JSON.stringify(obj, null, 2)
        .replace(/&/g, '&amp;').replace(/\\"/g, '&quot;')
        .replace(/</g, '&lt;').replace(/>/g, '&gt;')
        .replace(regLine, this._replace);
  },
  render: function () {
    var json = this.props.json;

    if (typeof json === 'json') {
      json = JSON.parse(json);
    }

    return (
      <pre className='json-pretty' dangerouslySetInnerHTML={{__html: this._pretty(json)}}>
      </pre>
    );
  }
});
