import json

practiceStartDate = "2015/09/02"
practiceStartTime = "17:00"
practiceEndDate = "2015-05-15"
practiceEndTime = "19:30"

dow = [1,4]

data = {'start':practiceStartTime, 'end': practiceEndTime, 'dow':dow}
print data

data2 = {}
opponentsHome = ['Framingham State University', 'Keene State College', 'Emmanuel College', 'Suffolk University', 'US Coast Guard Academy']
dates = ['2015/10/20', '2015/10/27', '2015/11/15', '2016/02/20', '2016/03/05', '2016/04/05']
opponentsAway = ['Newbury College', 'Roger Williams University', 'Emerson College', 'Babson College', 'Brandeis University', 'Springfield College']
dates2 = ['2015/11/20', '2015/11/27', '2015/12/05', '2016/03/20', '2015/10/05']

for o in xrange(len(opponentsAway)):
	data2[o] = {'opponent': opponentsAway[o], 'startTime': '17:00', 'endTime': '19:30', 'location': opponentsAway[o], 'date':dates[o]}

for o in xrange(6,len(opponentsHome)+6):
	data2[o] = {'opponent': opponentsHome[o-6], 'startTime': '17:00', 'endTime': '19:30', 'location': 'Briggs Field', 'date':dates2[o-6]}

print data2


f_out = open("data.json", "w")
f_out.write("var practiceData="+json.dumps(data) + "\nvar gameData="+json.dumps(data2))
f_out.close();
