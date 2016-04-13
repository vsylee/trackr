// var navigation_elements = {
// 	"header_events": ["Event A", "Event B", "Event C", "Event D"],
// 	"header_feedback": ["Feedback A", "Feedback B", "Feedback C", "Feedback D"],
// 	"header_account": ["Account", "Settings", "Log Out"]
// };
// var previous_option;
// var header_buttons = ['header_events', 'header_feedback', 'header_triangle'];

// // Code taken from Stackoverflow http://stackoverflow.com/questions/5999209/how-to-get-the-background-color-code-of-an-element
// function hexc(colorval) {
//     var parts = colorval.match(/^rgb\((\d+),\s*(\d+),\s*(\d+)\)$/);
//     delete(parts[0]);
//     for (var i = 1; i <= 3; ++i) {
//         parts[i] = parseInt(parts[i]).toString(16);
//         if (parts[i].length == 1) parts[i] = '0' + parts[i];
//     }
//     color = '#' + parts.join('');

//     return color;
// }

// function setup_header_options(id) {
// 	var classes = "header_expansion_child";
// 	$('.header_expansion').empty();
// 	switch (id) {
// 		case "header_events":
// 			classes += " header_expansion_child_events";
// 		case "header_feedback":
// 			classes += " header_expansion_child_feedback";
// 		case "header_account":
// 			classes += " header_expansion_child_account";
// 	}

// 	for (var i = 0; i < navigation_elements[id].length; i++) {
// 		$('<div>')
// 			.addClass(classes)
// 			.appendTo($('.header_expansion'))
// 			.on('click', function(e) {
// 				console.log("I am being clicked");
// 			})
// 			.text(navigation_elements[id][i]);
// 	}
// }

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








