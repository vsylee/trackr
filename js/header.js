var navigation_elements = {
	"header_events": ["Event A", "Event B", "Event C", "Event D"],
	"header_feedback": ["Feedback A", "Feedback B", "Feedback C", "Feedback D"],
	"header_account": ["Account", "Settings", "Log Out"]
};
var previous_option;
var header_buttons = ['header_events', 'header_feedback', 'header_triangle'];

// Code taken from Stackoverflow http://stackoverflow.com/questions/5999209/how-to-get-the-background-color-code-of-an-element
function hexc(colorval) {
    var parts = colorval.match(/^rgb\((\d+),\s*(\d+),\s*(\d+)\)$/);
    delete(parts[0]);
    for (var i = 1; i <= 3; ++i) {
        parts[i] = parseInt(parts[i]).toString(16);
        if (parts[i].length == 1) parts[i] = '0' + parts[i];
    }
    color = '#' + parts.join('');

    return color;
}

function setup_header_options(id) {
	var classes = "header_expansion_child disable_select";
	$('.header_expansion').empty();
	switch (id) {
		case "header_events":
			classes += " header_expansion_child_events";
		case "header_feedback":
			classes += " header_expansion_child_feedback";
		case "header_account":
			classes += " header_expansion_child_account";
	}

	for (var i = 0; i < navigation_elements[id].length; i++) {
		$('<div>')
			.addClass(classes)
			.appendTo($('.header_expansion'))
			.attr('id', navigation_elements[id][i])
			.on('click', function(e) {
				console.log($(this).attr('id'));
				if ($(this).attr('id') == 'Account') {
					window.location.href = './profile.html';					
				} else if ($(this).attr('id') == 'Settings') {
					window.location.href = './settings.html';
				}
			})
			.text(navigation_elements[id][i]);
	}
}

$(document).ready(function() {
	// menu_options = $('.header_button');
	// $('.header_button')
	// 	.on('click', function(e) {

	// 		var self = $(this);
	// 		var hex_color = hexc(self.css("background-color"));
	// 		// var display = $('.header_expansion').css('display');
	// 		// var current_color = self.css('background-color');
	// 		var update_color = hex_color == '#3a87ad' ? '#8cc3dd' : '#3a87ad';
	// 		var toggle_display = $('.header_expansion').css('display')  == "none" ? "flex" : "none";

	// 		// if (display == "none") {
	// 		// 	display = "flex";
	// 		// 	current_color = "#8cc3dd";
	// 		// } else {
	// 		// 	display = "none";
	// 		// 	current_color = "#3a87ad";
	// 		// }

	// 		self.css({
	// 			'background-color': update_color
	// 		});

	// 		if (previous_option && previous_option[0] !== self[0]) {
	// 			previous_option.css({
	// 				'background-color': '#3a87ad'
	// 			});
	// 			toggle_display = "flex";
	// 		}

	// 		// var pos_offset = self.offset();
	// 		// var right_position = $(window).width() - pos_offset.left - self.width();
	// 		var right_position = 10;
	// 		var width;

	// 		// if ($(this).attr('id').indexOf('header_events') != -1 ||
	// 		// 	$(this).attr('id').indexOf('header_feedback') != -1) {
	// 		// 	width = 250;
	// 		// } else {
	// 		// 	width = 125;
	// 		// }
	// 		if ($(this).attr('id') == 'header_events') {
	// 			width = 250;
	// 			right_position += 40.22 + 92.53;
	// 		} else if ($(this).attr('id') == 'header_feedback') {
	// 			width = 250;
	// 			right_position += 40.22;
	// 		} else {
	// 			width = 125;
	// 			right_position += 0;
	// 		}

	// 		$('.header_expansion').css({
	// 			'display': toggle_display,
	// 			'right': right_position,
	// 			// 'position': right,
	// 			'width': width + 'px'
	// 		});
	// 		previous_option = self;
	// 		setup_header_options(self.attr('id'));
	// 	});

	// $(document).click(function (e) {
	// 	if (!$(e.target).closest(".header_button").length &&
	// 		!$(e.target).is(".header_button")) {
	// 		$('.header_button').css( {
	// 			'background-color': '#3a87ad'
	// 		});
	// 		$('.header_expansion').css( {
	// 			'display': 'none'
	// 		});
	// 	}
	// });

});