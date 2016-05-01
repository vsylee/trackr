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
        $('#repeat').change(function (){
            if (this.checked) {
                $('#repeatUntilDate').prop('required',true);
                $('#repeatUntilDate').focus();
                $('.days-of-week label').css({'cursor':'pointer'});
                $('.days-of-week-group').css({'display':'block'});

                var startDayOfWeek = moment(new Date($('#startDate').val())).day();
                $('#day'+startDayOfWeek).prop('checked', true);
            } else {
                $('#repeatUntilDate').prop('required',false);
                $('#repeatUntilDate').val('');
                $('.days-of-week label').css({'cursor':'not-allowed'});
                $('.days-of-week-group').css({'display':'none'});
                //TODO: uncheck all days of week
                $('.days-of-week input').prop('checked', false);
            }
        })
        $('#repeatUntilDate').datepicker({
            // TODO: minDate is startDate
            dateFormat: "MM d, yy",
            onSelect: function() {
                $('#repeat').prop('checked', true);
                $('.days-of-week label').css({'cursor':'pointer'});
                $('.days-of-week-group').css({'display':'block'});
            },
            onClose: function(selectedDate) {
                var momentDate = moment(new Date(selectedDate));
                if (!selectedDate || momentDate.isValid()) {
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
                // TODO: set minDate of startDate
                // TODO: uncheck all days of week, check selectedDay
                var momentDate = moment(new Date(selectedDate));
                if (selectedDate || momentDate.isValid()) {
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
                if (selectedDate || moment(new Date(selectedDate)).isValid()) {
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
    if ($('#repeat').prop('checked')) {
        var dow = [];
        $('.days-of-week input:checked').each(function() {
            dow.push(parseInt($(this).attr('name')));
        });
        var eventClass = $('#calendar').fullCalendar('clientEvents', eventId)[0].className;
        updateRepeatingEvents($('#repeatUntilDate').val(), dow, eventClass);
    } else {
        var event = $('#calendar').fullCalendar('clientEvents', eventId)[0];
        event = formToEventDetails(event);  

        $('#calendar').fullCalendar('updateEvent', event);
    }

    $('#event_modal').modal('hide');
}

/**
* Adds the event from the event details form to the calendar.
* Closes the modal.
*/
function addEvent() {
    if ($('#repeat').prop('checked')) {
        var dow = [];
        $('.days-of-week input:checked').each(function() {
            dow.push(parseInt($(this).attr('name')));
        });
        createRepeatingEvents($('#repeatUntilDate').val(), dow);
    } else {
    	var event = {};
        event = formToEventDetails(event);
    	$('#calendar').fullCalendar('renderEvent', event, true);
    }

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
    event.repeat = $('#repeat').prop('checked');

    if (!event.id) {
        var eventNum = $('#calendar').fullCalendar('clientEvents').length + 1;
        event.id ='event'+eventNum;
    }

    return event;
}

/**
* Creates an event that repeats until lastDate
* on the days of the week in dow (each day of the week is represented by 0-7 from Sunday to Saturday).
* Other events details are obtained from the existing inputs in the form in the event details modal,
* including the startDate.
*/
function createRepeatingEvents(lastDate, dow) {
    var end = moment(new Date(lastDate)).add(1,'d');   
    var eventIndex = $('#calendar').fullCalendar('clientEvents').length + 1;

    var event = {};
    event = formToEventDetails(event);
    var eventLength = moment(event.end).diff(moment(event.start)); // in milliseconds (swapping end with start will negate answer)
    var eventDate = moment(event.start).clone();
    var className = 'repeat'+Math.floor((Math.random() * 1000000) + 1); //random repeat group number from 1 to 1,000,000
    while ($('.'+className).length > 0) {
        className = 'repeat'+Math.floor((Math.random() * 1000000) + 1);
    }

    while (eventDate < end) {
        if (dow.includes(eventDate.day()))  { // constraint for days of week (dow) of events
            event.id = 'event'+eventIndex;
            event.start = eventDate.clone();
            event.end = moment(event.start).add(eventLength, 'ms');
            event.dowCustom = dow;
            event.repeatUntilDate = end;
            event.className = className;

            $('#calendar').fullCalendar('renderEvent', event, true);
        }
        eventDate.add(1,'d');
        eventIndex++;
    }
}

function updateRepeatingEvents(lastDate, dow, eventClass) {
    var end = moment(new Date(lastDate)).add(1,'d');

    var eventsInRepeat = $('#calendar').fullCalendar('clientEvents', function(event) {
        return eventClass.length > 0 && event.className.includes(eventClass[0]);
    });

    $.each(eventsInRepeat, function(index, event) {
        event = formToEventDetails(event);  
        $('#calendar').fullCalendar('updateEvent', event);
    });
    // console.log(eventsInRepeat);
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
            $('#repeat-text').text('Repeat until:');
            break;
        case 'update':
            $('#delete').css({'visibility':'visible'});
            $('#add_event').attr('action','javascript:updateEvent(\''+eventId+'\');');
            $('#save_submit').text('Save Changes');
            $('#repeat-text').text('Change until:');
            // adds delete event to onclick of delete button
            addDeleteEvent(eventId);
            break;
        default:
            $('#delete').css({'visibility':'hidden'});
            $('#add_event').attr('action','javascript:addEvent(\'event_details\');');
            $('#save_submit').text('Add Event');
            $('#repeat-text').text('Repeat until:');
    }
}
