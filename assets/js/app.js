// Initialize Firebase
var config = {
    apiKey: "AIzaSyD_pyV2wtzfNgaTDnkiTOeXqbqBuwmWML4",
    authDomain: "javitestproject.firebaseapp.com",
    databaseURL: "https://javitestproject.firebaseio.com",
    projectId: "javitestproject",
    storageBucket: "javitestproject.appspot.com",
    messagingSenderId: "835491184388"
  };
  firebase.initializeApp(config);

var database = firebase.database();
var currentTime = moment();

database.ref().on("child_added", function(childSnap) {

    var name = childSnap.val().name;
    var destination = childSnap.val().destination;
    var firstTrain = childSnap.val().firstTrain;
    var frequency = childSnap.val().frequency;
    var min = childSnap.val().min;
    var next = childSnap.val().next;
// will get direct "children" - items in table
    $("#trainTable > tbody").append("<tr><td>" + name + "</td><td>" + destination + "</td><td>" + frequency + "</td><td>" + next + "</td><td>" + min + "</td></tr>");
});

database.ref().on("value", function(snapshot) {
    console.log(snapshot)
   

});

//grabs information from the form
$("#addTrainBtn").on("click", function() {

    var trainName = $("#trainNameInput").val().trim();
    var destination = $("#destinationInput").val().trim();
    var firstTrain = $("#firstTrainInput").val().trim();
    var frequency = $("#frequencyInput").val().trim();

    // THE MATH!
    var firstTrainMoment = moment(firstTrain, "hh:mm")
    // the time difference between current time and the first train
    var difference = currentTime.diff(moment(firstTrainMoment), "minutes");
    var remainder = difference % frequency;
    var minUntilTrain = frequency - remainder;
    var nextTrain = moment().add(minUntilTrain, "minutes").format("hh:mm a");

    var newTrain = {
        name: trainName,
        destination: destination,
        firstTrain: firstTrain,
        frequency: frequency,
        min: minUntilTrain,
        next: nextTrain
    }

    console.log(newTrain);
    database.ref().push(newTrain);

    $("#trainNameInput").val("");
    $("#destinationInput").val("");
    $("#firstTrainInput").val("");
    $("#frequencyInput").val("");

    return false;
});
