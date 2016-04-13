function addEventDialog(popoverId) {
	var dialog =
		'<div class="addEvent-dialog" id="addEvent-dialog-text">' +
			'<form id="add_event" action="javascript:addEvent(\'' + popoverId + '\');" class="addEvent-form">' +
				'<label for="name">Event Name: </label><input type="text" name="name" id="name" required autofocus=true/><br>' +
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
				'<input type="submit" value="Save and Share">' +
			'</form>' +
		'</div>'
	return dialog;
}


function addEvent(popoverObj) {
	var startDate = $('#startDate').val();
	var startTime = $('#startTime').val();
	var startDateTime = new Date(date+' '+startTime);

	var endDate = $('#endDate').val();
	var endTime = $('#endTime').val();
	var endDateTime = new Date(date+' '+endTime);

	var event = {
		title: $('#name').val(),
		start: startDateTime.toISOString(),
		end: endDateTime.toISOString()
	}
	$('#calendar').fullCalendar('renderEvent', event);
	$('#'+popoverObj).css({'display':'none'});
	if (popoverObj !== 'addEvent-button-popover') popover.remove();
}

function showAddEventPopover(parentObj, container) {
	console.log(parentObj.parent().parent().parent().parent().parent()); //fc-day-grid
	// var parent = parentObj.attr('id') === undefined ? $('#calendar') : parentObj;
	// parent = $('#addEvent-button');
	// console.log(parentObj);
	var parent = parentObj;
	// console.log(parentObj);
	console.log(parent);
	console.log(container);
	var id = parent.attr('id') + '-popover';
	container.after('<div id="' + id + '" class="fc-popover">' +
    					'<div class="fc-header fc-widget-header"> <span class="fc-close fc-icon fc-icon-x"></span><span class="fc-title">Event Details</span><div class="fc-clear"></div>'
    					+ '</div>'
    					+ '<div class="fc-body fc-widget-content"><div class="fc-content">' + addEventDialog(id) +'</div>'
    					+ '</div>'
    				+ '</div>');
	var popover = $('#'+id);
	var top = parentObj.position().top + parent.outerHeight();
	var left = parentObj.position().left + parent.outerWidth();

	$('#name').focus();

	popover.css({'display':'block', 'top':top, 'z-index':'100000'});

	popover.on('click', '.fc-close', function() {
		popover.css({'display':'none'});
		console.log(id);
		if (id !== 'addEvent-button-popover') {
			popover.remove();
			console.log(true);
		}
		//remove popovers on calendar but not from the addEvent button for safety
	}).draggable();

	$(function() {
		$( "#startDate" ).datepicker({
			onClose: function( selectedDate ) {
        		$( "#endDate" ).datepicker( "option", "minDate", selectedDate );
        		if ($( "#endDate" ).val() === $( "#startDate" ).val()) {
        			$('#endTime')[0].min = $('#startTime').val();
        			$('#startTime')[0].max = $('#endTime').val();
        		}
      		}
  		}).datepicker('setDate', new Date());

		$('#endDate').datepicker({
			onClose: function( selectedDate ) {
        		$( "#endDate" ).datepicker( "option", "minDate", selectedDate );
        		if ($( "#endDate" ).val() === $( "#startDate" ).val()) {
        			$('#endTime')[0].min = $('#startTime').val();
        			$('#startTime')[0].max = $('#endTime').val();
        		}
      		}
      	}).datepicker('setDate', new Date());
	});

	$('#startTime').on('focusout', function() {
		
	    if ($('#endTime').val() === '' && $('#startTime').val() !== '') {
	    	$('#endTime').val($('#startTime').val())[0].stepUp(60);
	    }
	});

	$(document).on('mousedown', documentMousedown);


	function documentMousedown(e) {
		var parentClass = $(e.target).offsetParent().attr('class');
		if (parentClass === undefined || !(parentClass.startsWith('fc-popover') || parentClass.startsWith('ui-datepicker'))) {
			e.stopPropagation();
			$("#addEvent-button-popover").css({'display':'none'});
			$(document).off('mousedown', 'documentMousedown');

		}
	}

}