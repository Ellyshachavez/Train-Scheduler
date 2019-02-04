console.log("connected");

// Initialize Firebase
var config = {
    apiKey: "AIzaSyB_Hl1r2D1b6EAi6yCdpnINL-5Nyo9stuw",
    authDomain: "train-scheduler-1b07f.firebaseapp.com",
    databaseURL: "https://train-scheduler-1b07f.firebaseio.com",
    projectId: "train-scheduler-1b07f",
    storageBucket: "train-scheduler-1b07f.appspot.com",
    messagingSenderId: "236892727761"
  };
  firebase.initializeApp(config);
  
  var database = firebase.database();
  
  // Button for adding train
  $("#add-train-btn").on("click", function(event) {
    event.preventDefault();
  
    // Grabs user input
    var trainName = $("#train-name-input").val().trim();
    var trainDestiny = $("#destination-input").val().trim();
    var trainTime = moment($("#time-input").val().trim(), "HH:mm").format("X");
    var trainFreq = $("#min-input").val().trim();
  
    // Creates local "temporary" object for holding train data
    var newTrain = {
      name: trainName,
      destination: trainDestiny,
      time: trainTime,
      frequency: trainFreq
    };
  
    // Uploads train data to the database
    database.ref().push(newTrain);
  
    // Logs everything to console
    console.log(newTrain.name);
    console.log(newTrain.destination);
    console.log(newTrain.time);
    console.log(newTrain.frequency);
  
    
  
    // Clears all of the text-boxes
    $("#train-name-input").val("");
    $("#destination-input").val("");
    $("#time-input").val("");
    $("#min-input").val("");
  });
  
  // 3. Create Firebase event for adding train to the database and a row in the html when a user adds an entry
  database.ref().on("child_added", function(childSnapshot) {
    console.log(childSnapshot.val());
  
    // Store everything into a variable.
    var trainName = childSnapshot.val().name;
    var trainDestiny = childSnapshot.val().destination;
    var trainTime = childSnapshot.val().time;
    var trainFreq = childSnapshot.val().frequency;
  
    // train Info
    console.log(trainName);
    console.log(trainDestiny);
    console.log(trainTime);
    console.log(trainFreq);
  
    // moment.js time converter
    var trainConverted = moment(trainTime, "X").subtract(1, "years");
    
    //tells current time
    var currentTime = moment();
    console.log("current time: " + moment(currentTime).format("HH:mm"));

    var diffTime = moment().diff(moment(trainConverted), "minutes");
    console.log("diff in time: " + diffTime )

    var tRemainder = diffTime % trainFreq;
    console.log(tRemainder);

    var trainMins = trainFreq - tRemainder;
    console.log("mins till train: " + trainMins);

    // Next train Arrival
    var trainNext = moment().add(trainMins, "minutes")
    console.log("arrive: " + moment(trainNext).format("HH:mm"));
    convertTime = moment(trainNext).format("hh:mm A");
  
    var trainPretty = moment.unix(trainConverted).format("HH:mm");

    // Create the new row
    var newRow = $("<tr>").append(
      $("<td>").text(trainName),
      $("<td>").text(trainDestiny),
      $("<td>").text(trainFreq),
      $("<td>").text(trainNext),
      $("<td>").text(trainMins)
    );
  
    // Append the new row to the table
    $("#train-table > tbody").append(newRow);
  });
  
