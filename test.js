const handlebars = require('handlebars');
const tap = require('tap');
const icon = require('./');
const ltx = require('ltx');

tap.test('register helper', function (t) {
	handlebars.registerHelper('icon', icon);
	t.ok(handlebars.helpers.icon, "helper registered");
	t.end();
});

tap.test('with attribute', function (t) {
	const template = handlebars.compile(`{{icon "./test.svg" width="55"}}`);
	t.equal(template({}), `<svg style="display: none"><symbol viewBox="0 0 2 2" id="symbol-2912310545"><circle r="1" x="1" y="1"/></symbol></svg>
<svg xmlns:xlink="http://www.w3.org/1999/xlink" width="55">
    <use xlink:href="#symbol-2912310545"/>
  </svg>`);
	t.end();
});

tap.test('without attribute', function (t) {
	const template = handlebars.compile(`{{icon "./test.svg" }}`);
	t.equal(template({}), `<svg style="display: none"><symbol viewBox="0 0 2 2" id="symbol-2912310545"><circle r="1" x="1" y="1"/></symbol></svg>
<svg xmlns:xlink="http://www.w3.org/1999/xlink">
    <use xlink:href="#symbol-2912310545"/>
  </svg>`);
	t.end();
});

tap.test('second render only uses', function (t) {
	const template = handlebars.compile(`{{icon "./test.svg" }}{{icon "./test.svg" }}`);
	t.equal(template({}), `<svg style="display: none"><symbol viewBox="0 0 2 2" id="symbol-2912310545"><circle r="1" x="1" y="1"/></symbol></svg>
<svg xmlns:xlink="http://www.w3.org/1999/xlink">
    <use xlink:href="#symbol-2912310545"/>
  </svg><svg xmlns:xlink="http://www.w3.org/1999/xlink">
    <use xlink:href="#symbol-2912310545"/>
  </svg>`);
	t.end();
});
