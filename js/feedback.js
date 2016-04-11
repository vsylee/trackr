var feedback_animate_duration = 500;
var players = [1, 1, 1, 1, 1, 1, 1, 1, 1, 1];
var table_columns = ["Player name", "Athlete Comment", "Coach feedback"];

$(document).ready(function() {
	

	$('.feedback_header').on('click', function() {
		var feedback_header = $(this);
		var content  = feedback_header.next();

		content.slideToggle(feedback_animate_duration, function() {
			feedback_header.text(function() {
				return content.is(":visible") ? "Hiding the element" : "Showing the element";
			});
		});
	});

	for (var i = 0; i < players.length; i++) {
		for (var j = 0; j < table_columns.length; j++) {
			if (j == 0 || j == 1) {
				$("<div>")
					.addClass("content_col")
					.css({
						"backgroundColor": "cyan"
					})
					.appendTo($('.content'))
					.text(table_columns[j]);	
			} else {
				$("<div>")
					.addClass("content_col")
					.css({
						"backgroundColor": "cyan"
					})
					.appendTo($('.content'))
					.text(table_columns[j]);	
			}
		}
	}
});	