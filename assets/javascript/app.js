$(document).ready(function () {
      //display the current 
      var d = new Date();
      var n = d.toLocaleTimeString();
      $("#time-display").text(moment().format('LTS'));

      //firebase link
      var config = {
        apiKey: "AIzaSyB7VLoWKRTvI-MImKjjn5P0y3XmiFoZzP8",
        authDomain: "project-0-31576.firebaseapp.com",
        databaseURL: "https://project-0-31576.firebaseio.com",
        projectId: "project-0-31576",
        storageBucket: "project-0-31576.appspot.com",
        messagingSenderId: "265748924710"
      };
      firebase.initializeApp(config);

      //database link 
      var database = firebase.database();

      //event listener for add train submit
      $("#add-train").on("click", function (event) {
          // Don't refresh the page!
          event.preventDefault();

          //lets create an Object to get the admin input track
          var newTrain = {
            name: $("#name-input").val().trim(),
            destination: $("#destination-input").val().trim(),
            track: $("#track-input option:selected").val(),
            firstTrain: $("#firstTrain-input").val().trim(),
            frequency: parseInt($("#frequency-input").val().trim())
          };

          // Console log each of the user inputs to confirm we are receiving them correctly
          console.log(`Train Name: ${newTrain.name} ||Dest: ${newTrain.destination} || Train Track: ${newTrain.track}|| First train Time: ${newTrain.firstTrain} || Frequency: ${newTrain.frequency}`);

          //using push to add the data in firebase
          database.ref("train-scheduler").push(newTrain);

          //clear the form
          $("#name-input").val(" ");
          $("#destination-input").val("");
          //$("#track-input option:selected").val(),
          $("#firstTrain-input").val("");
          $("#frequency-input").val("");

          });

        //lets handle the display of the content of the db
        database.ref("train-scheduler").on("child_added", function (snapshot) {
          //console log the content returned
          //var employee = {};
          console.log(snapshot.val());

          //get the values in the db cTrain refers to currentTrain
          var cTrain = snapshot.val().name;
          var cDestination = snapshot.val().destination;
          var cTrack = snapshot.val().track;
          var cfirstTrain = snapshot.val().firstTrain;
          var cFrequency = snapshot.val().frequency;

          //create a new row using Jquery
          var newRow = $("<tr>");
          // departs === Next arrival
          //Status === Minutes away
          var rowDeparts = $("<td>").text("Coming soon").appendTo(newRow);
          var rowName = $("<td>").text(cTrain).appendTo(newRow);
          var rowTrack = $("<td>").text(cTrack).appendTo(newRow);
          var rowDestination = $("<td>").text(cDestination).appendTo(newRow);
          var rowFrequency = $("<td>").text(cFrequency).appendTo(newRow);
          var rowStatus = $("<td>").text("Coming soon").appendTo(newRow);


          //append the newRow to the existing table list-employees
          $("#list-trains").append(newRow);



        }, function (errorOject) {
          console.log("The read failed: " + errorObject.code);
        });

      });