

function addEventDialog(popoverId) {
	var dialog =
		'<div class="addEvent-dialog" id="addEvent-dialog-text">' +
			'<form id="add_event" action="javascript:addEvent(' + popoverId + ');" class="addEvent-form">' +
				'<label for="name">Event Name: </label><input type="text" name="name" id="name" required autofocus/><br>' +
				'<label for="startDate">Start Date: </label><input type="text" name="date" id="startDate" required/><br>' +
				'<label for="startTime">Start Time: </label><input type="time" name="startTime" id="startTime" required/><br>' +
				'<label for="endDate">End Date: </label><input type="text" name="date" id="endDate"/><br>' + 
				'<label for="endTime">End Time: </label><input type="time" name="endTime" id="endTime"/><br>' +
				'<label for="location">Location: </label><input type="text" name="location" id="location"/><br>' +
				'<label for="share">Share with: </label>' +
					'<select name="teams" value:"Select Team/s">' +
						'<option value="">Gymnastics</option>' +
						'<option value="">Soccer</option>' +
						'<option value="">Tennis</option>' +
					  '<!-- <option value="">generate list of teams</option> -->' +
					'</select><br>' +
				'<label for="request">Request Feedback: </label><input type="checkbox" name="request" id="request"/><br>' +
				'<input type="submit" value="Save and Share"/>' +
			'</form>' +
		'</div>'
	return dialog;
}


function addEvent(popoverObj) {
	var date = $('#startDate').val();
	var startTime = $('#startTime').val();
	var startDateTime = new Date(date+' '+startTime);
	var endTime = $('#endTime').val();

	var event = {
		title: $('#name').val(),
		start: startDateTime.toISOString(),
	}
	$('#calendar').fullCalendar('renderEvent', event);
	$(popoverObj).css({'display':'none'});
	popover.remove();
}

function showAddEventPopover(parentObj) {
	var parent = parentObj;
	var id = parent.attr('id') + '-popover';
	parent.after('<div id="' + id + '" class="fc-popover">' +
    					'<div class="fc-header fc-widget-header"> <span class="fc-close fc-icon fc-icon-x"></span><span class="fc-title">Add Event</span><div class="fc-clear"></div>'
    					+ '</div>'
    					+ '<div class="fc-body fc-widget-content"><div class="fc-content">' + addEventDialog(id) +'</div>'
    					+ '</div>'
    				+ '</div>');
	var popover = $('#'+id);
	var top = parent.position().top + parent.outerHeight();

	popover.css({'display':'block', 'top':top, 'z-index':'1000'});

	popover.on('click', '.fc-close', function() {
		popover.css({'display':'none'});
		popover.remove();
	});

	$(function() {
		$( "#startDate" ).datepicker();	
		$( "#endDate" ).datepicker();			
	});

	$('#startTime').on('click input propertychange paste', function() {
	    if ($('#endTime').val() === '') {
	    	$('#endTime').val($('#startTime').val());
	    }
	});

	$('#startDate').on('click input propertychange paste', function() {
	    if ($('#endDate').val() === '') {
	    	//TODO: this still doesn't work
	    	console.log($('#endDate').val());
	    	$('#endDate').val($('#startDate').val());
	    }
	});
	// $(document).on('mousedown', 'documentMousedown');


	// function documentMousedown(e) {
	// 	if ($("#addEvent-popover") && !$(e.target).closest($("#addEvent-popover")).length) {
	// 		$("#addEvent-popover").css({'display':'none'});
	// 		$(document).off('mousedown', 'documentMousedown');

	// 	}
	// }

}