var events = [];
var fake_comments = [
	[
		{
			"name": "Czarina",
			"athlete_comment": "I didn't think there was enough recovery time between the weight lifting and the sprints.",
			"coach_comment": "That's a great point. I'll take that into future consideration."
		},
		{
			"name": "Veronica",
			"athlete_comment": "I can really feel myself improving.",
			"coach_comment": "That's great Veronica. You have three more years left too!"
		},
		{
			"name": "Jing",
			"athlete_comment": "I am really starting to feel the ball as an extension of my body now.",
			"coach_comment": "That's the way to really understand the sport."
		},
		{
			"name": "Sam",
			"athlete_comment": "My stamina has improved so much by doing the mile test.",
			"coach_comment": "Sam your legs look amazing.",
		}
	]
];


function convert_data() {
	var keys = Object.keys(gameData)
	keys.sort(function(a, b) {
		var first_time = gameData[a]; 
		var second_time = gameData[b];

		var first_index_colon = first_time.startTime.indexOf(':');
		var first_hours = first_time.startTime.substring(0, first_index_colon);
		var first_minutes = first_time.startTime.substring(first_index_colon + 1);

		var second_index_colon = second_time.startTime.indexOf(':');
		var second_hours = second_time.startTime.substring(0, second_index_colon);
		var second_minutes = second_time.startTime.substring(second_index_colon + 1);

		return new Date(first_time.date) - new Date(second_time.date) 
			+ (first_hours - second_hours) * 60 * 1000 
			+ (first_minutes - second_minutes) * 1000;
	});
	keys.reverse();
	for (var i = 0; i < keys.length; i++) {
		var current_event = {};
		var current_event_object = gameData[keys[i]];
		current_event["event_name"] = "Game";
		current_event["opponent"] = current_event_object.opponent;
		current_event["location"] = current_event_object.location;
		current_event["start_time"] = current_event_object.startTime;
		current_event["end_time"] = current_event_object.endTime;
		current_event["date"] = current_event_object.date;
		current_event["comments"] = fake_comments[parseInt(Math.random() * fake_comments.length)];

		events[i] = current_event
	}
}

function setup_card(opponent, date, location, start_time, end_time) {
	var card_to_add = $('<div>')
							.addClass('feedback_card')
							.on('click', function(e) {
								var data_index = jQuery.data(card_to_add, "event_index");
								var current_event = events[data_index];

								var event_description = current_event["event_name"] + " at " + 
														current_event["location"] + " with " + 
														current_event["opponent"] + " from " + 
														current_event["start_time"] + " to " + 
														current_event["end_time"] + " on " + 
														current_event["date"];
								$('#body_title')
									.text(event_description);
							});

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
									// "background-color": "cyan"
								})
								.text(opponent),
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
									// "background-color": "turquoise"
								})
								.text(date));
	var body_attr = $('<div>')
						.addClass('feedback_card_body')
						.appendTo(card_to_add)
						.append($('<div>')
									.addClass('feedback_card_element')
									.css({
										"width": "90%",
										"color": "#617F8B",
										"padding": "0px 0px 0px 10px",
										"font-size": "15px",
										"margin-top": "8px"
									})
									.text("at "+location),
								$('<div>')
									.addClass('feedback_card_element')
									.css({
										"width": "10%",
										// "backgroundColor": "purple",
										"justify-content": "flex-end",
										"padding": "0px 15px 0px 0px",
										"font-family": "'Overlock', serif",
										"font-size": "13px",
										"color": "#617F8B",
										"margin-top": "10px"
									})
									.text(start_time));

	return card_to_add;
}

function searchKeyPress() {
	console.log("pressing");
	$(".feedback_card").remove();
	var searchValue = $("#search-bar").val();
	var len = searchValue.length;
	// var currentTeam = $("#team-select").val();
	// var currentMembers = teams[currentTeam];
	// var matchingMembers = [];
	// if (currentMembers) {
	// 	for (var i=0; i < currentMembers.length; i++) {
	// 		if (currentMembers[i].substr(0,len).toLowerCase() === searchValue.toLowerCase()) {
	// 			matchingMembers.push(currentMembers[i]);
	// 		}
	// 	}
	// 	for (var i=0; i < matchingMembers.length; i++) {
	// 		if (i != 0) {
	// 			$("#team-members").append("<hr>");
	// 		}
	// 		$("#team-members").append(
	// 			"<li>" + matchingMembers[i] + "</li>");
	// 	}
	// }
}

$(document).ready(function() {
	convert_data();
	var events_col = $('#feedback_events');
	for (var i = 0; i < events.length; i++) {
		var current_event = events[i];
		var curr_card = setup_card(current_event['opponent'], 
								   current_event['date'], 
								   current_event['location'], 
								   current_event['start_time'],
								   current_event['end_time']);
		
		jQuery.data(curr_card, "event_index", i);
		curr_card.appendTo(events_col);
	}

	$("#search-bar").click( function (e) {
		if ($(this).val().indexOf("🔍 Search by team, location, or date") > -1) {
			$(this).val("");
		}
	});
	$(document).click(function (e) {
		// if not search bar, return the "Search" text
		if (!$(e.target).closest("#search-bar").length &&
			!$(e.target).is("#search-bar")) {
			if ($("#search-bar").val() == "") {
				$("#search-bar").val("🔍 Search by team, location, or date")
			}
		}
		// if not a menu, close menu
		if (!$(e.target).is(".header_button")) {
			$('.header_expansion').css('display', "none");
			$('.header_button').css('background-color', '#3a87ad');

		}
	});


});





















