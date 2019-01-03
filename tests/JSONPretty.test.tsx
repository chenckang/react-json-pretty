import { shallow } from 'enzyme';
import * as React from 'react';

import { expect } from 'chai';

import JSONPretty from '../src/JSONPretty';

test('simple', () => {
  const box = shallow(<JSONPretty json={'123'}></JSONPretty>);
  expect(box.html()).to.equal('<div><pre class=__json-pretty__><span class=__json-value__>123</span></pre></div>');
});

test('complex object', () => {
  const box = shallow(<JSONPretty json={{
    'aaaa': 1,
    'bb:bb': true,
    'cccc': 'ab"cd\\',
    ':i\"iii:': ':ii:ii',
    'dddd': {
      eeee: 1,
      ffff: [
        {
          gggg: 3
        },
        2,
        'str:ing'
      ]
    }
  }}></JSONPretty>);

  `<div><pre class=__json-pretty__>{
    "<span class=__json-key__>aaaa</span>": <span class=__json-value__>1</span>,
    "<span class=__json-key__>bb:bb</span>": <span class=__json-boolean__>true</span>,
    "<span class=__json-key__>cccc</span>": <span class=__json-string__>"ab\\&quot;cd\\\\"</span>,
    "<span class=__json-key__>:i\\&quot;iii:</span>": <span class=__json-string__>":ii:ii"</span>,
    "<span class=__json-key__>dddd</span>": {
      "<span class=__json-key__>eeee</span>": <span class=__json-value__>1</span>,
      "<span class=__json-key__>ffff</span>": [
        {
          "<span class=__json-key__>gggg</span>": <span class=__json-value__>3</span>
        },
        <span class=__json-value__>2</span>,
        <span class=__json-string__>"str:ing"</span>
      ]
    }
  }</pre></div>`
    .split('\n')
    .map((line) => line.trim())
    .forEach((line) => {
      expect(box.html()).to.include(line);
    });
});

test('complex string', () => {
  const box = shallow(<JSONPretty json={JSON.stringify({
    'aaaa': 1,
    'bb:bb': true,
    'cccc': 'ab"cd\\',
    ':i\"iii:': ':ii:ii',
    'dddd': {
      eeee: 1,
      ffff: [
        {
          gggg: 3
        },
        2,
        'str:ing'
      ]
    }
  })}></JSONPretty>);

  `<div><pre class=__json-pretty__>{
    "<span class=__json-key__>aaaa</span>": <span class=__json-value__>1</span>,
    "<span class=__json-key__>bb:bb</span>": <span class=__json-boolean__>true</span>,
    "<span class=__json-key__>cccc</span>": <span class=__json-string__>"ab\\&quot;cd\\\\"</span>,
    "<span class=__json-key__>:i\\&quot;iii:</span>": <span class=__json-string__>":ii:ii"</span>,
    "<span class=__json-key__>dddd</span>": {
      "<span class=__json-key__>eeee</span>": <span class=__json-value__>1</span>,
      "<span class=__json-key__>ffff</span>": [
        {
          "<span class=__json-key__>gggg</span>": <span class=__json-value__>3</span>
        },
        <span class=__json-value__>2</span>,
        <span class=__json-string__>"str:ing"</span>
      ]
    }
  }</pre></div>`
    .split('\n')
    .map((line) => line.trim())
    .forEach((line) => {
      expect(box.html()).to.include(line);
    });
});

test('complex string with theme', () => {
  const box = shallow(<JSONPretty
    theme={
      {
        main: 'background-color#1e1e1e;color:rgba(245,187,18,1)',
        key: 'color:rgba(211,66,46,1);',
        value: 'color:rgba(191,215,219,1);',
        string: 'color:rgba(127,214,250,1);',
        boolean: 'color:rgba(75,174,22,1);',
      }
    }
    json={
      JSON.stringify(
        {
          'aaaa': 1,
          'bb:bb': true,
          'cccc': 'ab"cd\\',
          ':i\"iii:': ':ii:ii',
          'dddd': {
            eeee: 1,
            ffff: [
              {
                gggg: 3
              },
              2,
              'str:ing'
            ]
          }
        }
      )
    }
  ></JSONPretty>);

  `<div><pre class=__json-pretty__ style="background-color#1e1e1e;color:rgba(245,187,18,1)">{
    "<span class=__json-key__ style="color:rgba(211,66,46,1);">aaaa</span>": <span class=__json-value__ style="color:rgba(191,215,219,1);">1</span>,
    "<span class=__json-key__ style="color:rgba(211,66,46,1);">bb:bb</span>": <span class=__json-boolean__ style="color:rgba(75,174,22,1);">true</span>,
    "<span class=__json-key__ style="color:rgba(211,66,46,1);">cccc</span>": <span class=__json-string__ style="color:rgba(127,214,250,1);">"ab\\&quot;cd\\\\"</span>,
    "<span class=__json-key__ style="color:rgba(211,66,46,1);">:i\\&quot;iii:</span>": <span class=__json-string__ style="color:rgba(127,214,250,1);">":ii:ii"</span>,
    "<span class=__json-key__ style="color:rgba(211,66,46,1);">dddd</span>": {
      "<span class=__json-key__ style="color:rgba(211,66,46,1);">eeee</span>": <span class=__json-value__ style="color:rgba(191,215,219,1);">1</span>,
      "<span class=__json-key__ style="color:rgba(211,66,46,1);">ffff</span>": [
        {
          "<span class=__json-key__ style="color:rgba(211,66,46,1);">gggg</span>": <span class=__json-value__ style="color:rgba(191,215,219,1);">3</span>
        },
        <span class=__json-value__ style="color:rgba(191,215,219,1);">2</span>,
        <span class=__json-string__ style="color:rgba(127,214,250,1);">"str:ing"</span>
      ]
    }
  }</pre></div>`
    .split('\n')
    .map((line) => line.trim())
    .forEach((line) => {
      expect(box.html()).to.include(line);
    });
});

