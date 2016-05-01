function setFormFields(start, end, view) {
    // need to refresh for min and max start and end dates
    $('#startDate').datepicker( "refresh" );
    $('#endDate').datepicker( "refresh" );
    $('#startDate').datepicker( "setDate", start.format('LL') ); // LL gives the format MonthFullName D, YYYY
    $('#endDate').datepicker( "setDate", end.format('LL') );

    $('#startTime').val(start.format('HH:mm')); //military time (needed format for value input)
    $('#endTime').val(end.format('HH:mm'));
}

function addEventModal(start, end, view){

    $('.tooltip').hide();
    setFormFields(start, end, view);

	$('#event_modal').modal('show');
    $('#name').focus();

	$('#event_day_timeline').fullCalendar({

    	height: $('.addEvent-dialog').outerHeight(),
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

        // customButtons: {
        //     selectDate: {
        //         id: 'selectDate',
        //         text: '',
        //         click: function(e) {
        //             // showAddEventPopover($(this),$(this));
        //             // var currentView = $('#calendar').fullCalendar('getView');
        //             // var start = $('#calendar').fullCalendar('getDate');
        //             // $('#delete').css({'visibility':'hidden'});
        //             // addEventModal(start, start.clone().add(1, 'h'), currentView);
        //             return false;
        //         },
        //         // themeIcon: 'calendar'
        //     }
        // },
        // theme: 'true'
        
    });
    // $('.fc-selectDate-button').append('<input type="text" id="event_details_date"/>');
    // $('#event_details_date').datepicker();
    // $(function() {$('#event_details_date').datepicker({
            // dateFormat: "MM d, yy",}).datepicker('setDate', $('#event_day_timeline').fullCalendar('getDate').format('LL'));});
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
            dateFormat: "MM d, yy",
            onClose: function( selectedDate ) {
                $( "#endDate" ).datepicker( "option", "minDate", selectedDate );
                if ($( "#endDate" ).val() === $( "#startDate" ).val()) {
                    $('#endTime')[0].min = $('#startTime').val();
                    $('#startTime')[0].max = $('#endTime').val();
                }
                $('#startTime').focus();
            }
        }).datepicker('setDate', moment().format('LL'));

        $('#endDate').datepicker({
            dateFormat: "MM d, yy",
            onClose: function( selectedDate ) {
                // don't set maxDate for startDate too...bad for usability
                // $( "#startDate" ).datepicker( "option", "maxDate", selectedDate );
                if ($( "#endDate" ).val() === $( "#startDate" ).val()) {
                    $('#endTime')[0].min = $('#startTime').val();
                    $('#startTime')[0].max = $('#endTime').val();
                }
                $('#endTime').focus();
            }
        }).datepicker('setDate', moment().format('LL'));
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

function updateEvent(eventId) {
    var event = $('#calendar').fullCalendar('clientEvents', eventId)[0];

    var startDate = $('#startDate').val();
    var startTime = $('#startTime').val();
    var startDateTime = new Date(startDate+' '+startTime);
    sessionStorage.setItem('lastTime', startTime);

    var endDate = $('#endDate').val();
    var endTime = $('#endTime').val();
    var endDateTime = new Date(endDate+' '+endTime);

    event.title = $('#name').val();
    event.location = $('#location').val();
    event.start = startDateTime.toISOString();
    event.end = endDateTime.toISOString();

    $('#calendar').fullCalendar('updateEvent', event);
    $('#event_modal').modal('hide');
}

function addDeleteEvent(eventId) {
    function deleteEvent() {
        $('#calendar').fullCalendar( 'removeEvents', eventId );
    }
    $('#delete').click(deleteEvent);
}


function addEvent(objectId) {
	var startDate = $('#startDate').val();
	var startTime = $('#startTime').val();
	var startDateTime = new Date(startDate+' '+startTime);
    sessionStorage.setItem('lastTime', startTime);

	var endDate = $('#endDate').val();
	var endTime = $('#endTime').val();
	var endDateTime = new Date(endDate+' '+endTime);

    var eventNum = $('#calendar').fullCalendar('clientEvents').length + 1;

	var event = {
		title: $('#name').val(),
		start: startDateTime.toISOString(),
		end: endDateTime.toISOString(),
        id: 'event'+eventNum
	}
	$('#calendar').fullCalendar('renderEvent', event, true);
	$('#'+objectId).css({'display':'none'});

    $('#event_modal').modal('hide');
	// if (objectId !== 'addEvent-button-popover') popover.remove();
}

