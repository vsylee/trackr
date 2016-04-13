var feedback_animate_duration = 300;
var coach_comment_id = "comment_field_";
var coach_button_id = "coach_button_";

var practice1_comments = [
	{
		"name": "Czarina",
		"athlete_comment": "Coach Jing, your practices SUCK",
		"coach_comment": "Czarina, I don't suck!"
	},
	{
		"name": "Veronica",
		"athlete_comment": "Coach Jing, you're so old",
		"coach_comment": "Veronica, you're so young"
	},
	{
		"name": "Jing",
		"athlete_comment": "Coach Jing, I love your name",
		"coach_comment": "Jing, I love your name"
	},
	{
		"name": "Sam",
		"athlete_comment": "Coach Jing, nice legs",
		"coach_comment": "Sam, nice legs agneognaewoign gsgnao gnaeowg ghaeowg gaoe gewgegewgoe aog ewgoaewg eogew goew geow geaowiga eowigieag oewagewog eg",
	}
];

var game_comments = [
	{
		"name": "Czarina",
		"athlete_comment": "Coach Jing, your practices SUCK",
		"coach_comment": "Czarina, I don't suck!"
	},
	{
		"name": "Veronica",
		"athlete_comment": "Coach Jing, you're so old",
		"coach_comment": "Veronica, you're so young"
	},
	{
		"name": "Jing",
		"athlete_comment": "Coach Jing, I LOVE YOU!!!!!!! You're the best",
		"coach_comment": "Jing, I love your name HAHAHA you're great I love you too"
	},
	{
		"name": "Sam",
		"athlete_comment": "Coach Jing, nice legs agneognaewoign gsgnao gnaeowg ghaeowg gaoe gewgegewgoe aog ewgoaewg eogew goew geow geaowiga eowigieag oewagewog eg",
		"coach_comment": "Sam, nice legs"
	}
];

var practice2_comments = [
	{
		"name": "Czarina",
		"athlete_comment": "Coach Jing, your practices SUCK",
		"coach_comment": "Czarina, I don't suck!"
	},
	{
		"name": "Veronica",
		"athlete_comment": "Coach Jing, this is for practice 2",
		"coach_comment": "Veronica, it was on march 18"
	},
	{
		"name": "Jing",
		"athlete_comment": "Coach Jing, nice legs agneognaewoign gsgnao gnaeowg ghaeowg gaoe gewgegewgoe aog ewgoaewg eogew goew geow geaowiga eowigieag oewagewog eg",
		"coach_comment": "Jing, I love your name"
	},
	{
		"name": "Sam",
		"athlete_comment": "Coach Jing, nice legs agneognaewoign gsgnao gnaeowg ghaeowg gaoe gewgegewgoe aog ewgoaewg eogew goew geow geaowiga eowigieag oewagewog eg",
		"coach_comment": "Sam, you're the greatest"
	}
];

var events = [
	{
		"eventName": "Practice #1",
		"location": "MIT Zesiger Pool",
		"startTime": "6:00PM",
		"endTime": "8:00PM",
		"date": "April 9th, 2016",
		"comments": practice1_comments
	},
	{
		"eventName": "Game",
		"location": "Villanova",
		"startTime": "5:00PM",
		"endTime": "6:00PM",
		"date": "April 1st, 2016",
		"comments": game_comments
	},
	{
		"eventName": "Practice #2",
		"location": "Briggs Field",
		"startTime": "8:00AM",
		"endTime": "11:00AM",
		"date": "March 18th, 2016",
		"comments": practice2_comments
	}

];

var table_columns = ["Player name", "Athlete Comment", "Coach feedback"];

// Function to place caret at end of div from 
// http://stackoverflow.com/questions/4233265/contenteditable-set-caret-at-the-end-of-the-text-cross-browser
function placeCaretAtEnd(el) {
    el.focus();
    if (typeof window.getSelection != "undefined"
            && typeof document.createRange != "undefined") {
        var range = document.createRange();
        range.selectNodeContents(el);
        range.collapse(true);
        var sel = window.getSelection();
        sel.removeAllRanges();
        sel.addRange(range);
    } else if (typeof document.body.createTextRange != "undefined") {
        var textRange = document.body.createTextRange();
        textRange.moveToElementText(el);
        textRange.collapse(true);
        textRange.select();
    }
}

$(document).ready(function() {

	for (var i = 0; i < events.length; i++) {
		var currentEvent = events[i];
		var desc = currentEvent.eventName 
					+ " at "
					+ currentEvent.location 
					+ ", " 
					+ currentEvent.startTime 
					+ " - " 
					+ currentEvent.endTime
					+ " on " 
					+ currentEvent.date;
		$("<div>")
			.addClass("feedback-header")
			.appendTo($(".feedback"))
			.text("▾ " + desc);
		$("<div>")
			.addClass("content")
			.attr('id', 'event-' + i)
			.appendTo($(".feedback"));

		$('#event-' + i).append(
		"<div class='table-header' id='player-name-table-header'>Player's Names</div>" +
		"<div class='table-header'>Athlete Comments</div>" +
		"<div class='table-header'>Your Comments</div>"
			);

		var comments = currentEvent.comments;
		var counter = 0;

		for (var j = 0; j < comments.length; j++) {
			for (var k = 0; k < table_columns.length; k++) {

				var rescol = $("<div>")
								.addClass('content_col')
								.appendTo($('#event-' + i));
				var dimensions = {
					x: rescol.width(),
					y: rescol.height(),
				};

				if (k == 0) {
					rescol
						.attr('id', 'player-name')
						.text(comments[j].name);
				} else if (k == 1) {
					rescol
						.text(comments[j].athlete_comment);
				} else if (k == 2) {
					var coach_comment = $("<div>")
											.addClass('content_col_text_container')
											.text(comments[j].coach_comment)
											.attr('id', coach_comment_id + (i * events.length + j * comments.length + k))
											.appendTo(rescol);
					var field_button = $('<input type="button" value="Edit"/>')
											.addClass('content_end_button')
											.attr('id',  coach_button_id + (i * events.length + j * comments.length + k))
											.on('click', function(e) {
												var this_id = $(this).attr('id');
												var curr_text = $(this).val();
												var editable_id = '#' 
																+ coach_comment_id 
																+ $(this).attr('id').substring(coach_button_id.length);

												var content_editable = curr_text == "Edit" ? true : false;
												var edit_background = curr_text == "Edit" ? "#2795ee" : "#0c5a80";
												$(editable_id)
													.attr('contenteditable', content_editable)
												if (content_editable) {
													placeCaretAtEnd($(editable_id).get(0));
												}
												var curr_text = $(this).val() == "Edit" ? "Done" : "Edit";
												$(this)
													.attr('value', curr_text)
													.css({
														'backgroundColor': edit_background
													});
												
											});
					var field_button_container = $("<div>")
													.addClass('content_col_button_container')
													.append(field_button)
													.appendTo(rescol);

				}
			}
		}
	}

	$('.feedback-header').on('click', function() {
		var feedback_header = $(this);
		var content  = feedback_header.next();
		var text = feedback_header.html().substr(2);

		content.slideToggle(feedback_animate_duration, function() {
			feedback_header.text(function() {
				return content.is(":visible") ? "▾ " + text : "▸ " + text;
			});
		});
	});
});	







