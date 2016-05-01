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
		current_event["eventName"] = "Game";
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

	var title_attr = $('<div>')
					.addClass('feedback_card_row')
					.appendTo(card_to_add)
					.append($('<div>')
								.addClass('feedback_card_element')
								.css({
									"width": "70%",
									"padding": "0px 0px 0px 10px",
									"font-size": "17px",
									"color": "#000000"
								})
								.text(opponent),
							$('<div>')
								.addClass('feedback_card_element')
								.css({
									"width": "30%",
									"padding": "0px 5px 0px 0px",
									"font-size": "13px",
									"color": "#617F8B",
									"justify-content": "flex-end",
									"font-family": "'Overlock', serif"
								})
								.text(date));
	var body_attr = $('<div>')
						.addClass('feedback_card_body')
						.appendTo(card_to_add)
						.append($('<div>')
									.addClass('feedback_card_element')
									.css({
										"width": "60%",
										"backgroundColor": "red"
									})
									.text(location),
								$('<div>')
									.addClass('feedback_card_element')
									.css({
										"width": "40%",
										"backgroundColor": "purple",
										"justify-content": "flex-end",
										"padding": "0px 15px 0px 0px"
									})
									.text(start_time));

	return card_to_add;
}

$(document).ready(function() {
	convert_data();
	var events_col = $('#feedback_events');
	for (var i = 0; i < events.length; i++) {
		var current_event = events[i];
			// .css({
			// 	'opacity': i / 10
			// });
		console.log("How many times");
		var curr_card = setup_card(current_event['opponent'], 
								   current_event['date'], 
								   current_event['location'], 
								   current_event['start_time'],
								   current_event['end_time']);
		
		curr_card.appendTo(events_col);
	}


});





















