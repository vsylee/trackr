/**
* Creates a tooltip to display more event details of event in the calendar with calendarId.
* Event detials include time, full event name, and location if it exists.
*/
function createTooltip(event, element, calendarId) {
    try {
        var moreThanADay = event.end.diff(event.start, 'd') >= 1;
        
        var time = event.allDay || moreThanADay ? '' : event.start.format("h:mm A") + ' - ' + event.end.format("h:mm A") + '<br>';
        if (event.allDay) {
            time = '';
        } else if (moreThanADay) {
            time = event.start.format("MMM D, h:mm A") + ' - ' + event.end.format("MMM D, h:mm A") + '<br>';
        } else {
            time = event.start.format("h:mm A") + ' - ' + event.end.format("h:mm A") + '<br>';
        }
        var location = event.location ? '<br>' + event.location : '';

        $(element).attr("data-html", "true"); //allow parsing of newline <br> in tooltip

        $(element).tooltip({
            title: time + event.title + location,
            container: "#"+calendarId,
            delay: { show: 100, hide: 100 },
            trigger : 'hover'
        });
    } catch (err) {
        console.log(event);
    }
}

/**
* Helper function for modal setup.
* Sets the form fields with start and end dates and times based on start, end, and view.
*/
function setFormFields(start, end, view) {
    $('#startDate').datepicker( "setDate", start.format('LL') ); // LL gives the format MonthFullName D, YYYY
    $('#endDate').datepicker( "setDate", end.format('LL') );
    $( "#endDate" ).datepicker( "option", "minDate", $('#startDate').datepicker('getDate') );

    $('#startTime').val(start.format('HH:mm')); //military time (needed format for value input)
    $('#endTime').val(end.format('HH:mm'));
    if ($('#startDate').val() === $('#endDate').val()) {
        $('#endTime')[0].min = $('#startTime').val();
    }
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

        events: $('#calendar').fullCalendar('clientEvents'),

		defaultView: 'agendaDay',
        
    });

    $('#event_day_timeline').fullCalendar('refetchEvents');
    $('#event_day_timeline').fullCalendar('gotoDate', start);
    $('#event_day_timeline').fullCalendar('option', 'height', $('.addEvent-dialog').outerHeight());

}

