var events = [];
var fake_comments = [
	{
		"name": "Czarina",
		"img": "../images/extra_credit_one.jpeg",
		"athlete_comment": "I didn't think there was enough recovery time between the weight lifting and the sprints.",
		"coach_comment": "That's a great point. I'll take that into future consideration."
	},
	{
		"name": "Veronica",
		"img": "../images/extra_credit_two.jpg",
		"athlete_comment": "I can really feel myself improving.",
		"coach_comment": "That's great Veronica. You have three more years left too!"
	},
	{
		"name": "Jing",
		"img": "../images/extra_credit_three.jpg",
		"athlete_comment": "I am really starting to feel the ball as an extension of my body now.",
		"coach_comment": "That's the way to really understand the sport."
	},
	{
		"name": "Sam",
		"img": "../images/extra_credit_four.jpg",
		"athlete_comment": "My stamina has improved so much by doing the mile test.",
		"coach_comment": "Sam your legs look amazing.",
	}
];

// Function to place caret at end of div from 
// http://stackoverflow.com/questions/4233265/contenteditable-set-caret-at-the-end-of-the-text-cross-browser
function placeCaretAtEnd(el) {
    el.focus();
    if (typeof window.getSelection != "undefined" && typeof document.createRange != "undefined") {
        var range = document.createRange();
        range.selectNodeContents(el);
        range.collapse(false);
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

function convert_data() {
	var eventData = storedEvents;
	eventData.sort(function(first_event, second_event) {

		var first_date = new Date(first_event.start);
		var second_date = new Date(second_event.start);

		return first_date - second_date;

		// var first_time = gameData[a]; 
		// var second_time = gameData[b];

		// var first_index_colon = first_time.startTime.indexOf(':');
		// var first_hours = first_time.startTime.substring(0, first_index_colon);
		// var first_minutes = first_time.startTime.substring(first_index_colon + 1);

		// var second_index_colon = second_time.startTime.indexOf(':');
		// var second_hours = second_time.startTime.substring(0, second_index_colon);
		// var second_minutes = second_time.startTime.substring(second_index_colon + 1);

		// return new Date(first_time.date) - new Date(second_time.date) 
		// 	+ (first_hours - second_hours) * 60 * 1000 
		// 	+ (first_minutes - second_minutes) * 1000;
	});
	eventData.reverse();
	for (var i = 0; i < eventData.length; i++) {
		var current_event = {};
		var current_event_object = eventData[i];
		// current_event["event_name"] = "Game";
		current_event["name"] = current_event_object.title;
		current_event["location"] = current_event_object.location;
		current_event["start_time"] = current_event_object.start;
		current_event["end_time"] = current_event_object.end;
		current_event["comments"] = fake_comments[parseInt(Math.random() * fake_comments.length)];

		events[i] = current_event;
	}
}

function setup_player_row(curr_player_data) {
	var player_row = $('<div>')
							.addClass('feedback_data_row feedback_data_remove')
							.append($('<div>')
										.addClass('feedback_data_player')
										.css({
											"backgroundColor": "cyan",
											"position": "relative",
											"width": "30%",
											"height": "100%",
											"flex-flow": "column nowrap",
											"justify-content": "center",
											"align-content": "flex-end",
											"align-items": "center"
										})
										.append($('<img>')
													.attr('src', curr_player_data["img"])
													.css({
														"width": "160px",
														"height": "160px",
														"padding": "0px 0px 0px 60px"
													}),
													$('<p>')
														.text(curr_player_data["name"])
														.css({
															"padding": "0px 0px 0px 60px"
														})
										),
									$('<div>')
										.addClass('feedback_data_player')
										.css({
											"backgroundColor": "green",
											"width": "70%",
											"height": "100%"
										})
										.append($('<div>')
													.addClass('feedback_data_player')
													.css({
														"width": "50%",
														"height": "90%",
														"display": "block",
														"overflow-y": "scroll",
														"word-wrap": "break-word",
														"padding": "10px",
														"outline": "0px solid transparent"
													})
													.attr('id', "coach_comment_" + curr_player_data["name"])
													.text(curr_player_data["coach_comment"]),
												$('<div>')
													.addClass('feedback_data_player')
													.css({
														'backgroundColor': "purple",
														'width': "30%",
														'height': "100%",
														"justify-content": "flex-start",
														"align-items": "center"
													})
													.append($('<img>')
																.attr('src', '../images/pen.png')
																.css({
																	"width": "20px",
																	"height": "20px"
																})
																.data('selected', false)
																.attr('id', curr_player_data["name"])
																.on('click', function(e) {
																	var editable_id = "#coach_comment_" + $(this).attr('id');
																	var curr_element = $(editable_id);
																	var selected = $(this).data('selected');

																	console.log("What's the selected field " + selected);
																	if (!selected) {
																		curr_element.attr('contenteditable', true);
																		placeCaretAtEnd($(editable_id).get(0));
																		$(this).attr('src', '../images/check.png')
																	} else {
																		curr_element.attr('contenteditable', false);
																		$(this).attr('src', '../images/pen.png');
																	}
																	$(this).data('selected', !selected);
																})
													)
										)
							);

	return player_row;
}

function setup_card(name, location, start_time, end_time) {
	var card_to_add = $('<div>')
							.addClass('feedback_card')
							.on('click', function(e) {
								console.log($(e.target));
								// console.log($(e.target).context.className);
								// console.log($(e.target).context.parentElement.className);
								// console.log($(e.target).context.parentElement.parentElement.className);
								var target_class = $(e.target).context.className;
								var card;
								if (target_class == "feedback_card") {
									card = $(e.target);
								} else if (target_class == "feedback_card_row" || target_class == "feedback_card_body") {
									card = $($(e.target).context.parentNode);
								} else if (target_class == "feedback_card_element") {
									card = $($(e.target).context.parentNode.parentNode);
								}
								console.log(card);
								card.css({
									"background-color": "orange"
								});
								
								var curr_name = jQuery.data(card_to_add, "name");
								var curr_location = jQuery.data(card_to_add, "location");
								var curr_start_time = jQuery.data(card_to_add, "start_time");
								var curr_end_time = jQuery.data(card_to_add, "end_time");

								var event_description = curr_name + " at " + 
														curr_location + " from " + 
														curr_start_time + " to " + 
														curr_end_time
								$('#body_title')
									.text(curr_name); // event_description
								var div_container = $('#feedback_data_cols');

								// Should be loading real data here
								var curr_player_data = fake_comments;
								$('.feedback_data_remove').remove();

								for (var i = 0; i < curr_player_data.length; i++) {
									div_container
										.append(setup_player_row(curr_player_data[i]));
										
								}


							});

	jQuery.data(card_to_add, "name", name);
	jQuery.data(card_to_add, "location", location);
	jQuery.data(card_to_add, "start_time", start_time);
	jQuery.data(card_to_add, "end_time", end_time);

	var title_attr = $('<div>')
					.addClass('feedback_card_row')
					.appendTo(card_to_add)
					.append($('<div>')
								.addClass('feedback_card_element')
								.css({
									"width": "85%",
									"padding": "0px 0px 0px 10px",
									"font-size": "17px",
									"color": "#000000",
								})
								.text(name),
							$('<div>')
								.addClass('feedback_card_element')
								.css({
									"width": "15%",
									"padding": "0px 5px 0px 0px",
									"font-size": "13px",
									"margin-top": "4px",
									"color": "#617F8B",
									"justify-content": "flex-end",
									"font-family": "'Overlock', serif",
								})
								.text(moment(new Date(start_time)).format('MMM DD')));
	var body_attr = $('<div>')
						.addClass('feedback_card_body')
						.appendTo(card_to_add)
						.append($('<div>')
									.addClass('feedback_card_element')
									.css({
										"width": "90%",
										"color": "#3a87ad",
										"padding": "0px 0px 0px 10px",
										"font-size": "15px",
										"margin-top": "8px"
									})
									.text("at " + location),
								$('<div>')
									.addClass('feedback_card_element')
									.css({
										"width": "10%",
										"justify-content": "flex-end",
										"padding": "0px 15px 0px 0px",
										"font-family": "'Overlock', serif",
										"font-size": "13px",
										"color": "#3a87ad",  //617F8B
										"margin-top": "10px",
										"margin-right": "5px",
									})
									.text(moment(new Date(start_time)).format('h A')));

	return card_to_add;
}

function searchKeyPress() {
	// console.log("pressing");
	var events_col = $('#feedback_events');
	$(".feedback_card").remove();
	var searchValue = $("#search-bar").val();
	var len = searchValue.length;

	var matchingEvents = [];
	for (var i = 0; i < events.length; i++) {
		var current_event = events[i];
		// console.log(current_event.name.substr(8,len).toLowerCase())
		if (current_event.name.substr(0,len).toLowerCase() === searchValue.toLowerCase()
				|| current_event.location.substr(0,len).toLowerCase() === searchValue.toLowerCase()
				|| (current_event.name.substr(0,8) === "Game vs "
					&& current_event.name.substr(8,len).toLowerCase() === searchValue.toLowerCase()) ) {
			matchingEvents.push(current_event);
		}
	}
	if (matchingEvents.length === 0) {
		$("<div>")
			.addClass('feedback_card')
			.css("border-bottom", "none")
			.appendTo(events_col);
	}
	for (var i = 0; i < matchingEvents.length; i++) {
		var current_event = matchingEvents[i];
		var curr_card = setup_card(current_event['name'],
								   current_event['location'], 
								   current_event['start_time'],
								   current_event['end_time']);
		curr_card.appendTo(events_col);
	}
}

$(document).ready(function() {
	convert_data();
	var events_col = $('#feedback_events');
	for (var i = 0; i < events.length; i++) {
		var current_event = events[i];
		var curr_card = setup_card(current_event['name'],
								   current_event['location'], 
								   current_event['start_time'],
								   current_event['end_time']);
		
		curr_card.appendTo(events_col);
	}

	$("#search-bar").click( function (e) {
		if ($(this).val().indexOf("🔍 Search by team, location, or date") > -1) {
			$(this).val("");
		}
	});
	$(document).click(function (e) {
		if (!$(e.target).closest("#search-bar").length &&
			!$(e.target).is("#search-bar")) {
			if ($("#search-bar").val() == "") {
				$("#search-bar").val("🔍 Search by team, location, or date")
			}
		}
	});

});




