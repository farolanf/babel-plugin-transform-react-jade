var reactJade = require('react-jade');
var utils = require('./utils');

function compile(strings) {
    var code = utils.interpolate.apply(null, arguments);
    code = utils.trim(code);
    return reactJade.compile(code);
}

module.exports = compile;