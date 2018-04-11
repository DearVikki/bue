/**
 * Created by youngwind on 16/8/18.
 */

function Bue(options) {
    this._init(options);
}

Bue.prototype = {
    constructor: Bue,
    ...require('./instance/init'),
    ...require('./instance/compile'), // compile系列和bindDirective
    ...require('./api/lifecycle'),
    ...require('./api/data'),
    ...require('./instance/bindings'), // ._updateBindingAt
    observer: {...require('./observer/observer')}
};

module.exports = Bue;
