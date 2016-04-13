$(document).ready(function() {
	var content_object = $('.content');
	var button_icons = $('.icon_href');
	var square_length = content_object.height() * 0.46;
	for (var i = 0; i < button_icons.length; i++) {
		$(button_icons[i]).css({
			'width': square_length + 'px',
			'height': square_length + 'px'
		});
	}

});








