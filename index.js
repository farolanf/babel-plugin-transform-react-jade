var jadeToReact = require('./lib/jade-react');

function plugin() {

    function findBinding(path, name) {
        var path = path.find(function(path) {
            return path.scope.bindings[name];
        });
        if (path) {
            return path.scope.bindings[name];
        }
    }

    function getDeclaration(ar, name) {
        for (var i in ar) {
            if (ar[i].id.name === name) {
                return ar[i];
            }
        }
    }

    var visitor = {
        
        CallExpression(path) {
            if (path.node.callee.name === 'jade' && path.node.arguments.length === 1) {
                var arg = path.node.arguments[0];
                var binding = findBinding(path, arg.name);
                var vars = binding.path.parent;
                var decl = getDeclaration(vars.declarations, arg.name);
                var code = decl.init.arguments[0].elements[0].value;
                var result = jadeToReact([code]).toString();
                result = '(' + result + ').call(this)';
                path.replaceWithSourceString(result);
            }
        }
    };

    return {
        visitor: visitor,
    };
}

exports.default = plugin;
module.exports = exports.default;