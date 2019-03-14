var assert = require('./assert');
var isTypeName = require('./isTypeName');
var forbidNewOperator = require('./forbidNewOperator');
var isString = require('./isString');
var isObject = require('./isObject');

function getDefaultName(map) {
  return Object.keys(map).map(function (k) { return assert.stringify(k); }).join(' | ');
}

function tree(map, name) {

  if (process.env.NODE_ENV !== 'production') {
    assert(isObject(map), function () { return 'Invalid argument map ' + assert.stringify(map) + ' supplied to tree(map, [name]) combinator (expected a dictionary of String -> String | Number)'; });
    assert(isTypeName(name), function () { return 'Invalid argument name ' + assert.stringify(name) + ' supplied to tree(map, [name]) combinator (expected a string)'; });
  }

  var displayName = name || getDefaultName(map);

  function Tree(value, path) {

    if (process.env.NODE_ENV !== 'production') {
      forbidNewOperator(this, Tree);
      path = path || [displayName];
      assert(Tree.is(value), function () { return 'Invalid value ' + assert.stringify(value) + ' supplied to ' + path.join('/') + ' (expected one of ' + assert.stringify(Object.keys(map)) + ')'; });
    }

    return value;
  }

  Tree.meta = {
    kind: 'tree',
    map: map,
    name: name,
    identity: true
  };

  Tree.displayName = displayName;

  Tree.is = function (x) {
    return map.hasOwnProperty(x);
  };

  return Tree;
}

tree.of = function (keys, name) {
  keys = isString(keys) ? keys.split(' ') : keys;
  var value = {};
  keys.forEach(function (k) {
    value[k] = k;
  });
  return tree(value, name);
};

tree.getDefaultName = getDefaultName;
module.exports = tree;

