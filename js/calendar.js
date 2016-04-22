$(document).ready(function() {
	function resizeCalendar() {
        var currentView = $('#calendar').fullCalendar('getView');
        if(currentView.name === 'agendaWeek' || currentView.name === 'agendaDay') {
            currentView.setHeight(9999);
        }
        $('#calendar').fullCalendar('option', 'height', $('#calendar_container').outerHeight()*0.94);
    }
    $(window).on('resize', resizeCalendar);

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

        eventClick: function(event) {

        	if (event.url) return false; // don't allow redirection to source website of events
        	// TODO: call eventClick function here to show summary of event details and to edit the event
        	// this.bindPopup('<button class="trigger">Say hi</button>');
        },

        dayClick: function(event) {
        	var currentView = $('#calendar').fullCalendar('getView');
	        if(currentView.name === 'month') {
	            $('#calendar').fullCalendar('changeView', 'agendaWeek');
	        } else if(currentView.name === 'agendaWeek') {
	            $('#calendar').fullCalendar('changeView', 'agendaDay');
	        }
        	$('#calendar').fullCalendar('gotoDate', event);
        	// showAddEventPopover($(this));
        },

        selectable: true,
        // selectHelper: true,
        select: function(start, end, jsEvent, view) {
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
        	},

		],

        customButtons: {
        	addEvent: {
        		id: 'test',
            	text: 'Add Event',
            	click: function(e) {
					showAddEventPopover($(this),$(this));

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


});