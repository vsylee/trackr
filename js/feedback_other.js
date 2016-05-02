var events = [];
var fake_comments = [
	{
		"name": "Czarina",
		"img": "../images/extra_credit_1.jpeg",
		"athlete_comment": "I didn't think there was enough recovery time between the weight lifting and the sprints.",
		"coach_comment": "I'm really happy with your squat PR today. 225lbs is really amazing! " +
						"Don't get complacent though. You're capable of much more! " +
						"I'm sorry you didn't think there wasn't enough recovery time between weight lifting and sprints; " +
						"I'll take that into consideration for future practices."
	},
	{
		"name": "Veronica",
		"img": "../images/extra_credit_2.jpeg",
		"athlete_comment": "I can really feel myself improving.",
		"coach_comment": "I'm glad to hear you can feel yourself improving, but " +
						"you seemed really tired today; I'm assuming that's because you're sick. " +
						"Remember that health always comes first! Make sure to get some rest so that " +
						"you heal before the next game! The team needs you!"
	},
	{
		"name": "Jing",
		"img": "../images/extra_credit_3.jpg",
		"athlete_comment": "I am really starting to feel the ball as an extension of my body now.",
		"coach_comment": "That's the way to really understand the sport, and I'm glad you're getting more comfortable with the ball. " +
						"I hope to see continued hard work from you, Jing."
	},
	{
		"name": "Sam",
		"img": "../images/extra_credit_4.jpg",
		"athlete_comment": "My stamina has improved so much by doing the mile test.",
		"coach_comment": "Still, I feel like you've been slacking off a little bit and I feel like you could really " +
						"improve more if you worked a little harder. " +
						"I expect to see you well rested and fully energized for our next practice, " +
						"where I hope to see you pushing yourself harder."
	},
	{
		"name": "Michael",
		"img": "../images/extra_credit_5.jpg",
		"athlete_comment": "I hurt my ankle today during practice.",
		"coach_comment": "I'm so sorry you hurt your ankle today. I told you to be more careful! " +
						"I know I tell you guys to push yourselves but health is above all else. " +
						"Stay safe, know your limits. I hope you get some rest and I hope you feel better."
	},
	{
		"name": "Roger",
		"img": "../images/extra_credit_6.jpg",
		"athlete_comment": "I skipped practice today, sorry coach. I had a date.",
		"coach_comment": "Roger, a date is no excuse for missing practice. " +
						"Your teammates need you to be in your best condition to win the upcoming game. " +
						"If you keep skipping practices like this, I'm going to have to kick you out of " +
						"the team."
	}
];
var curr_selected_card = null;
var first_event = null;

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

function setup_table_title() {
	var player_row = $('<div>')
						.addClass('feedback_data_title_row')
						.append($('<div>')
									.addClass('feedback_data_player')
									.css({
										"position": "relative",
										"width": "calc(16% - 20px)",
										"height": "100%",
										"flex-flow": "row nowrap",
										"align-content": "flex-end",
										"align-items": "center",
										"justify-content": "center",
										// "backgroundColor": "blue",
										"padding-left": "24px",
										"color": "#000000", // 054869
										"font-size": "19px",
										// "border-bottom": "1px solid #bac4ca"
									})
									.text("Players")
									,
								$('<div>')
									.addClass('feedback_data_player')
									.css({
										"align-items": "center",
										// "backgroundColor": "green",
										"width": "calc(100% - 10px)",
										"padding-left": "10px",
										"justify-content": "center",
										"height": "100%",
										// "border-bottom": "1px solid #bac4ca"
									})
									.append($('<div>')
												.addClass('feedback_data_player')
												.css({
													"width": "100%",
													"height": "60%",
													"color": "#000000", // 054869
													"font-size": "19px"
													})
												.text("Your Feedback")//,
											// $('<div>')
											// 	.addClass('feedback_data_player')
											// 	.css({
											// 		'backgroundColor': "purple",
											// 		'width': "30%",
											// 		'height': "100%",
											// 		"justify-content": "flex-start",
											// 		"align-items": "center"
											// 	})
											// 	.text("Edit")
												
									)
						);

	return player_row;
}

