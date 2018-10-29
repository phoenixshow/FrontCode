/*
相当于Vue的构造函数
*/
function MVVM(options) {
    // 将配置对象保存到vm，如果没有配置对象则保存一个空对象
    this.$options = options || {};
    // 将data对象保存到vm和变量data中
    var data = this._data = this.$options.data;
    // 保存vm到变量me
    var me = this;

    // 数据代理
    // 实现 vm.xxx -> vm._data.xxx
    // 遍历data中所有的属性
    Object.keys(data).forEach(function(key) { // key是data的某个属性名，例如name
        // 对指定的属性实现代理
        me._proxyData(key);
    });

    this._initComputed();
    // 对data中所有层次的属性通过数据劫持，最终实现数据绑定
    observe(data, this);
    // 创建一个编译对象（解析模板）
    this.$compile = new Compile(options.el || document.body, this)
}

MVVM.prototype = {
    $watch: function(key, cb, options) {
        new Watcher(this, key, cb);
    },
    // 实现指定属性代理的方法
    _proxyData: function(key, setter, getter) {
        // 保存vm
        var me = this;
        setter = setter || 
        // 给vm添加指定属性名的属性（添加方式使用的是属性描述符）
        Object.defineProperty(me, key, {
            configurable: false, // 不能重新定义
            enumerable: true, // 可以枚举遍历
            // 代理读操作：当通过vm.xxx读取属性值时调用
            get: function proxyGetter() {
                // 从data中获取对应的属性值返回
                return me._data[key];
            },
            // 代理写操作：当通过vm.xxx = value时调用
            set: function proxySetter(newVal) {
                // value被保存到data中对应的属性上
                me._data[key] = newVal;
            }
        });
    },

    _initComputed: function() {
        var me = this;
        var computed = this.$options.computed;
        if (typeof computed === 'object') {
            Object.keys(computed).forEach(function(key) {
                Object.defineProperty(me, key, {
                    get: typeof computed[key] === 'function' 
                            ? computed[key] 
                            : computed[key].get,
                    set: function() {}
                });
            });
        }
    }
};