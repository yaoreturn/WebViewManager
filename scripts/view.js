define(function (require, exports, module) {


var appConfig = require('./config')
    , screenWidth = appConfig.screenWidth
    , screenHeight = appConfig.screenHeight
    , SegmentControl = require('./segmentControl')
    , loading = require('./loading')


/**
 * constructor of view
 * @param   {Object}    配置
 */
function View (options) {

    var self = this;

    // default options
    var _options = {
        name: 'view',                   // view 的名字，此名字会成为视图的 classname，并且可以通过 name 切换到的 view
        isRoot: false,                  // 是否顶级 view
        index: 1,
        head: {
            title: null,                // navigation bar 的标题文字
            showBackButton: true,       // 默认显示后退按钮
            backButtonText: '返回',     // 默认后退按钮文字
            segmentControl: null,       // 是否显示 segmentControl, 显示则需要引入 segmentControl 模块
            height: 44,                 // navigation bar 的默认高度
            content: null               // 自定义 navigation bar 的内容，会清空并置入 navigation bar
        },
        showLoading: false,             // view 载入后是否显示loading, 如果显示，可以在 initialize 方法中调用 view.$loading.hide() 关闭
        content: null                   // view 的content, 会被置入 view.$body，也可以在 initialize 方法中操作 view.$body 渲染 view
    }

    _options = $.extend(true, _options, options);

    self.$card = null;
    self.$head = null;
    self.$body = null;
    self.$loading = null;

    // 如果是顶级 view, 不显示后退按钮
    if (_options.isRoot) _options.head.showBackButton = false
    self._options = _options;

    self._x = 0;
    self._y = 0;
    self._left = 0;

    
    self.init.apply(self, arguments);
}



/**
 * view 出栈方法
 * @return  view
 */
View.prototype.pushout = function () {

    var self = this;

    self.$card.animate({left: '100%'}, 300, 'ease-in', function () {
        self.$card.remove();
    });

    return self;
}


/**
 * view 构造方法
 * @return  view
 */
View.prototype.init = function () {

    var self = this,
        options = self._options,
        isRoot = options.isRoot;

    var $page = $('.pageView');

    if (! $page.data('inited')) {

        $page.css({
            height: screenHeight,
            width: screenWidth,
            overflow: 'hidden'
        });

        $page.data('inited', true);
    }

    var $card = $('<div class="cardView ' + options.name + '" style="z-index:' + options.index + '"></div>').appendTo($page);

    var $body = $('<div class="contentView"></div>').appendTo($card);

    $body.css('height', (options.head ? screenHeight - options.head.height : '100%'));

    if (options.content) $body.append(options.content);

    if (options.showLoading) {
        self.$loading = $(loading).appendTo($body);
    }


    if (options.head) {

        var $head = $('<div class="navigationBar"></div>').prependTo($card);

        if (options.head.showBackButton) {

            var $backButton = $('<a class="goBack" href="javascript:void(0);">'+options.head.backButtonText+'</a>').prependTo($head);

            $backButton.on(appConfig.clickEvent, function () {
                options.manager.goBack();
            });
        }

        if (options.head.segmentControl) {

            var segmentControlOpts = options.head.segmentControl;

            segmentControlOpts.container = $head;

            $head.$segmentControl = new SegmentControl(segmentControlOpts);
        }

        else if (options.head.title) {
            $head.append('<div class="title">'+options.head.title+'</div>');
        }

        else if (options.head.content) {
            $head.html(options.head.content);
        }

        self.$head = $head;
    }


    // 如果是顶级 view, 直接显示
    if (isRoot) {
        $card.show();
    }

    // 如果不是顶级 view, 从右侧划入，并绑定touch事件以移除
    else {
        $card.css('left', '100%').animate({
            left: 0
        }, 300, 'ease-out');

        $card.on('touchstart', function (e) {
            self._x = e.pageX;
            self._y = e.pageY;
        });

        $card.on('touchmove', function (e) {

            var x = e.pageX,
                y = e.pageY,
                xDelta = x - self._x,
                yDelta = Math.abs(y - self._y);

            // console.log('xDelta is %s, yDelta is %s', xDelta, yDelta);

            if (xDelta > 0 && yDelta < 15) {

                $card.css('left', xDelta);
                self._left = xDelta;
            }
        });

        $card.on('touchend', function (e) {

            if (self._left > 80) {
                self._x = 0;
                self._y = 0;
                self._left = 0;
                options.manager.goBack();
            }

            else {
                $card.animate({left: 0}, 200);
                self._x = 0;
                self._y = 0;
                self._left = 0;
            }   
        });
    }


    self.$card = $card;
    self.$body = $body;


    // 回调指定的 initialize 方法
    var initialize = options.initialize;
    if (initialize && typeof(initialize) == 'function') {
        initialize(self);
    }

    return self;
}



return View;


});