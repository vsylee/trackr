function addEventDialog(popoverId) {
	var dialog =
		'<div class="addEvent-dialog" id="addEvent-dialog-text">' +
			'<form id="add_event" action="javascript:addEvent(\'' + popoverId + '\');" class="form-horizontal">' +
				'<label for="name" class="control-label">Event Name: </label><input type="text" class="form-control" name="name" id="name" required autofocus=true/>' +
                '<div class="form-group"><div class="row"><label for="startDate" class="control-label col-xs-6 col-sm-6 col-md-6 col-lg-6"">Start Date:</label><label for="startTime" class="control-label col-xs-6 col-sm-6 col-md-6 col-lg-6">Start Time:</label></div>' +
                '<div class="row time-group"><input type="text" class="form-control col-xs-6 col-sm-6 col-md-6 col-lg-6" name="date" id="startDate" required/><input type="time" class="form-control col-xs-6 col-sm-6 col-md-6 col-lg-6 time" name="time" id="startTime" required/></div></div>' +
                '<div class="form-group"><div class="row"><label for="endDate" class="control-label col-xs-6 col-sm-6 col-md-6 col-lg-6"">End Date:</label><label for="endTime" class="control-label col-xs-6 col-sm-6 col-md-6 col-lg-6">End Time:</label></div>' +
                '<div class="row time-group"><input type="text" class="form-control col-xs-6 col-sm-6 col-md-6 col-lg-6" name="date" id="endDate"/><input type="time" class="form-control col-xs-6 col-sm-6 col-md-6 col-lg-6 time" name="time" id="endTime"/></div></div>' +
				// '<div class="form-group"><label for="startDate">Start Date: </label><input type="text" name="date" id="startDate" required/></div>' +
				// '<div class="form-group"><label for="startTime">Time: </label><input type="time" name="startTime" id="startTime" required/><input type="time" name="endTime" id="endTime"/></div>' +
				// '<div class="form-group"><label for="endDate" class="control-label">End Date and Time: </label><input type="datetime-local" class="form-control" name="date" id="endDate"/></div>' + 
				// '<label for="endTime">End Time: </label></div>' +
				'<div class="form-group"><label for="location" class="control-label">Location: </label><input type="text" class="form-control" name="location" id="location"/></div>' +
				'<div class="form-group"><label for="share" class="select-label control-label">Share with: </label>' +
					'<select class="form-control" name="teams" value:"Select Team/s">' +
						'<option value="">Gymnastics</option>' +
						'<option value="">Soccer</option>' +
						'<option value="">Tennis</option>' +
					  '<!-- <option value="">generate list of teams</option> -->' +
					'</select></div>' +
				'<div class="checkbox form-group"><label for="request" class="control-label"><input type="checkbox" name="request" id="request"/>Request Feedback</label></div>' +
				'<input type="submit" value="Save and Share" id="event_submit" style="display: none;">' +
			'</form>' +
		'</div>'
	return dialog;
}

function setFormFields(start, end, view) {
    $('#startDate').datepicker( "setDate", start.format('L') ); // L gives the format MM/DD/YYYY
    $('#endDate').datepicker( "setDate", end.format('L') );

    $('#startTime').val(start.format('HH:mm')); //military time (needed format for value input)
    $('#endTime').val(end.format('HH:mm'));

    // switch(view.name) {
    //     case 'month':
    //         $('#startTime').val(sessionStorage.getItem('lastTime'));
    //         $('#endTime').val($('#startTime').val())[0].stepUp(60);
    //         break;
    //     case 'agendaWeek':
    //         var time = start.format('HH:mm:ss');
    //         $('#startTime')[0].value = time;
    //         $('#endTime').val($('#startTime').val())[0].stepUp(60);
    //         break;
    //     case 'agendaDay':
    //         var time = start.format('HH:mm:ss');
    //         $('#startTime')[0].value = time;
    //         $('#endTime').val($('#startTime').val())[0].stepUp(30);
    //         break;
    //     default:
    //         $('#startTime').val(sessionStorage.getItem('lastTime'));
    //         $('#endTime').val($('#startTime').val())[0].stepUp(60);
    //         console.log('oops');
    // }

    // $('#event_day_timeline').fullCalendar('gotoDate', date);
}

