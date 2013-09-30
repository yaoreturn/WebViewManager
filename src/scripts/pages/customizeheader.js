define(function (require, exports) {


var appConfig = require('../config')
    , viewManager = require('../viewManager')


$(function() {

    viewManager.addView({

        name: 'searchView',
        isRoot: true,
        head: {
            content:'<div class="search"><input type="search" placeholder="search" /></div>'
        },
        content: '<div class="viewMsg">you can place any thing here</div>'
    });


});


});