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

test('src/JSONPretty.js -- string', () => {
	const json = renderer.create(
		<JSONPretty json={JSON.stringify(obj2)}></JSONPretty>
  );

	let tree = json.toJSON();
	expect(tree).toMatchSnapshot();
});

test('JSONPretty.js -- StringInvalid', () => {
	const json = renderer.create(
		<JSONPretty json={"{1211221}"}></JSONPretty>
	);

	let tree = json.toJSON();
	expect(tree).toMatchSnapshot();
});