function addEventModal(start, end, view){
    setFormFields(start, end, view);

	$('#event_modal').modal('show');
	$('#event_modal :header, .modal-body, .modal-header span').css({'color': 'black'});
	$('#event_details, #event_day_timeline_container').css({'display': 'initial', 'color' : 'black'});
    $('.form-group').css({'display': 'initial', 'margin-bottom':'0'});
    $('.form-group .row').css({'padding': '0px 15px 0px 15px'});
    $('.row .control-label').css({'padding':'0px', 'text-align':'left'});
    $('.control-label').css({'font-size': '15px'});
    $('.checkbox .control-label').css({'padding':'0px 15px 0px 15px'});
    $('.time-group .time').css({'float':'right'});
    $('.time-group .form-control').css({'width':'50%'});

    // $('.form-group .select-label').css({'margin-right': '5px'});
    $('.modal-footer').css({'padding-bottom': '0px'})
    $('#event_modal').css({'line-height': '1'});

	$('#event_day_timeline').fullCalendar({

    	height: $('.addEvent-dialog').outerHeight(),
    	// viewDisplay: resizeCalendar,
    	timezone: 'local',
    	fixedWeekCount: false, // makes calendar just display the weeks in that month

        header:  {
        	left: 'prev',
        	center: 'title',
        	right: 'next'
        },

        eventRender: function(event, element) {
            var allDay= event;
            var startDay = event.start.day();
            var endDay = event.end.day();

            var moreThanADay = startDay !== endDay;
            
            var time = event.allDay || moreThanADay ? '' : event.start.format("h:mm A") + ' - ' + event.end.format("h:mm A") + '<br>';
            var location = event.location ? '<br>' + event.location : '';

            $(element).attr("data-html", "true"); //allow parsing of newline <br> in tooltip

            $(element).tooltip({
                title: time + event.title + location,
                container: "#event_day_timeline"});
        },

        eventClick: function(event) {

        	if (event.url) return false; // don't allow redirection to source website of events
        	// TODO: call eventClick function here to show summary of event details and to edit the event
        	// this.bindPopup('<button class="trigger">Say hi</button>');
        },

		eventLimit: true, //more link shows up when there are too many events

        googleCalendarApiKey: 'AIzaSyCX_A2rKiGZ4wo6LXNyJZ7WCK64SSqVSqU',
        eventSources: [
            	{
            		editable: true,
            		googleCalendarId: 'mfj0nf3n8jfn92mklam206a4nk@group.calendar.google.com', //MIT calendar
            	},
        ],

        events: [
        	{
        		title: 'Practice',
        		className: 'soccer practice',
        		start: practiceData['start'],
        		end: practiceData['end'],
        		dow: practiceData['dow'],
                location: 'Briggs Field',
        	},

		],

		defaultView: 'agendaDay',
        
    });
    // $('#event_day_timeline').css({'width': '50%', 'margin-left':'15px', 'margin-right' : '15px'});
    $('#event_day_timeline h2').css({'font-size': '18px', 'padding-top':'5px'});
    $('#event_day_timeline .fc-day-header').css({'font-size': '14px'});
    $('#event_day_timeline').fullCalendar('gotoDate', start);
    // $('.fc-agendaDay-slots td div').css({'height': '12px'});
    // $('.fc-day-grid, .fc-row, .fc-bg, .fc-axis, .fc-day, .fc-week').css({'height': '12px'});
    // $('.fc-day-grid').css({'height':'15px'});
    // $('.fc-divider').css({'z-index': '1000'});
    // $('.fc-bg table').css({'height': '12px'});
    // $('.fc-time-grid tr').css({'height': '9px'});
    // $('#event_day_timeline .fc-day').css({'height': '10px'});

    // $('#event_day_timeline span').css({'font-size': '12px'});
}

function customDateTime() {    
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
                $( "#startDate" ).datepicker( "option", "maxDate", selectedDate );
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

        if ($( "#endDate" ).val() === $( "#startDate" ).val()) {
            console.log("hello");
            $('#endTime')[0].min = $('#startTime').val();
        }
    });
}


function addEvent(popoverObj) {
    console.log("yo");
	var startDate = $('#startDate').val();
	var startTime = $('#startTime').val();
	var startDateTime = new Date(startDate+' '+startTime);
    sessionStorage.setItem('lastTime', startTime);

	var endDate = $('#endDate').val();
	var endTime = $('#endTime').val();
	var endDateTime = new Date(endDate+' '+endTime);

	var event = {
		title: $('#name').val(),
		start: startDateTime.toISOString(),
		end: endDateTime.toISOString()
	}
	$('#calendar').fullCalendar('renderEvent', event, true);
	$('#'+popoverObj).css({'display':'none'});

    $('#event_modal').modal('hide');
	// if (popoverObj !== 'addEvent-button-popover') popover.remove();
}

function showAddEventPopover(parentObj, container) {
	// console.log("parentObj", parentObj);
	// console.log("container", container);
	// console.log(parentObj.parent().parent().parent().parent().parent()); //fc-day-grid
	// var parent = parentObj.attr('id') === undefined ? $('#calendar') : parentObj;
	// parent = $('#addEvent-button');
	// console.log(parentObj);
	var parent = parentObj;
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

	popover.css({'display':'block', 'top':top, 'left':left, 'z-index':'100000'});

	popover.on('click', '.fc-close', function() {
		popover.css({'display':'none'});
		if (id !== 'addEvent-button-popover') {
			popover.remove();
		}
	}).draggable();

    customDateTime();

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