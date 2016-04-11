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
	console.log('The input id is ' + id);

}

$(document).ready(function() {

	menu_options = $('.header_button');
	$('.header_button')
		.on('click', function(e) {

			var self = $(this);
			var hex_color = hexc(self.css("background-color"));
			var update_color = hex_color == '#4892d3' ? '#1cdbf7' : '#4892d3';
			var toggle_display = $('.header_expansion').css('display')  == "none" ? "block" : "none";

			self.css({
				'background-color': update_color
			});

			if (previous_option && previous_option[0] !== self[0]) {
				previous_option.css({
					'background-color': '#4892d3'
				});
				toggle_display = "block";
			}

			var pos_offset = self.offset();
			var right_position = $(window).width() - pos_offset.left - self.width()
			$('.header_expansion').css({
				'display': toggle_display,
				'right': right_position,
			});
			previous_option = self;
			setup_header_options(self.attr('id'));
		});

});








