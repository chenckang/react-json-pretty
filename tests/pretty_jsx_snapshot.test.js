import React from 'react';
import JSONPretty from '../JSONPretty';
import renderer from 'react-test-renderer';

var obj2 = {
  aaaa: 1,
  bbbb: true,
	efef: "true",
	efed: "false",
	efee: false,
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

test('JSONPretty.jsx', () => {
	const json = renderer.create(
		<JSONPretty json={obj2}></JSONPretty>
  );

	let tree = json.toJSON();
	expect(tree).toMatchSnapshot();
});

test('JSONPretty.jsx -- String', () => {
	const json = renderer.create(
		<JSONPretty json={JSON.stringify(obj2)}></JSONPretty>
  );

	let tree = json.toJSON();
	expect(tree).toMatchSnapshot();
});

test('JSONPretty.jsx -- StringInvalid', () => {
	const json = renderer.create(
		<JSONPretty json={"{1211221}"}></JSONPretty>
	);

	let tree = json.toJSON();
	expect(tree).toMatchSnapshot();
});