test('complex string with theme missing boolean theme', () => {
  const box = shallow(<JSONPretty
    theme={
      {
        main: 'background-color#1e1e1e;color:rgba(245,187,18,1)',
        key: 'color:rgba(211,66,46,1);',
        value: 'color:rgba(191,215,219,1);',
        string: 'color:rgba(127,214,250,1);',
      }
    }
    json={
      JSON.stringify(
        {
          'aaaa': 1,
          'bb:bb': true,
          'cccc': 'ab"cd\\',
          ':i\"iii:': ':ii:ii',
          'dddd': {
            eeee: 1,
            ffff: [
              {
                gggg: 3
              },
              2,
              'str:ing'
            ]
          }
        }
      )
    }
  ></JSONPretty>);

  `<div><pre class=__json-pretty__ style="background-color#1e1e1e;color:rgba(245,187,18,1)">{
    "<span class=__json-key__ style="color:rgba(211,66,46,1);">aaaa</span>": <span class=__json-value__ style="color:rgba(191,215,219,1);">1</span>,
    "<span class=__json-key__ style="color:rgba(211,66,46,1);">bb:bb</span>": <span class=__json-boolean__>true</span>,
    "<span class=__json-key__ style="color:rgba(211,66,46,1);">cccc</span>": <span class=__json-string__ style="color:rgba(127,214,250,1);">"ab\\&quot;cd\\\\"</span>,
    "<span class=__json-key__ style="color:rgba(211,66,46,1);">:i\\&quot;iii:</span>": <span class=__json-string__ style="color:rgba(127,214,250,1);">":ii:ii"</span>,
    "<span class=__json-key__ style="color:rgba(211,66,46,1);">dddd</span>": {
      "<span class=__json-key__ style="color:rgba(211,66,46,1);">eeee</span>": <span class=__json-value__ style="color:rgba(191,215,219,1);">1</span>,
      "<span class=__json-key__ style="color:rgba(211,66,46,1);">ffff</span>": [
        {
          "<span class=__json-key__ style="color:rgba(211,66,46,1);">gggg</span>": <span class=__json-value__ style="color:rgba(191,215,219,1);">3</span>
        },
        <span class=__json-value__ style="color:rgba(191,215,219,1);">2</span>,
        <span class=__json-string__ style="color:rgba(127,214,250,1);">"str:ing"</span>
      ]
    }
  }</pre></div>`
    .split('\n')
    .map((line) => line.trim())
    .forEach((line) => {
      expect(box.html()).to.include(line);
    });
});

test('invalid', () => {
  const box = shallow(<JSONPretty json={undefined} silent={false}></JSONPretty>);
  expect(box.html()).to.equal('<div><pre class=__json-pretty__></pre></div>');
});

test('invalid json', () => {
  const box = shallow(<JSONPretty json={'12345,78907'}></JSONPretty>);

  `<div><pre class=__json-pretty__>12345,78907</pre></div>`
    .split('\n')
    .map((line) => line.trim())
    .forEach((line) => {
      expect(box.html()).to.include(line);
    });
});

test('invalid space', () => {
  const box = shallow(<JSONPretty json={'12345'} space={NaN}></JSONPretty>);

  console.log(box.html());
  
  `<div><pre class=__json-pretty__><span class=__json-value__>12345</span></pre></div>`
    .split('\n')
    .map((line) => line.trim())
    .forEach((line) => {
      expect(box.html()).to.include(line);
    });
});

test('complex object with format', () => {
  const box = shallow(<JSONPretty
    data={
      {
        'aaaa': 1,
        'bb:bb': true,
        'cccc': 'ab"cd\\',
        ':i\"iii:': ':ii:ii',
        'dddd': {
          eeee: 1,
          ffff: [
            {
              gggg: 3
            },
            2,
            'str:ing'
          ]
        }
      }
    }
    replacer={
      function(key: string, value: any) {
        if (key === 'cccc') {
          value += '~~~abc';
        }
        if (key === 'gggg') {
          value *= 10;
        }
        return value;
      }
    }
    space='2'
  ></JSONPretty>);

  `<div><pre class=__json-pretty__>{
    "<span class=__json-key__>aaaa</span>": <span class=__json-value__>1</span>,
    "<span class=__json-key__>bb:bb</span>": <span class=__json-boolean__>true</span>,
    "<span class=__json-key__>cccc</span>": <span class=__json-string__>"ab\\&quot;cd\\\\~~~abc"</span>,
    "<span class=__json-key__>:i\\&quot;iii:</span>": <span class=__json-string__>":ii:ii"</span>,
    "<span class=__json-key__>dddd</span>": {
      "<span class=__json-key__>eeee</span>": <span class=__json-value__>1</span>,
      "<span class=__json-key__>ffff</span>": [
        {
          "<span class=__json-key__>gggg</span>": <span class=__json-value__>30</span>
        },
        <span class=__json-value__>2</span>,
        <span class=__json-string__>"str:ing"</span>
      ]
    }
  }</pre></div>`
    .split('\n')
    .map((line) => line.trim())
    .forEach((line) => {
      expect(box.html()).to.include(line);
    });
});
