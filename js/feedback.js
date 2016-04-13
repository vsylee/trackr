var feedback_animate_duration = 300;
var coach_comment_id = "comment_field_";
var coach_button_id = "coach_button_";

var table_columns = ["Player name", "Athlete Comment", "Coach feedback"];
var previous_comment;
var previous_button;
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
	var counter = 0;
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
											.attr('id', coach_comment_id + counter)
											.appendTo(rescol);
					var field_button = $('<input type="button" value="Edit"/>')
											.addClass('content_end_button')
											.attr('id',  coach_button_id + counter)
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
												console.log("WHere am I");
												if (previous_button && previous_button[0] !== $(this)[0]) {
													console.log("Here?");
													previous_button
														.attr('value', "Edit")
														.css({
															'backgroundColor': '#0c5a80'
														});
													previous_comment
														.attr('contenteditable', false);
												} 
												previous_button = $(this);
												previous_comment = $(editable_id);											
											});
					var field_button_container = $("<div>")
													.addClass('content_col_button_container')
													.append(field_button)
													.appendTo(rescol);
					counter = counter + 1;
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







