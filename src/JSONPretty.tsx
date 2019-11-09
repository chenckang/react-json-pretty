import * as PropTypes from 'prop-types';
import * as React from 'react';

interface ITheme {[key: string]: string; }
interface IProps extends React.HTMLAttributes<HTMLElement> {
  json?: any;
  data?: any;
  replacer?: (key: string, value: any) => any | null;
  pointerFormatter: any;
  space?: number | string;
  themeClassName?: string;
  theme?: ITheme;
  silent?: boolean;
  onJSONPrettyError?: (e: Error) => void;
  mainStyle?: string;
  keyStyle?: string;
  stringStyle?: string;
  valueStyle?: string;
  booleanStyle?: string;
  errorStyle?: string;
}

function getStyleValue(name: string, theme: ITheme, styles: any): string {
  const extra = styles[name + 'Style'] || '';
  const style = theme ? theme[name] || '' : '';
  return extra ? `${extra};${style}` : style;
}

function getStyle(name: string, theme: ITheme, styles: any): string {
  const value = getStyleValue(name, theme, styles);
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
    pointerFormatter: PropTypes.any,
    silent: PropTypes.bool,
    space: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
    theme: PropTypes.object,
    themeClassName: PropTypes.string,
    onJSONPrettyError: PropTypes.func
  };

  public static defaultProps = {
    data: '',
    json: '',
    silent: true,
    space: 2,
    themeClassName: '__json-pretty__',
  };

  public render() {
    const {
      json, data, replacer, space, themeClassName, theme, onJSONPrettyError, onError, silent,
      mainStyle,
      keyStyle,
      valueStyle,
      stringStyle,
      booleanStyle,
      errorStyle,
      pointerFormatter,
      ...rest
    } = this.props;

    const styles = {
      mainStyle,
      keyStyle,
      valueStyle,
      stringStyle,
      booleanStyle,
      errorStyle
    };

    let obj = data || json;

    // See https://facebook.github.io/react/warnings/unknown-prop.html
    if (typeof obj === 'string') {
      try {
        obj = JSON.parse(obj);
      } catch (e) {
        if (!silent) {
          console.warn(`[react-json-pretty]: ${e.message}`);
        }

        if (onJSONPrettyError) {
          onJSONPrettyError(e);
        }

        if (!onJSONPrettyError && onError) {
          onError(e);
          console.warn('JSONPretty#onError is deprecated, please use JSONPretty#onJSONPrettyError instead');
        }

        return(
          <div {...rest} dangerouslySetInnerHTML={
            {__html:
              `<pre class="__json-pretty-error__"${getStyle('error', theme, styles)}>${xss(obj)}</pre>`
            }
          }>
          </div>
        );
      }
    }

    return (
      <div {...rest} dangerouslySetInnerHTML={
        {__html:
          `<pre class="${themeClassName}"${getStyle('main', theme, styles)}>${
            this._pretty(theme, obj, replacer, pointerFormatter, +space, styles)
          }</pre>`
        }
      }>
      </div>
    );
  }

  // JSON =》 HTML转换器
  private _pretty(theme: ITheme,
                  obj: any,
                  replacer: (k: string, v: any) => any,
                  pointerFormatter: any,
                  space: number,
                  styles: any) {
    // 逐行匹配，列举：“key”: "value" | "key": value | "key": [ | "key": { | "key": [],| "Key": {},
    const regLine = /^( *)("[^"]+": )?("[^"]*"|[\w.+-]*)?([,[{]|\[\s*\],?|\{\s*\},?)?$/mg;
    const text = JSON.stringify(obj, typeof replacer === 'function' ? replacer : null, isNaN(space) ? 2 : space);

    /* istanbul ignore next */
    if (!text) {
      return text;
    }

    return text.replace(/&/g, '&amp;').replace(/\\"([^,])/g, '\\&quot;$1')
      .replace(/</g, '&lt;').replace(/>/g, '&gt;')
      .replace(regLine, this._replace.bind(null, theme, styles, pointerFormatter));
  }

  // 格式化函数
  private _replace(theme: ITheme,
                   styles: any,
                   pointerFormatter: any,
                   match: any,
                   ind: string,
                   key: string,
                   val: string,
                   tra: string) {
    const spanEnd = '</span>';
    const keySpan = `<span class="__json-key__"${getStyle('key', theme, styles)}>`;
    const valSpan = `<span class="__json-value__"${getStyle('value', theme, styles)}>`;
    const strSpan = `<span class="__json-string__"${getStyle('string', theme, styles)}>`;
    const booSpan = `<span class="__json-boolean__"${getStyle('boolean', theme, styles)}>`;

    let sps = ind || '';
    if (key) {
      sps = sps + '"' + keySpan + key.replace(/^"|":\s$/g, '') + spanEnd + '": ';
    }

    if (val) {
      if (val === 'true' || val === 'false') {
        sps = sps +  booSpan + val + spanEnd;
      } else {
        const valDisplay = pointerFormatter ? pointerFormatter(key, val) : val;
        sps = sps + (val[0] === '"' ? strSpan : valSpan) + valDisplay + spanEnd;
      }
    }

    return sps + (tra || '');
  }
}

export = JSONPretty;
