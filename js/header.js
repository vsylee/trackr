var tennis = ['Tennis A', 'Tennis B', 'Tennis C', 'Tennis D', 'Tennis E', 'Tennis F', 'Tennis G', 'Tennis H', 'Tennis I', 'Tennis J', 'Tennis K', 'Tennis L', 'Tennis M', 'Tennis N', 'Tennis O', 'Tennis P', 'Tennis Q', 'Tennis R', 'Tennis S', 'Tennis T', 'Tennis U', 'Tennis V', 'Tennis W', 'Tennis X', 'Tennis Y', 'Tennis Z'];
var gymnastics = ['Gymnastics A', 'Gymnastics B', 'Gymnastics C', 'Gymnastics D'];
var soccer = ['Czarina', 'Veronica', 'Jing', 'Sam', 'Michael', 'Roger', 'Richard', 'Paul', 'Chris', 'Josh', 'Mira', 'Miri'];
var teams = {"gymnastics":gymnastics, "tennis":tennis, "soccer":soccer};

var navigation_elements = {
	"header_events": ["Event A", "Event B", "Event C", "Event D"],
	"header_feedback": ["Feedback A", "Feedback B", "Feedback C", "Feedback D"],
	"header_account": ["Account", "Settings", "Log Out"]
};
var previous_option;
var header_buttons = ['header_events', 'header_feedback', 'header_triangle'];

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

function setup_header_options(id) {
	var classes = "header_expansion_child disable_select";
	$('.header_expansion').empty();
	switch (id) {
		case "header_events":
			classes += " header_expansion_child_events";
		case "header_feedback":
			classes += " header_expansion_child_feedback";
		case "header_account":
			classes += " header_expansion_child_account";
	}

	for (var i = 0; i < navigation_elements[id].length; i++) {
		$('<div>')
			.addClass(classes)
			.appendTo($('.header_expansion'))
			.attr('id', navigation_elements[id][i])
			.on('click', function(e) {
				console.log($(this).attr('id'));
				if ($(this).attr('id') == 'Account') {
					window.location.href = './profile.html';					
				} else if ($(this).attr('id') == 'Settings') {
					window.location.href = './settings.html';
				}
			})
			.text(navigation_elements[id][i]);
	}
}

var right_panel_width = 300;
var animation_time = 400;

function toggleRightPanel(animationTime) {
	if ($("#right-panel-button").hasClass('right-panel-open')) {
		$("#right-panel").animate({
			right: "-=" + right_panel_width
		}, animation_time, function(){
			// animation complete
		});

		$(".content").animate({
			right: "-=" + right_panel_width
		}, animation_time, function(){
			// animation complete
		});
		$(".container").animate({
			right: "-=" + right_panel_width
		}, animation_time, function(){
			// animation complete
		});
		$("#right-panel-button").html("◀").removeClass('right-panel-open').addClass('right-panel-closed');
	} else {
		$("#right-panel").animate({
			right: "+=" + right_panel_width
		}, animation_time, function(){
			// animation complete
		});

		$(".content").animate({
			right: "+=" + right_panel_width
		}, animation_time, function(){
			// animation complete
		});
		$(".container").animate({
			right: "+=" + right_panel_width
		}, animation_time, function(){
			// animation complete
		});
		$("#right-panel-button").html("▶").removeClass('right-panel-closed').addClass('right-panel-open');
	}
}

$(document).ready(function() {
	menu_options = $('.header_button');
	$('.header_button')
		.on('click', function(e) {

			var self = $(this);
			var hex_color = hexc(self.css("background-color"));
			var update_color = hex_color == '#3a87ad' ? '#8cc3dd' : '#3a87ad';
			var toggle_display = $('.header_expansion').css('display')  == "none" ? "flex" : "none";

			self.css({
				'background-color': update_color
			});

			if (previous_option && previous_option[0] !== self[0]) {
				previous_option.css({
					'background-color': '#3a87ad'
				});
				toggle_display = "flex";
			}

			var pos_offset = self.offset();
			var right_position = $(window).width() - pos_offset.left - self.width();
			var width;

			if ($(this).attr('id').indexOf('header_events') != -1 ||
				$(this).attr('id').indexOf('header_feedback') != -1) {
				width = 250;
			} else {
				width = 125;
			}

			$('.header_expansion').css({
				'display': toggle_display,
				'right': right_position,
				'width': width + 'px'
			});
			previous_option = self;
			setup_header_options(self.attr('id'));
		});


	// populate team dropdown menu
	for (var i=0; i < Object.keys(teams).length; i++) {
		var team = Object.keys(teams)[i];
		$("#team-select").append(
			"<option value='" + team + "'>" +
			team.substr(0,1).toUpperCase() + team.substr(1).toLowerCase() +
			"</option>");
	}

	// populate team member list
	var populateTeamList = function() {
		var selected_team = $("#team-select").val();
		var team_members = teams[selected_team];
		$("#team-members").empty();
		for (var i=0; i < team_members.length; i++) {
			if (i != 0) {
				$("#team-members").append("<hr>");
			}
			$("#team-members").append(
				"<li>" + team_members[i] + "</li>");
		}
	};

	$("#team-select").on('change', function (e) {
		populateTeamList();
	});

	$("#right-panel-triangle").html("▶");
	$("#right-panel-button").click(function (e) {
		toggleRightPanel(animation_time);
	});





});