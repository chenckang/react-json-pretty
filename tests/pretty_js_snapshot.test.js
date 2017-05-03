import React from 'react';
import JSONPretty from '../src/JSONPretty';
import renderer from 'react-test-renderer';

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

test('src/JSONPretty.js', () => {
	const json = renderer.create(
		<JSONPretty json={obj2}></JSONPretty>
  );

	let tree = json.toJSON();
	expect(tree).toMatchSnapshot();
});