var utils = {

    interpolate: function(strings) {
        var out = strings.slice(0);
        for (var i = 1; i < arguments.length; i++) {
            out.splice(i*2-1, 0, arguments[i]);
        }
        return out.join('');
    },

    getIndent: function(line) {
        const m = line.match(/^\n?(\s+).+/);
        return m ? m[1] : false; 
    },

    trim: function(code) {
        var lines = code.split("\n");

        // remove empty lines
        lines = lines.filter(function(str) {
            return !/^\s*$/.test(str);
        });

        var re = null;

        // get excess indent from first line
        if (lines.length > 0) {
            const indent = this.getIndent(lines[0]);
            if (indent) {
                re = new RegExp('^' + indent, 'g');
            }
        }

        // remove excess indents
        lines = lines.map(function(str, index) {
            if (re) {
                str = str.replace(re, '');
            }
            return str;
        });

        var out = lines.join('\n');
        return out;
    }
};

module.exports = utils;