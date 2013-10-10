define(function (require, exports) {

var appConfig = require('../config')
    , viewManager = require('../viewManager')



function addRootView () {

    viewManager.addView({

        name: 'rootView',
        isRoot: true,
        head: {
            title: 'Root View'
        },
        initialize: function (view) {

            var $btn = $('<button>add a view</button>').appendTo(view.$body);

            $btn.on(appConfig.clickEvent, function () {
                addDetailView();
            });
        }
    });  
}


function addDetailView () {

    viewManager.addView({

        name: 'detailView',
        head: {
            title: 'Another View'
        },
        showLoading: true,
        initialize: function (view) {

            view.$loading.hide();

            var $btn1 = $('<button>add a view</button>').appendTo(view.$body);
            var $btn2 = $('<button>pull out view</button>').appendTo(view.$body);
            var $btn3 = $('<button>back to root view</button>').appendTo(view.$body);

            $btn1.on(appConfig.clickEvent, function () {
                addDetailView();
            });

            $btn2.on(appConfig.clickEvent, function () {
                viewManager.goBack();
            });

            $btn3.on(appConfig.clickEvent, function () {
                viewManager.goBack('rootView');
            });
        }
    });  
}



$(function() {

    // 显示根视图
    addRootView();

});


});