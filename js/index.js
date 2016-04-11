var navigation_elements = {
	"events": ["Event A", "Event B", "Event C", "Event D"],
	"feedback": ["Feedback A", "Feedback B", "Feedback C", "Feedback D"],
	"account": ["Account", "Settings", "Log Out"]
};

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


$(document).ready(function() {

	$('.header_button')
		.on('click', function(e) {
			var self = $(this);
			var hex_color = hexc(self.css("background-color"));
			var update_color = hex_color == '#4892d3' ? '#1cdbf7' : '#4892d3';
			self.css({
				'background-color': update_color
			});

			var pos_offset = self.offset();
			var toggle_display = $('.header_expansion').css('display') == "none" ? "block" : "none";
			var right_position = $(window).width() - pos_offset.left - pos_offset.width
			$('.header_expansion').css({
				'display': toggle_display,
				'right': right_position,
			});
		})

})