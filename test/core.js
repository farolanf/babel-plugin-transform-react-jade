var assert = require('assert');
var babel = require('babel-core');
var transformPluginReactJade = require('../index');
var jadeToReact = require('../lib/jade-react');
var utils = require('../lib/utils');

function dump(obj) {
    console.log(JSON.stringify(obj, null, 2));
}

describe('Transform Jade to React', function() {

    it('should get excess indent', function() {
        assert.strictEqual(utils.getIndent('  div'), '  ');
        assert.strictEqual(utils.getIndent('  .container'), '  ');
        assert.strictEqual(utils.getIndent('  #container'), '  ');
    });

    it('should normalize indent', function() {
        var code = `
            .container
                h1 Hello World!
        `;
        
        var result = utils.trim(code);
        var lines = result.split("\n");
 
        assert.strictEqual(lines.length, 2);
        assert(/^.container$/.test(lines[0]), lines[0]);
        assert(/^\s+h1 Hello World!$/.test(lines[1]), lines[1]);
    });

    it('should interpolate template string', function() {
        
        var code = " \
            var name = 'Ron'; \
            var time = 'today'; \
            var greet = `how are you ${time}?`; \
            utils.interpolate`hello ${name}, ${greet}` \
        ";

        function transform(code) {
            return babel.transform(code, {
                presets: ['env'],
            });
        }

        var result = transform(code);
        
        assert.strictEqual(eval(result.code), 'hello Ron, how are you today?');
    });

    it('should compile jade', function() {
        var code = "div\n\th1 Hello";
        var result = jadeToReact([code]);
        assert(typeof result, 'function');
    });

    it('should transform tagged template literals', function() {

        function transform(code) {
            return babel.transform(code, {
                presets: ['env'],
                plugins: [transformPluginReactJade],
            });
        }

        var code = "function render() { jade`\ndiv\n\th1 Hello Jade!`; }";
        // var code = "jade`\ndiv\n\th1 Hello Jade!`;";
        var result = transform(code);
        assert(/React\.createElement.*Hello Jade!/.test(result.code));
    });

    it('should supports multiple templates in single source', function() {

        function transform(code) {
            return babel.transform(code, {
                presets: ['env'],
                plugins: [transformPluginReactJade],
            });
        }

        var code = "function render() { jade`\ndiv\n\th1 Hi Jade!`; }";
        code += "function render2() { jade`\ndiv\n\th1 Hello World!`; }";

        var result = transform(code);
        assert(/React\.createElement.*Hi Jade!(.|\n|\r)*React\.createElement.*Hello World!/.test(result.code));
    });
});
