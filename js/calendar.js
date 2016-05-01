$(document).ready(function() {
    // setting jquery datepicker for form start and end dates
    // setting max and min date and time for form depending on start and end dates and times
    customDateTime();
    sessionStorage.setItem('lastTime', '10:00'); //default value for startTime

    // initialize event details modal so that when it closes, the contents in the form will resest
    $('#event_modal').on('hidden.bs.modal', function() {
        $('#add_event')[0].reset();
    });

    // before navigating away from the page, get events and update storeEvents
    window.onbeforeunload = function(event) {
        // code adapted from http://jsfiddle.net/100thGear/v6tSd/
        var calendarEvents = $('#calendar').fullCalendar('clientEvents');
        var eventsCopy = [];
        // make a copy of calendar events because it's a circular object and can't be stringified by JSON
        $.each(calendarEvents, function(index, value) {
            if (!value.url) { // if the event is not from an event source like Google calendar
                var event = new Object();
                event.id = value.id;
                event.start = value.start;
                event.end = value.end;
                event.title = value.title;
                event.allDay = value.allDay;
                event.className = value.className;
                event.editable = value.editable;
                event.feedback = value.feedback;
                event.shareWith = value.shareWith;
                event.location = value.location;
                eventsCopy.push(event);
            }
        })
        
        storedEvents = JSON.stringify(eventsCopy);
        return null; // don't display alert
    }

    // make sure calendar resizes if window resizes
	function resizeCalendar() {
        var currentView = $('#calendar').fullCalendar('getView');
        if(currentView.name === 'agendaWeek' || currentView.name === 'agendaDay') {
            currentView.setHeight(9999);
        }
        $('#calendar').fullCalendar('option', 'height', $('#calendar_container').outerHeight()*0.94);
    }
    $(window).on('resize', resizeCalendar);

/***********************************************
**** 
****            Initialize fullCalendar
****
************************************************/
    $('#calendar').fullCalendar({
    	height: $('#calendar_container').outerHeight()*0.94,
    	viewDisplay: resizeCalendar,
    	timezone: "local",
    	fixedWeekCount: false, // makes calendar just display the weeks in that month

        header:  {
        	left: 'prev,today,next',
        	center: 'title',
        	right: 'addEvent month,agendaWeek,agendaDay'
        },

        eventRender: function(event, element) {
            // create tooltip to show event details on hover
            var allDay= event;
            var startDay = event.start.day();
            var endDay = event.end.day();

            var moreThanADay = startDay !== endDay;
            
            var time = event.allDay || moreThanADay ? '' : event.start.format("h:mm A") + ' - ' + event.end.format("h:mm A") + '<br>';
            var location = event.location ? '<br>' + event.location : '';
            $(element).attr("data-html", "true"); //allow parsing of newline <br> in tooltip

            $(element).tooltip({
                title: time + event.title + location,
                container: "#calendar",
                delay: { show: 100, hide: 100 },
                trigger : 'hover'
            });
        },

        eventClick: function(event) {
            // only show modal for editable events (those without a url)
            if (!event.url) { 
                $('#name').val(event.title);
                $('#location').val(event.location);

                setModalState('update');
                // adds delete event to onclick of delete button
                addDeleteEvent(event.id);
                addEventModal(event.start, event.end);
            }
            // return false so that clicking on the events doesn't take user to the url (i.e. Google calendar)
            return false;
        },

        dayClick: function(date) {
        	var currentView = $('#calendar').fullCalendar('getView');
            var end;

            // set default event length based on the view
            switch (currentView.name) {
                case 'month':
                    end = date.add(1, 'h');
                    break;
                case 'agendaWeek':
                    end = date.add(30, 'm');
                    break;
                case 'agendaDay':
                    end = date.add(30, 'm');
                    break;
                default:
                    end = date.add(1, 'h');
            }

            setModalState('add');
            addEventModal(date, end, currentView);
        },

        selectable: true,
        // selectHelper: true,
        select: function(start, end, jsEvent, view) {
            
            var realEnd = view.name==='month' ? start.clone().add(1,'h') : end;
            setModalState('add');
            addEventModal(start, realEnd, view);

			$('#calendar').fullCalendar('unselect');
		},

		editable: true, //for drag and drop
		eventLimit: true, //more link shows up when there are too many events

        googleCalendarApiKey: 'AIzaSyCX_A2rKiGZ4wo6LXNyJZ7WCK64SSqVSqU',
        eventSources: [
            	{
                    // not editable
            		googleCalendarId: 'mfj0nf3n8jfn92mklam206a4nk@group.calendar.google.com', //MIT calendar
            	},

        ],

        customButtons: {
        	addEvent: {
            	text: 'Add Event',
            	click: function(e) {
                    var currentView = $('#calendar').fullCalendar('getView');
                    var start = $('#calendar').fullCalendar('getDate');

                    setModalState('add');
                    addEventModal(start, start.clone().add(1, 'h'), currentView);

					return false;
	            }
	        }
        }
        
    });

    // import storedEvents from events.json to calendar
    for (var eventIndex in storedEvents) {
        var eventData = storedEvents[eventIndex];
        $('#calendar').fullCalendar('renderEvent', eventData, true);
    }

    // add an id for Add Event button in calendar
    $(".fc-addEvent-button").attr('id', 'addEvent-button');

});

function setModalState(state) {
    switch (state) {
        case 'add':
            $('#delete').css({'visibility':'hidden'});
            $('#add_event').attr('action','javascript:addEvent(\'event_details\');');
            $('#save_submit').text('Add Event');
            break;
        case 'update':
            $('#delete').css({'visibility':'visible'});
            $('#add_event').attr('action','javascript:updateEvent(\''+event.id+'\');');
            $('#save_submit').text('Save Changes');
            break;
        default:
            $('#delete').css({'visibility':'hidden'});
            $('#add_event').attr('action','javascript:addEvent(\'event_details\');');
            $('#save_submit').text('Add Event');
    }
}