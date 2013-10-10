define(function (require, exports) {


var appConfig = require('./config');


return function SegmentControl (options) {

	var self = this;

	var itemCount = options.items.length;

	self.init = function () {

		var $container = options.container;

		var $segmentControl = $('<div class="segmentControl"></div>').appendTo($container);

		options.items.forEach(function (item, index) {

			var $segmentItem = $('<a class="segment-item" href="javascript:void(0);">'+item.text+'</a>').appendTo($segmentControl);

			var target = item.target;

			$segmentItem.data('target', target);

			var $targetView = $('#' + target);

			// console.log($targetView)

			if (index == 0) {
				$segmentItem.addClass('active');
			}

			else {
				$targetView.hide();
			}
		});


		$container.on(appConfig.clickEvent, '.segment-item', function () {

			var $segmentItemClicked = $(this);

			if ($segmentItemClicked.hasClass('active')) return;

			var $segmentItemActivated = $segmentItemClicked.siblings('.active');
			$segmentItemActivated.removeClass('active');
			$segmentItemClicked.addClass('active');


			var $targetView = $('#' + $segmentItemClicked.data('target'));
				$currentView = $('#' + $segmentItemActivated.data('target'));

			if (options.slide) {

				var oldIndex = $segmentItemActivated.index(),
					newIndex = $segmentItemClicked.index();

				if (newIndex > oldIndex) {

					$targetView.css('left', '100%').show().animate({
						left: 0
					}, 'fast');

					$currentView.animate({
						left: '-100%'
					}, 'fast');
				}

				else {

					$targetView.css('left', '-100%').show().animate({
						left: 0
					}, 'fast');

					$currentView.animate({
						left: '100%'
					}, 'fast');
				}

			}

			else {
				$currentView.hide()
				$targetView.show();
			}
		});
	}

	self.init();
}


});