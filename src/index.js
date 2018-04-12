/**
 * Created by youngwind on 16/8/18.
 */

function Bue(options) {
    this._init(options);
}

Bue.prototype = {
    constructor: Bue,
    ...require('./instance/init'),
    ...require('./instance/compile'),
    ...require('./instance/element'),
    ...require('./instance/bindings'),
    ...require('./instance/scope'),
    ...require('./api/lifecycle'), // 含有mount
    ...require('./api/data') // 绑定this.$watch = new Watcher()
};

Bue.options = {
    directives: {...require('./directives')}
};


module.exports = Bue;
