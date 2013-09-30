define(function (require, exports) {

var appConfig = require('../config')
    , viewManager = require('../viewManager')


$(function() {

    viewManager.addView({

        name: 'listView',
        isRoot: true,
        head: {
            segmentControl: {
                items: [
                    {
                        text: '地图',
                        target: 'mapWrapper'
                    },
                    {
                        text: '列表',
                        target: 'listWrapper',
                        defaultShow: true
                    }
                ],
                slide: false
            }
        },

        content: [
            '<div id="mapWrapper">',
                '<div id="mapContainer"><div class="viewMsg">this is map container</div></div>',
            '</div>',
            '<div id="listWrapper">',
                '<div id="listContainer"><div class="viewMsg">this is list container</div></div>',
            '</div>'
        ].join('')
    });
});


});