function setup_player_row(curr_player_data) {
	var player_row = $('<div>')
							.addClass('feedback_data_row feedback_data_remove')
							.append($('<div>')
										.addClass('feedback_data_player')
										.css({
											"position": "relative",
											"width": "15%",
											"height": "100%",
											"flex-flow": "column nowrap",
											"align-content": "flex-end",
											"align-items": "center"
										})
										.append($('<img>')
													.attr('src', curr_player_data["img"])
													.css({
														"width": "80px",
														"height": "80px",
														"margin-left": "20px",
														"margin-top": "10px",
														"border-radius": "40px"
													}),
													$('<p>')
														.text(curr_player_data["name"])
														.css({
															"padding": "0px 0px 0px 20px",
															"color": "#0c5a80", // 3a87ad
															"font-size": "16px",
															"font-family": "Amaranth",
															"font-weight": "lighter"
														})
										),
									$('<div>')
										.addClass('feedback_data_player')
										.css({
											// "backgroundColor": "green",
											"width": "85%",
											"height": "100%"
										})
										.append($('<div>')
													.addClass('feedback_data_player')
													.css({
														"width": "100%",
														"height": "65%",
														"display": "block",
														"overflow-y": "scroll",
														"word-wrap": "break-word",
														"padding": "10px 0px 0px 10px",
														"outline": "0px solid transparent",
														"font-family": "Overlock",
														"font-size": "16px",
														"margin-top": "5px",
														"margin-right": "2px",
														// "backgroundColor": "orange",
														"border": "1px solid #e3e6e8",
														"color": "#000000" // 054869
 													})
													.attr('id', "coach_comment_" + curr_player_data["name"])
													.text(curr_player_data["coach_comment"]),
												$('<div>')
													.addClass('feedback_data_player')
													.css({
														// 'backgroundColor': "purple",
														'width': "10%",
														'height': "100%",
														"justify-content": "flex-start",
														"align-items":  "flex-start", //"center"
														"margin-top": "10px"
													})
													.append($('<img>')
																.attr('src', '../images/pen.png')
																.css({
																	"width": "20px",
																	"height": "20px",
																	"margin-left": "5px"
																	// "background-color": "red"
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
								if (curr_selected_card) {
									console.log("entered if");
									curr_selected_card.css({
										"background-color": "#ffffff",
										"font-weight": "normal"
									});

									var card_row = $(curr_selected_card.context.childNodes[0]);
									var card_body = $(curr_selected_card.context.childNodes[1]);
									$(card_row.context.childNodes[0]).css("color", "#000000");
									$(card_row.context.childNodes[1]).css("color", "#617F8B");
									$(card_body.context.childNodes[0]).css("color", "#3a87ad");
									$(card_body.context.childNodes[1]).css("color", "#3a87ad");
								}

								var target_class = $(e.target).context.className;
								var card;
								if (target_class == "feedback_card") {
									card = $(e.target);
								} else if (target_class == "feedback_card_row" || target_class == "feedback_card_body") {
									card = $($(e.target).context.parentNode);
								} else if (target_class == "feedback_card_element") {
									card = $($(e.target).context.parentNode.parentNode);
								}
								card.css({
									"background-color": "#ffbd71", // ffbd71 fcab4e
									"font-weight": "bolder"
								});
								
								var card_row = $(card.context.childNodes[0]);
								var card_body = $(card.context.childNodes[1]);
								$(card_row.context.childNodes[0]).css("color", "#054869");
								$(card_row.context.childNodes[1]).css("color", "#054869");
								$(card_body.context.childNodes[0]).css("color", "#054869");
								$(card_body.context.childNodes[1]).css("color", "#054869");

								curr_selected_card = card;
								
								var curr_name = jQuery.data(card_to_add, "name");
								var curr_location = jQuery.data(card_to_add, "location");
								var curr_start_time = jQuery.data(card_to_add, "start_time");
								var curr_end_time = jQuery.data(card_to_add, "end_time");

								var event_description = curr_name + " at " + 
														curr_location + " from " + 
														curr_start_time + " to " + 
														curr_end_time
								$('#body_title')
									.text(/*"Your Feedback for " + */curr_name)
									.css('color', '#3a87ad'); // event_description
								var div_container = $('#feedback_data_cols');

								// Should be loading real data here
								var curr_player_data = fake_comments;
								$('.feedback_data_remove').remove();

								div_container
									.append(setup_table_title());
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
		if (i == 0) {
			first_event = curr_card
		}
	}

	first_event.trigger('click');

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




