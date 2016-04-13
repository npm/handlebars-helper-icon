const fs = require('fs');
const handlebars = require('handlebars');
const ltx = require('ltx');
const murmurhash = require('murmurhash');
const resolve = require('resolve');

const nameToModule = {};

module.exports = function(name, opts) {

  if (!opts.data.iconsSent) {
    opts.data.iconsSent = {};
  }

  const mod = nameToModule[name] || (nameToModule[name] = resolve.sync(name, {
    extensions: ['.svg']
  }));

  const content = require.cache[mod] || (require.cache[mod] = makeSymbol(fs.readFileSync(mod, 'utf-8'), mod));

  const instantiate = ltx.parse(`<svg><use xlink:href="#symbol-${murmurhash.v3(mod)}"/></svg>`);

  Object.assign(instantiate.attrs, opts.hash);

  if (!opts.data.iconsSent[mod]) {
    opts.data.iconsSent[mod] = true;
    return new handlebars.SafeString(content + "\n" + instantiate.root().toString());
  } else {
    return new handlebars.SafeString(instantiate);
  }
}

function makeSymbol(xml, mod) {
  const symbol = ltx.parse(xml);
  if (symbol.name != 'svg') {
    throw new TypeError("Input must be an SVG");
  }

  symbol.name = 'symbol';
  symbol.attrs.id = `symbol-${murmurhash.v3(mod)}`;
  delete symbol.attrs.xmlns;

  const svg = ltx`<svg style='display: none'/>`;
  svg.children.push(symbol);
  symbol.parent = svg;

  return svg.root().toString();
}
