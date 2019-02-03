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
  
  // 2. Button for adding Employees
  $("#add-train-btn").on("click", function(event) {
    event.preventDefault();
  
    // Grabs user input
    var trainName = $("#train-name-input").val().trim();
    var trainDestiny = $("#destination-input").val().trim();
    var trainTime = moment($("#time-input").val().trim(), "HH:mm").format("X");
    var trainFreq = $("#min-input").val().trim();
  
    // Creates local "temporary" object for holding employee data
    var newTrain = {
      name: trainName,
      destination: trainDestiny,
      time: trainTime,
      frequency: trainFreq
    };
  
    // Uploads employee data to the database
    database.ref().push(newTrain);
  
    // Logs everything to console
    console.log(newTrain.name);
    console.log(newTrain.destination);
    console.log(newTrain.time);
    console.log(newTrain.frequency);
  
    alert("Train coming!");
  
    // Clears all of the text-boxes
    $("#train-name-input").val("");
    $("#destination-input").val("");
    $("#time-input").val("");
    $("#min-input").val("");
  });
  
  // 3. Create Firebase event for adding employee to the database and a row in the html when a user adds an entry
  database.ref().on("child_added", function(childSnapshot) {
    console.log(childSnapshot.val());
  
    // Store everything into a variable.
    var trainName = childSnapshot.val().name;
    var trainDestiny = childSnapshot.val().role;
    var trainTime = childSnapshot.val().start;
    var trainFreq = childSnapshot.val().rate;
  
    // Employee Info
    console.log(trainName);
    console.log(trainDestiny);
    console.log(trainTime);
    console.log(trainFreq);
  
    // Prettify the employee start
    var trainStartPretty = moment.unix(trainStart).format("HH:mm");
  
    // Calculate the months worked using hardcore math
    // To calculate the months worked
    var trainMins = moment().diff(moment(trainStart, "X"), "mins");
    console.log(trainMins);
  
    // Calculate the frequency
    var trainFreq = trainMins * trainRate;
    console.log(trainFreq);
  
    // Create the new row
    var newRow = $("<tr>").append(
      $("<td>").text(trainName),
      $("<td>").text(trainRole),
      $("<td>").text(trainStartPretty),
      $("<td>").text(trainMins),
      $("<td>").text(trainRate),
      $("<td>").text(trainFreq)
    );
  
    // Append the new row to the table
    $("#train-table > tbody").append(newRow);
  });
  
  // Example Time Math
  // -----------------------------------------------------------------------------
  // Assume Employee start date of January 1, 2015
  // Assume current date is March 1, 2016
  
  // We know that this is 15 months.
  // Now we will create code in moment.js to confirm that any attempt we use meets this test case
  