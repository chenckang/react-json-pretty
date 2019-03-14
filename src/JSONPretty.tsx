import * as PropTypes from 'prop-types';
import * as React from 'react';

interface ITheme {[key: string]: string; }
interface IProps {
  json?: any;
  data?: any;
  replacer?: (key: string, value: any) => any | null;
  space?: number | string;
  themeClassName?: string;
  theme?: ITheme;
  silent?: boolean;
  onError?: (e: Error) => void;
}

function getStyleValue(name: string, theme: ITheme): string {
  return theme ? theme[name] || '' : '';
}

function getStyle(name: string, theme: ITheme): string {
  const value = getStyleValue(name, theme);
  return value ? ` style="${value}"` : '';
}

const xssmap: {[key: string]: string} = {
  '"': '&quot;',
  '\'': '&apos;',
  '&': '&amp;',
  '>': '&gt;',
  '<': '&lt',
};

function xss(s: string): string {
  if (!s) {
    return s;
  }

  return s.replace(/<|>|&|"|'/g, (m) => {
    return xssmap[m];
  });
}

class JSONPretty extends React.Component<IProps, {}> {
  public static propTypes = {
    data: PropTypes.any,
    json: PropTypes.any,
    replacer: PropTypes.func,
    silent: PropTypes.bool,
    space: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
    theme: PropTypes.object,
    themeClassName: PropTypes.string,
    onError: PropTypes.func
  };

  public static defaultProps = {
    data: '',
    json: '',
    silent: true,
    space: 2,
    themeClassName: '__json-pretty__',
  };

  public render() {
    const { json, data, replacer, space, themeClassName, theme, onError, silent, ...rest } = this.props;

    let obj = data || json;

    // See https://facebook.github.io/react/warnings/unknown-prop.html
    if (typeof obj === 'string') {
      try {
        obj = JSON.parse(obj);
      } catch (e) {
        if (!silent) {
          console.warn(`[react-json-pretty]: ${e.message}`);
        }

        if (onError) {
          onError(e);
        }

        return(
          <div {...rest} dangerouslySetInnerHTML={
            {__html:
              `<pre class=${themeClassName}${getStyle('main', theme)}>${xss(obj)}</pre>`
            }
          }>
          </div>
        );
      }
    }

    return (
      <div {...rest} dangerouslySetInnerHTML={
        {__html:
          `<pre class=${themeClassName}${getStyle('main', theme)}>${
            this._pretty.call(this, theme, obj, replacer, +space)
          }</pre>`
        }
      }>
      </div>
    );
  }

  // JSON =》 HTML转换器
  private _pretty(theme: ITheme, obj: any, replacer: () => {}, space: number) {
    // 逐行匹配，列举：“key”: "value" | "key": value | "key": [ | "key": { | "key": [],| "Key": {},
    const regLine = /^( *)("[^"]+": )?("[^"]*"|[\w.+-]*)?([,[{]|\[\s*\],?|\{\s*\},?)?$/mg;
    const text = JSON.stringify(obj, typeof replacer === 'function' ? replacer : null, isNaN(space) ? 2 : space);

    /* istanbul ignore next */
    if (!text) {
      return text;
    }

    return text.replace(/&/g, '&amp;').replace(/\\"([^,])/g, '\\&quot;$1')
      .replace(/</g, '&lt;').replace(/>/g, '&gt;')
      .replace(regLine, this._replace.bind(null, theme));
  }

  // 格式化函数
  private _replace(theme: ITheme, match: any, ind: string, key: string, val: string, tra: string) {
    const spanEnd = '</span>';
    const keySpan = `<span class=__json-key__${getStyle('key', theme)}>`;
    const valSpan = `<span class=__json-value__${getStyle('value', theme)}>`;
    const strSpan = `<span class=__json-string__${getStyle('string', theme)}>`;
    const booSpan = `<span class=__json-boolean__${getStyle('boolean', theme)}>`;

    let sps = ind || '';
    if (key) {
      sps = sps + '"' + keySpan + key.replace(/^"|":\s$/g, '') + spanEnd + '": ';
    }

    if (val) {
      if (val === 'true' || val === 'false') {
        sps = sps +  booSpan + val + spanEnd;
      } else {
        sps = sps + (val[0] === '"' ? strSpan : valSpan) + val + spanEnd;
      }
    }

    return sps + (tra || '');
  }
}

export = JSONPretty;
