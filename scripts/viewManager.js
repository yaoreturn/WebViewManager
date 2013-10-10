define(function (require, exports, module) {


var View = require('./view');


/**
 * constructor of view manager
 */
function ViewManager () {

    this.views = [];

    this.currentView = null;
};


/**
 * 添加 view
 * @param   {Object}    配置
 * @return  {Object}    view 
 */
ViewManager.prototype.addView = function (options) {

    var self = this;

    options.manager = self;
    options.index = self.views.length + 1;

    var newView = new View(options);

    self.currentView = newView;

    self.views.push(newView);

    return newView;
}


/**
 * 移除 view
 * 若指定目标 view 的 name, 则移除当前 view 和 目标 view 之间的所有 view
 * @param   {String}    指定目标 view 的 name
 */
ViewManager.prototype.goBack = function (name) {

    var self = this;

    self.currentView.pushout();

    var targetIndex,
        viewCounts = self.views.length;

    if (name) {
        targetIndex = self._getViewIndexByName(name);
    }

    else {
        targetIndex = viewCounts - 2;
    }

    if (targetIndex >= 0) {

        var discards = self.views.slice(targetIndex+1, viewCounts);

        self.views = self.views.slice(0, targetIndex+1);

        discards.forEach(function (view, index) {
            view.pushout();
        });

        self.currentView = self.views[self.views.length-1];
    }

    else {
        throw 'can not find the view';
    }
}


/**
 * 获取指定 view 的索引值
 * @param   {String}    指定目标 view 的 name
 */
ViewManager.prototype._getViewIndexByName = function (name) {

    var self = this,
        targetIndex = -1;

    self.views.forEach(function (view, index) {

        if (view._options.name == name) targetIndex = index;
    });

    return targetIndex;
}


return new ViewManager();


});