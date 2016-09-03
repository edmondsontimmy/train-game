var config = {
    apiKey: "AIzaSyA0HodWoYlpD6n8bRchvwjytaORUb0pdLg",
    authDomain: "train-log.firebaseapp.com",
    databaseURL: "https://train-log.firebaseio.com",
    storageBucket: "train-log.appspot.com",
};
  firebase.initializeApp(config);


var database = firebase.database();







$("#addTrain").on("click", function(e) {
e.preventDefault();


	var name = $('#nameinput').val().trim();
	var destination = $('#destinationinput').val().trim();
	var time = $('#timeinput').val().trim();
	var frequency = $('#frequencyinput').val().trim();


	database.ref().push({
		name: name,
		destination: destination,
		time: time,
		frequency: frequency,
	});

	document.getElementById("trainForm").reset();
});




database.ref().on("child_added", function(childSnapshot) {
	

	$("#newTrains").prepend("<tr id='newTrain'><td id='name'> "
								+ childSnapshot.val().name +"</td><td id='destination'>" 
								+ childSnapshot.val().destination +"</td><td id='frequency'>"
								+ childSnapshot.val().frequency +"</td><td id='arriving'></td><td id='minutesAway'></td></tr>");
	

		var frequency = childSnapshot.val().frequency;

		var firstTime = childSnapshot.val().time; 

		var firstTimeConverted = moment(firstTime,"hh:mm").subtract(1, "years");

		var currentTime = moment();
		
		var diffTime = moment().diff(moment(firstTimeConverted), "minutes");
		
		var tRemainder = diffTime % frequency;
		
		var tMinutesTillTrain = frequency - tRemainder;
		
		var nextTrain = moment().add(tMinutesTillTrain, "minutes")
		

		$('#arriving').prepend(moment(nextTrain).format("hh:mm a"));
		$('#minutesAway').prepend(tMinutesTillTrain);

	

  
	

}, function(errorObject) {

	console.log("Errors handled: " + errorObject.code);
});
