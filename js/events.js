/**
* Creates a tooltip to display more event details of event in the calendar with calendarId.
* Event detials include time, full event name, and location if it exists.
*/
function createTooltip(event, element, calendarId) {
    var allDay= event;
    var startDay = event.start.day();
    var endDay = event.end.day();

    var moreThanADay = startDay !== endDay;
    
    var time = event.allDay || moreThanADay ? '' : event.start.format("h:mm A") + ' - ' + event.end.format("h:mm A") + '<br>';
    var location = event.location ? '<br>' + event.location : '';

    $(element).attr("data-html", "true"); //allow parsing of newline <br> in tooltip

    $(element).tooltip({
        title: time + event.title + location,
        container: "#"+calendarId,
        delay: { show: 100, hide: 100 },
        trigger : 'hover'
    });
}

/**
* Helper function for modal setup.
* Sets the form fields with start and end dates and times based on start, end, and view.
*/
function setFormFields(start, end, view) {
    // need to refresh for min and max start and end dates
    $('#startDate').datepicker( "refresh" );
    $('#endDate').datepicker( "refresh" );
    $('#startDate').datepicker( "setDate", start.format('LL') ); // LL gives the format MonthFullName D, YYYY
    $('#endDate').datepicker( "setDate", end.format('LL') );

    $('#startTime').val(start.format('HH:mm')); //military time (needed format for value input)
    $('#endTime').val(end.format('HH:mm'));
}

/**
* Initializes and shows the Event Details modal.
*/
function addEventModal(start, end, view){

    $('.tooltip').hide();
    setFormFields(start, end, view);

	$('#event_modal').modal('show');
    // put focus on event name input
    $('#name').focus();

/***************************************************
**** 
****       Initialize fullCalendar for modal
****
****************************************************/
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
            createTooltip(event, element, 'event_day_timeline');
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
        
    });

    $('#event_day_timeline').fullCalendar('gotoDate', start);

}

/**
* Sets startDate and endDate to have jQuery datepickers
* endDate has a minimum date of startDate
* endTime has a minimum time of startTime
*
* Puts focus on startTime when startDate datepicker closes and the same for endTime
*/
function customDateTime() {    
    $(function() {
        $('#repeatUntilDate').datepicker({
            dateFormat: "MM d, yy",
            onSelect: function() {
                $('#repeat').prop('checked', true);
            },
            onClose: function(selectedDate) {
                var momentDate = moment(new Date(selectedDate));
                if (momentDate.isValid()) {
                    if (!selectedDate) {
                        $('#repeat').prop('checked', false);
                    }
                } else {
                    $("#repeat-group").addClass('has-error');
                }
            }
        })

        $( "#startDate" ).datepicker({
            dateFormat: "MM d, yy",
            onClose: function( selectedDate ) {
                var momentDate = moment(new Date(selectedDate));
                if (momentDate.isValid()) {
                    $( "#endDate" ).datepicker( "option", "minDate", selectedDate );
                    if ($( "#endDate" ).val() === $( "#startDate" ).val()) {
                        $('#endTime')[0].min = $('#startTime').val();
                        $('#startTime')[0].max = $('#endTime').val();
                    }
                    $('#startTime').focus();
                } else {
                    $("#start-group").addClass('has-error');
                }
                
            }
        }).datepicker('setDate', moment().format('LL'));

        $('#endDate').datepicker({
            dateFormat: "MM d, yy",
            onClose: function( selectedDate ) {
                // don't set maxDate for startDate too...bad for usability
                // $( "#startDate" ).datepicker( "option", "maxDate", selectedDate );
                if (moment(new Date(selectedDate)).isValid()) {
                    if ($( "#endDate" ).val() === $( "#startDate" ).val()) {
                        $('#endTime')[0].min = $('#startTime').val();
                        $('#startTime')[0].max = $('#endTime').val();
                    }
                    $('#endTime').focus();
                } else {
                    $("#end-group").addClass('has-error');
                }
            }
        }).datepicker('setDate', moment().format('LL'));
    });

    $('#startTime').on('focusout', function() {        
        if ($('#endTime').val() === '' && $('#startTime').val() !== '') {
            $('#endTime').val($('#startTime').val())[0].stepUp(60);
        }

        if ($( "#endDate" ).val() === $( "#startDate" ).val()) {
            $('#endTime')[0].min = $('#startTime').val();
        }
    });
}

/**
* Updates the event on the calendar based on the event details form.
* Closes the modal.
*/
function updateEvent(eventId) {
    var event = $('#calendar').fullCalendar('clientEvents', eventId)[0];
    event = formToEventDetails(event);    

    $('#calendar').fullCalendar('updateEvent', event);
    $('#event_modal').modal('hide');
}

/**
* Adds the event from the event details form to the calendar.
* Closes the modal.
*/
function addEvent() {
	var event = {};
    event = formToEventDetails(event);

	$('#calendar').fullCalendar('renderEvent', event, true);

    $('#event_modal').modal('hide');
}

/**
* Transfers event details form details to event.
* Returns mutated event with updated details.
*/
function formToEventDetails(event) {
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
    event.shareWith = $('#shareWith').val();
    event.feedback = $('#request').prop('checked');

    if (!event.id) {
        var eventNum = $('#calendar').fullCalendar('clientEvents').length + 1;
        event.id ='event'+eventNum;
    }

    return event;
}

/**
* Associates eventId to the Delete Event button.
*/
function addDeleteEvent(eventId) {
    function deleteEvent() {
        $('#calendar').fullCalendar( 'removeEvents', eventId );
    }
    $('#delete').click(deleteEvent);
}

/**
* Sets the Event Details modal based on state which can be 'add' or 'update'.
* Makes Add Event or Save Changes button.
* Makes Delete Event button visible or not.
* If it is visible, associate event to be deleted when it is clicked.
*/
function setModalState(state,eventId) {
    switch (state) {
        case 'add':
            $('#delete').css({'visibility':'hidden'});
            $('#add_event').attr('action','javascript:addEvent(\'event_details\');');
            $('#save_submit').text('Add Event');
            break;
        case 'update':
            $('#delete').css({'visibility':'visible'});
            $('#add_event').attr('action','javascript:updateEvent(\''+eventId+'\');');
            $('#save_submit').text('Save Changes');
            // adds delete event to onclick of delete button
            addDeleteEvent(eventId);
            break;
        default:
            $('#delete').css({'visibility':'hidden'});
            $('#add_event').attr('action','javascript:addEvent(\'event_details\');');
            $('#save_submit').text('Add Event');
    }
}
