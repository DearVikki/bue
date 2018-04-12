/**
 * Created by youngwind on 16/9/1.
 */
// 有_subs属性，有_addSub和_addChild方法
import Binding from '../binding';

/**
 * 这个函数很重要。当数据方法改变时, 执行的就是它了。
 * 它会去把对应改变了的数据那里找出所有的watcher, 然后一一执行他们的cb
 * 一个都不放过
 * @private
 */
// 这里又有一个往下递归寻找的过程
// 因为_updateBingingAt的调用者永远是最顶级的this（被绑定啦！）
exports._updateBindingAt = function () {
    let path = arguments[1];
    let pathAry = path.split('.');
    let r = this._rootBinding;

    pathAry.forEach((key) => {
        r = r[key];
    });
    let subs = r._subs;
    subs.forEach((watcher) => {
        watcher.cb.call(watcher);
    });
};

/**
 * 就是在这里定于数据对象的变化的
 * @private
 */
// 调用文档：init.js
exports._initBindings = function () {
    this._rootBinding = new Binding();
    // 注意！这里只有顶级observer（属于顶级对象）才绑了set事件的！！
    // 注意这里还绑定了this！所以哪怕其实是最顶级的observer调用的
    // 上面的_updateBindingAt的this都是app，所以可以直接获取到_rootBingding
    this.observer.on('set', this._updateBindingAt.bind(this));
};

/**
 * 根据给出的路径创建binding
 * @param path {String} 例如: "user.name"
 * @returns {Binding}
 * @private
 */
// 调用文档：watcher.js
exports._createBindingAt = function (path) {
    let b = this._rootBinding;
    let pathAry = path.split('.');

    for (let i = 0; i < pathAry.length; i++) {
        let key = pathAry[i];
        // this._rootBinding = this._rootBinding[key] = 这个key对应的binding实例
        b = b[key] = b._addChild(key);
    }
    return b;
};
