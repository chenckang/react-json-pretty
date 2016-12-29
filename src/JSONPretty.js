'use strict';

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

var React = require('react');

module.exports = React.createClass({
  displayName: 'exports',

  // 格式化函数
  _replace: function _replace(match, ind, key, val, tra) {
    var spanEnd = '</span>';
    var keySpan = '<span class=json-key>';
    var valSpan = '<span class=json-value>';
    var strSpan = '<span class=json-string>';
    var booSpan = '<span class=json-boolean>';
    var sps = ind || '';
    if (key) {
      sps = sps + '"' + keySpan + key.replace(/[": ]/g, '') + spanEnd + '": ';
    }

    if (val) {
      if (val === "true" || val === "false") {
        sps = sps + (val[0] == '"' ? strSpan : booSpan) + val + spanEnd;
      } else {
        sps = sps + (val[0] == '"' ? strSpan : valSpan) + val + spanEnd;
      }
    }

    return sps + (tra || '');
  },
  // JSON =》 HTML转换器
  _pretty: function _pretty(obj) {
    // 逐行匹配，列举：“key”: "value" | "key": value | "key": [ | "key": { | "key": [],| "Key": {},
    var regLine = /^( *)("[^"]+": )?("[^"]*"|[\w.+-]*)?([,[{]|\[\s*\],?|\{\s*\},?)?$/mg;
    return JSON.stringify(obj, null, 2).replace(/&/g, '&amp;').replace(/\\"([^,])/g, '&quot;$1').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(regLine, this._replace);
  },
  render: function render() {

    // See https://facebook.github.io/react/warnings/unknown-prop.html
    var _props = this.props,
        json = _props.json,
        rest = _objectWithoutProperties(_props, ['json']);

    if (typeof json === 'string') {
      try {
        json = JSON.parse(json);
      } catch (e) {
        console.error("The string is not a valid json data!", e);
      }
    }

    return React.createElement('pre', _extends({}, rest, { className: 'json-pretty', dangerouslySetInnerHTML: { __html: this._pretty(json) } }));
  }
});