$(document).ready(function() {

	// $("#triangle-menu").click(function (e) {
	// 	if ($(this).hasClass('closed')) {
	// 		$("#triangle-menu-content").css({
	// 			'left':'auto',
	// 			'right':'0',
	// 		});
	// 		$(this).removeClass('closed').addClass('open');
	// 		$("#triangle").html("▲")
	// 	} else {
	// 		$("#triangle-menu-content").css({
	// 			'left':'-9999px',
	// 		});
	// 		$(this).removeClass('open').addClass('closed');
	// 		$("#triangle").html("▼")
	// 	}
	// });

	$("#search-bar").click( function (e) {
		if ($(this).val() == "🔍 Search...") {
			$(this).val("");
		}
	});
	$(document).click( function (e) {
		if (!$(e.target).closest("#search-bar").length &&
			!$(e.target).is("#search-bar")) {
			if ($("#search-bar").val() == "") {
				$("#search-bar").val("🔍 Search...");
			}
		}
	});

	var tennis = ['Tennis A', 'Tennis B', 'Tennis C', 'Tennis D', 'Tennis E', 'Tennis F', 'Tennis G', 'Tennis H', 'Tennis I', 'Tennis J', 'Tennis K', 'Tennis L', 'Tennis M', 'Tennis N', 'Tennis O', 'Tennis P', 'Tennis Q', 'Tennis R', 'Tennis S', 'Tennis T', 'Tennis U', 'Tennis V', 'Tennis W', 'Tennis X', 'Tennis Y', 'Tennis Z'];
	var gymnastics = ['Gymnastics A', 'Gymnastics B', 'Gymnastics C', 'Gymnastics D'];
	var teams = {"tennis":tennis, "gymnastics":gymnastics}
	// populate team list
	for (i=0; i < Object.keys(teams).length; i++) {
		var team = Object.keys(teams)[i];
		$("#team-select").append(
			"<option value='" + team + "'>" +
			team.substr(0,1).toUpperCase() + team.substr(1).toLowerCase() +
			"</option>");
	}

	$("#team-select").on('change', function (e) {
		var selected_team = $(this).val();
		var team_members = teams[selected_team];
		$("#team-members").empty();
		for (i=0; i < team_members.length; i++) {
			if (i != 0) {
				$("#team-members").append("<hr>");
			}
			$("#team-members").append(
				"<li>" + team_members[i] + "</li>");
		}
	});


	var right_panel_width = 300;
	var animation_time = 500;
	$("#right-panel-triangle").html("▶");
	$("#right-panel-button").click(function (e) {
		if ($(this).hasClass('open')) {
			$("#right-panel").animate({
				right: "-=" + right_panel_width
			}, animation_time, function(){
				// animation complete
			});

			$("#content").animate({
				"margin-right": "-=" + right_panel_width
			}, animation_time, function(){
				// animation complete
			});
			$(this).html("◀").removeClass('open').addClass('closed');
		} else {
			$("#right-panel").animate({
				right: "+=" + right_panel_width
			}, animation_time, function(){
				// animation complete
			});

			$("#content").animate({
				"margin-right": "+=" + right_panel_width
			}, animation_time, function(){
				// animation complete
			});
			$(this).html("▶").removeClass('closed').addClass('open');
		}

	});

});