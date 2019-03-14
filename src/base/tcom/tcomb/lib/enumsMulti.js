var assert = require('./assert');
var isTypeName = require('./isTypeName');
var forbidNewOperator = require('./forbidNewOperator');
var isString = require('./isString');
var isObject = require('./isObject');

function getDefaultName(map) {
    return Object.keys(map).map(function (k) {
        return assert.stringify(k);
    }).join(' | ');
}

function enumsMulti(map, name) {

    if (process.env.NODE_ENV !== 'production') {
        assert(isObject(map), function () {
            return 'Invalid argument map ' + assert.stringify(map) + ' supplied to enums(map, [name]) combinator (expected a dictionary of String -> String | Number)';
        });
        assert(isTypeName(name), function () {
            return 'Invalid argument name ' + assert.stringify(name) + ' supplied to enums(map, [name]) combinator (expected a string)';
        });
    }

    var displayName = name || getDefaultName(map);

    function EnumsMulti(value, path) {

        if (process.env.NODE_ENV !== 'production') {
            forbidNewOperator(this, EnumsMulti);
            path = path || [displayName];
            // assert(EnumsMulti.is(value), function () {
            //     return 'Invalid value ' + assert.stringify(value) + ' supplied to ' + path.join('/') + ' (expected one of ' + assert.stringify(Object.keys(map)) + ')';
            // });
        }

        return value;
    }

    EnumsMulti.meta = {
        kind: 'enums',
        map: map,
        name: name,
        identity: true
    };

    EnumsMulti.displayName = displayName;

    EnumsMulti.is = function (x) {
        let xs = x.split(",");
        for(let k in xs){
            if(!map.hasOwnProperty(k)){
                return false;
            }
        }
        return true;
    };

    return EnumsMulti;
}

enumsMulti.of = function (keys, name) {
    keys = isString(keys) ? keys.split(' ') : keys;
    var value = {};
    keys.forEach(function (k) {
        value[k] = k;
    });
    return enums(value, name);
};

enumsMulti.getDefaultName = getDefaultName;
module.exports = enumsMulti;

