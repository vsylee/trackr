var events = [];
var fake_comments = [
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
];

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
		console.log(current_event_object.title);
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
											"width": "30%",
											"height": "100%"
										}),
									$('<div>')
										.addClass('feedback_data_player')
										.css({
											"backgroundColor": "green",
											"width": "50%",
											"height": "100%"
										}));

	return player_row;
}

function setup_card(name, location, start_time, end_time) {
	var card_to_add = $('<div>')
							.addClass('feedback_card')
							.on('click', function(e) {
								
								var curr_name = jQuery.data(card_to_add, "name");
								var curr_location = jQuery.data(card_to_add, "location");
								var curr_start_time = jQuery.data(card_to_add, "start_time");
								var curr_end_time = jQuery.data(card_to_add, "end_time");

								var event_description = curr_name + " at " + 
														curr_location + " from " + 
														curr_start_time + " to " + 
														curr_end_time
								$('#body_title')
									.text(event_description);
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

	console.log("adding" + name);
	return card_to_add;
}

function searchKeyPress() {
	console.log("pressing");
	var events_col = $('#feedback_events');
	$(".feedback_card").remove();
	var searchValue = $("#search-bar").val();
	var len = searchValue.length;

	var matchingEvents = [];
	for (var i = 0; i < events.length; i++) {
		var current_event = events[i];
		if (current_event.name.substr(0,len).toLowerCase() === searchValue.toLowerCase()
				|| current_event.location.substr(0,len).toLowerCase() === searchValue.toLowerCase()) {
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
		
		// jQuery.data(curr_card, "event_index", i);

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




