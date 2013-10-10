define(function() {

	var $win = $(window);

	var appConfig = {
		screenWidth: $win.width(),
		screenHeight: $win.height(),
		clickEvent: 'ontouchstart' in window ? 'tap' : 'click'
	}

	return appConfig
});