function Observer(data) {
    // 保存data
    this.data = data;
    // 开始对data的监视
    this.walk(data);
}

Observer.prototype = {
    walk: function(data) {
        // 保存observer对象
        var me = this;
        // 遍历data中所有属性
        Object.keys(data).forEach(function(key) {
            // 对指定的属性实现响应式的数据绑定
            me.defineReactive(me.data, key, data[key]);
        });
    },

    defineReactive: function(data, key, val) {
        // 创建属性对应的dep对象（Dependency依赖）
        var dep = new Dep();
        // 通过间接的递归调用，实现对data中所有层次属性的数据劫持
        var childObj = observe(val);

        // 给data重新定义属性，添加set/get方法
        Object.defineProperty(data, key, {
            enumerable: true, // 可枚举
            configurable: false, // 不能再define
            get: function() { // 返回值，建立dep与watcher之间的关系
                if (Dep.target) {
                    dep.depend(); // 建立关系
                }
                return val;
            },
            set: function(newVal) { // 监视key属性的变化，更新界面
                if (newVal === val) {
                    return;
                }
                val = newVal;
                // 新的值是object的话，进行监听
                childObj = observe(newVal);
                // 通知所有相关的订阅者
                dep.notify();
            }
        });
    }
};

function observe(value, vm) {
    // 被观察的必须是一个对象
    if (!value || typeof value !== 'object') {
        return;
    }
    // 创建对应的Observer对象
    return new Observer(value);
};


var uid = 0;

function Dep() {
    this.id = uid++;
    this.subs = [];
}

Dep.prototype = {
    // 添加watcher到dep中
    addSub: function(sub) {
        this.subs.push(sub);
    },
    // 去建立dep与watcher之间的关系
    depend: function() {
        Dep.target.addDep(this);
    },

    removeSub: function(sub) {
        var index = this.subs.indexOf(sub);
        if (index != -1) {
            this.subs.splice(index, 1);
        }
    },

    notify: function() {
        // 遍历所有watcher，通知watcher更新
        this.subs.forEach(function(sub) {
            sub.update();
        });
    }
};

Dep.target = null;