for (var gameIndex in gameData) {
    var game = gameData[gameIndex];
    eventData = {
        id: 'game'+gameIndex,
        title: 'Game vs '+game['opponent'],
        className: 'soccer game',
        start: new Date(game['date']+' '+game['startTime']).toISOString(),
        end: new Date(game['date']+' '+game['endTime']).toISOString(),
        location: game['location'],
        shareWith: 'Soccer',
        feedback: 'True'
    }
    // to add more games, get length of objects with class "game" and use length+1 as next id
    $('#calendar').fullCalendar('renderEvent', eventData, true);
}

practiceFirstDay = moment(new Date("2015/09/14"));
practiceLastDay = moment(new Date("2016/05/12"));
practiceDate = practiceFirstDay;
practiceIndex = 0;
while (practiceDate < practiceLastDay) {
    if (practiceDate.day() >= practiceData['dow'][0] && practiceDate.day() <= practiceData['dow'][practiceData['dow'].length-1])  { // constraints day of week (dow) of practice
        eventData = {
            id: 'practice'+practiceIndex,
            title: 'Practice',
            className: 'soccer practice',
            start: new Date(practiceDate.format('YYYY/MM/DD')+' '+practiceData['start']).toISOString(),
            end: new Date(practiceDate.format('YYYY/MM/DD')+' '+practiceData['end']).toISOString(),
            location: 'Briggs Field',
            shareWith: 'Soccer',
            feedback: 'True'
        }
        $('#calendar').fullCalendar('renderEvent', eventData, true);
    }
    // to add more practices, get length of objects with class "practice" and use length+1 as next id
    practiceDate.add(1,'d');
    practiceIndex++;
}