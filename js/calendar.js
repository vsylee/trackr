$(document).ready(function() {
    // initialize event details form in html (move to html file?)
    $('#event_details').append(addEventDialog('event_details'));
    // setting jquery datepicker for form start and end dates
    // setting max and min date and time for form depending on start and end dates and times
    customDateTime();
    sessionStorage.setItem('lastTime', '10:00'); //default value for startTime

    // make sure calendar resizes if window resizes
	function resizeCalendar() {
        var currentView = $('#calendar').fullCalendar('getView');
        if(currentView.name === 'agendaWeek' || currentView.name === 'agendaDay') {
            currentView.setHeight(9999);
        }
        $('#calendar').fullCalendar('option', 'height', $('#calendar_container').outerHeight()*0.94);
    }
    $(window).on('resize', resizeCalendar);

    // initialize the calendar with the following fullCalendar settings
    $('#calendar').fullCalendar({
    	height: $('#calendar_container').outerHeight()*0.94,
    	viewDisplay: resizeCalendar,
    	timezone: "local",
    	fixedWeekCount: false, // makes calendar just display the weeks in that month

        header:  {
        	left: 'prev,next today',
        	center: 'title',
        	right: 'addEvent month,agendaWeek,agendaDay'
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
                container: "#calendar"});
        },

        eventClick: function(event) {

        	if (event.url) return false; // don't allow redirection to source website of events
        	// TODO: call eventClick function here to show summary of event details and to edit the event
        	// this.bindPopup('<button class="trigger">Say hi</button>');
            console.log(event);
        },

        dayClick: function(date) {
        	var currentView = $('#calendar').fullCalendar('getView');
            var end;

            switch (currentView.name) {
                case 'month':
                    end = date.add(1, 'h');
                    break;
                case 'agendaWeek':
                    end = date.add(1, 'h');
                    break;
                case 'agendaDay':
                    end = date.add(30, 'm');
                    break;
                default:
                    end = date.add(1, 'h');
            }
            addEventModal(date, end, currentView);

	        // if(currentView.name === 'month') {
	        //     $('#calendar').fullCalendar('changeView', 'agendaWeek');
	        // } else if(currentView.name === 'agendaWeek') {
	        //     $('#calendar').fullCalendar('changeView', 'agendaDay');
	        // }
        	// $('#calendar').fullCalendar('gotoDate', event);
        	// showAddEventPopover($(this));
        },

        selectable: true,
        // selectHelper: true,
        select: function(start, end, jsEvent, view) {
            console.log(start);
            console.log(end);
            console.log(start===end);
            var realEnd = view.name==='month' ? start.clone().add(1,'h') : end;
            addEventModal(start, realEnd, view);
        	// console.log($(jsEvent.target).parent());
        	// console.log(view);
        	// console.log(this.el);
        	// console.log(this.el.get());

        	// console.log("start", start._d);
        	// console.log("end", end._d);
        	// console.log("jsEvent", jsEvent);
        	// console.log("view", view.name);

        	// showAddEventPopover($(jsEvent.target));
        	// $('#startDate').
			// var title = prompt('Event Title:');
			var id = $(jsEvent.target).position().top;
			// console.log($('#'+1));
			// console.log("id", id);
			// id = 'placeholder';
			// var eventData;
			// if ((view.name == "agendaWeek" || view.name == "agendaDay") && start._d != end._d) {
			// 	console.log("entered if statement");
			// 	eventData = {
			// 		id: id,
			// 		title: "Event Name",
			// 		start: start,
			// 		end: end,
			// 		classname: id,
			// 	};
			// 	var event = $('#calendar').fullCalendar('renderEvent', eventData, false); // stick? = true

			// 	showAddEventPopover($(jsEvent.target), $(jsEvent.target));
			// }
			$('#calendar').fullCalendar('unselect');
		},

		editable: true, //for drag and drop
		eventLimit: true, //more link shows up when there are too many events

        googleCalendarApiKey: 'AIzaSyCX_A2rKiGZ4wo6LXNyJZ7WCK64SSqVSqU',
        eventSources: [
        		// {
        		// 	editable: true,
          //   		googleCalendarId: 'cstkovtg3u9dagkkve1j60bk1c@group.calendar.google.com', //fake soccer varsity class calendar
          //   		className: "hello",
          //   		color: 'yellow'
          //   	},
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

        customButtons: {
        	addEvent: {
        		id: 'test',
            	text: 'Add Event',
            	click: function(e) {
					// showAddEventPopover($(this),$(this));
                    var currentView = $('#calendar').fullCalendar('getView');
                    var start = $('#calendar').fullCalendar('getDate');
                    console.log(start.clone().add(1, 'h'));
                    addEventModal(start, start.clone().add(1, 'h'), currentView);
					return false;
	            }
	        }
        }
        
    });

    for (var gameIndex in gameData) {
    	var game = gameData[gameIndex];
    	eventData = {
    		title: 'Game vs '+game['opponent'],
    		className: 'soccer game',
    		start: new Date(game['date']+' '+game['startTime']).toISOString(),
    		end: new Date(game['date']+' '+game['endTime']).toISOString(),
    		location: game['location'],
    	}
		$('#calendar').fullCalendar('renderEvent', eventData, true);
	}
    $(".fc-addEvent-button").attr('id', 'addEvent-button');
    $(".fc-addEvent-button").css({'background-color': '#ee9023', 'background-image': 'none', 'color': 'white'});

    // $('.modal-body').after(addEventDialog("event_modal"));

});