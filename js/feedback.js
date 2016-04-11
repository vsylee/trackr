var feedback_animate_duration = 300;

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

$(document).ready(function() {

	for (var i = 0; i < events.length; i++) {
		var currentEvent = events[i];
		console.log(currentEvent);
		$("<div>")
			.addClass("feedback-header")
			.appendTo($(".feedback"))
			.text(
				"▾ " +
				currentEvent.eventName + " at " +
				currentEvent.location + ", " +
				currentEvent.startTime + " - " +
				currentEvent.endTime + " on " +
				currentEvent.date);
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
		console.log(comments);

		for (var j = 0; j < comments.length; j++) {
			for (var k = 0; k < table_columns.length; k++) {
				if (k == 0) {
					$("<div>")
						.addClass("content_col")
						.attr('id', 'player-name')
						.appendTo($('#event-' + i))
						.text(comments[j].name);
				} else if (k == 1) {
					$("<div>")
						.addClass("content_col")
						.appendTo($('#event-' + i))
						.text(comments[j].athlete_comment);
				} else if (k == 2) {
					$("<div>")
						.addClass("content_col")
						.appendTo($('#event-' + i))
						.text(comments[j].coach_comment);				
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







