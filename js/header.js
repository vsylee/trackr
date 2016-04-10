function dropdown(id) {
	document.getElementById(id).classList.toggle("show");
	// close all menus that aren't the menu just clicked
	var ids = ['event-updates', 'feedback-updates', 'triangle-menu'];
	for (var i = 0; i < ids.length; i++) {
		if (id != ids[i]) {
			document.getElementById(ids[i]).classList.remove('show');
		}
	}
};

$(document).ready(function() {


	$("#search-bar").click( function (e) {
		if ($(this).val() == "🔍 Search...") {
			$(this).val("");
		}
	});
	$(document).click( function (e) {
		// if not search bar, return the "Search" text
		if (!$(e.target).closest("#search-bar").length &&
			!$(e.target).is("#search-bar")) {
			if ($("#search-bar").val() == "") {
				$("#search-bar").val("🔍 Search...");
			}
		}
		// if not a menu, close menu
		if (!$(e.target).is(".dropbtn")) {
			var dropdowns = document.getElementsByClassName("dropdown-content");
			for (var d = 0; d < dropdowns.length; d++) {
				var openDropdown = dropdowns[d];
				if (openDropdown.classList.contains('show')) {
					openDropdown.classList.remove('show');
				}
			}
		}
	});

	var tennis = ['Tennis A', 'Tennis B', 'Tennis C', 'Tennis D', 'Tennis E', 'Tennis F', 'Tennis G', 'Tennis H', 'Tennis I', 'Tennis J', 'Tennis K', 'Tennis L', 'Tennis M', 'Tennis N', 'Tennis O', 'Tennis P', 'Tennis Q', 'Tennis R', 'Tennis S', 'Tennis T', 'Tennis U', 'Tennis V', 'Tennis W', 'Tennis X', 'Tennis Y', 'Tennis Z'];
	var gymnastics = ['Gymnastics A', 'Gymnastics B', 'Gymnastics C', 'Gymnastics D'];
	var teams = {"tennis":tennis, "gymnastics":gymnastics}
	// populate team list
	for (var i=0; i < Object.keys(teams).length; i++) {
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
		for (var i=0; i < team_members.length; i++) {
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