/**
* Sets repeatUntilDate, startDate and endDate to have jQuery datepickers
* endDate and repeatUntilDate have a minimum date of startDate
* endTime has a minimum time of startTime
*
* Puts focus on startTime when startDate datepicker closes and the same for endTime
*
* Sets behavior for repeat and change checkboxes.
*/
function customDateTime() {    
    $(function() {
        $('#repeat').change(function (){
            if (this.checked) {
                $('#repeatUntilDate').prop('required',true);
                var startDayOfWeek = moment(new Date($('#startDate').val())).day();
                $('#day'+startDayOfWeek).prop('checked', true);
            } else {
                $('#repeatUntilDate').prop('required',false);
                $('#repeatUntilDate').val('');
                // uncheck all days of week
                $('.days-of-week input').prop('checked', false);
            }
        })

        $('.days-of-week input').change(function () {
            if (this.checked) {
                $('#repeat').prop('checked', true);
                // fires repeat checkbox change event to handle constraints of repeatUntilDate
            }
        });

        $('#change').change(function () {
            if (this.checked) {
                $('#delete').text('Delete All');
            } else {
                $('#delete').text('Delete Event');
            }
        })

        $('#repeatUntilDate').datepicker({
            dateFormat: "MM d, yy",
            onSelect: function() {
                $('#repeat').prop('checked', true);
                // $('.days-of-week label').css({'cursor':'pointer'});
                // $('.days-of-week-group').css({'display':'block'});
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
        });

        $( "#startDate" ).datepicker({
            dateFormat: "MM d, yy",
            onClose: function( selectedDate ) {
                var momentDate = moment(new Date(selectedDate));
                if (selectedDate || momentDate.isValid()) {
                    $( "#repeatUntilDate" ).datepicker( "option", "minDate", selectedDate );
                    $( "#endDate" ).datepicker( "option", "minDate", selectedDate );
                    if ($( "#endDate" ).val() === $( "#startDate" ).val()) {
                        $('#endTime')[0].min = $('#startTime').val();
                        // $('#startTime')[0].max = $('#endTime').val();
                    } else {
                        $('#endTime')[0].min = '';
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
                        // $('#startTime')[0].max = $('#endTime').val();
                    } else {
                        $('#endTime')[0].min = '';
                    }
                    $('#endTime').focus();
                } else {
                    $("#end-group").addClass('has-error');
                }
            }
        }).datepicker('setDate', moment().format('LL'));
    });

    $('#startTime').on('focusout', function() {        
        if ($('#endTime').val() && !$('#startTime').val()) {
            $('#endTime').val($('#startTime').val())[0].stepUp(60);
        }
        // make sure start and end date aren't both blank, then check if they're equal
        if ($( "#endDate" ).val() && $( "#startDate" ).val() && $( "#endDate" ).val() === $( "#startDate" ).val()) {
            $('#endTime')[0].min = $('#startTime').val();
        } else {
            $('#endTime')[0].min = '';
        }
    });
}

/**
* Updates the event on the calendar based on the event details form.
* Closes the modal.
*/
function updateEvent(eventId) {
    if ($('#change').prop('checked')) {
        updateRepeatingEvents(eventId);
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

    if (!event.id) { // means event is new
        var eventNum = $('#calendar').fullCalendar('clientEvents').length + 1;
        event.id ='event'+eventNum;
        event.repeat = $('#repeat').prop('checked');
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
            event.start = eventDate.clone().toISOString();
            event.end = moment(event.start).add(eventLength, 'ms').toISOString();
            event.dowCustom = dow;
            event.repeatUntilDate = end;
            event.className = className;

            $('#calendar').fullCalendar('renderEvent', event, true);
        }
        eventDate.add(1,'d');
        eventIndex++;
    }
}

function updateRepeatingEvents(eventId) {
    var originalEvent = $('#calendar').fullCalendar('clientEvents', eventId)[0]
    var eventClass = originalEvent.className[0];

    var originalStart = moment(originalEvent.start).clone();
    var originalEnd = moment(originalEvent.end).clone();

    var newEvent = formToEventDetails(originalEvent);
    var startDiff = moment(newEvent.start).diff(originalStart);
    var endDiff = moment(newEvent.end).diff(originalEnd);
    $('#calendar').fullCalendar('updateEvent', newEvent);

    var eventsInRepeat = $('#calendar').fullCalendar('clientEvents', function(event) {
        return eventClass.length > 0 && event.className.includes(eventClass);
    });

    var newClassName = 'repeat'+Math.floor((Math.random() * 1000000) + 1); //random repeat group number from 1 to 1,000,000
    while ($('.'+newClassName).length > 0) {
        newClassName = 'repeat'+Math.floor((Math.random() * 1000000) + 1);
    }

    $.each(eventsInRepeat, function(index, event) {
        var prevStart = moment(event.start).clone();
        if (prevStart > originalStart) { // don't include original event, already updated
            var prevEnd = moment(event.end).clone();

            event = formToEventDetails(event);
            event.start = prevStart.add(startDiff, 'ms').toISOString();
            event.end = prevEnd.add(endDiff, 'ms').toISOString();
            event.className = newClassName;

            $('#calendar').fullCalendar('updateEvent', event);
        }
    });
}

/**
* Associates eventId to the Delete Event button.
*/
function addDeleteEvent(eventId) {
    $('#delete').click(function() {
        if ($('#change').prop('checked')) {
            var originalEvent = $('#calendar').fullCalendar('clientEvents', eventId)[0]
            var eventClass = originalEvent.className[0];
            var originalStart = moment(originalEvent.start).clone();

            $('#calendar').fullCalendar( 'removeEvents', function(event) {
                var eventStart = moment(event.start);
                return eventStart >= originalStart && eventClass.length > 0 && event.className.includes(eventClass);
            });
        }

        $('#calendar').fullCalendar( 'removeEvents', eventId );
    });
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
            $('#gridSystemModalLabel').text('Add Event - Event Details');
            
            // repeating events + changes
            $('#repeat-change-group').css({'display':'initial'});
            $('#repeat-group').css({'display':'initial'});
            $('#change-group').css({'display':'none'});
            $('.days-of-week-group').css({'display':'block'});

            break;
        case 'update':
            $('#delete').off( "click" );
            $('#delete').text('Delete Event');
            $('#delete').css({'visibility':'visible'});
            // adds delete event to onclick of delete button
            addDeleteEvent(eventId);

            $('#add_event').attr('action','javascript:updateEvent(\''+eventId+'\');');
            $('#save_submit').text('Save Changes');
            $('#gridSystemModalLabel').text('Edit Event Details');

            // repeating events + changes
            if ($('#calendar').fullCalendar('clientEvents', eventId)[0].repeat) {
                $('#repeat-change-group').css({'display':'initial'});
                $('#change-group').css({'display':'block'});
            } else {
                $('#repeat-change-group').css({'display':'none'});
            }
            $('#repeat-group').css({'display':'none'});
            $('.days-of-week-group').css({'display':'none'});

            break;
        default:
            $('#delete').css({'visibility':'hidden'});
            $('#add_event').attr('action','javascript:addEvent(\'event_details\');');
            $('#save_submit').text('Add Event');
            $('#gridSystemModalLabel').text('Add Event - Event Details');
            
            // repeating events + changes
            $('#repeat-change-group').css({'display':'initial'});
            $('#repeat-group').css({'display':'initial'});
            $('#change-group').css({'display':'none'});
            $('.days-of-week-group').css({'display':'block'});
    }
}
