// ===============================================================================
// LOAD DATA
// We are linking our routes to a series of "data" sources.
// These data sources hold arrays of information on table-data, waitinglist, etc.
// ===============================================================================

var userData = require("../data/friends");

// ===============================================================================
// ROUTING
// ===============================================================================

module.exports = function(app) {
  // API GET Requests
  // Below code handles when users "visit" a page.
  // In each of the below cases when a user visits a link
  // (ex: localhost:PORT/api/admin... they are shown a JSON of the data in the table)
  // ---------------------------------------------------------------------------

  app.get("/api/friends", function(req, res) {
    res.json(userData);
  });

  // API POST Requests
  // Below code handles when a user submits a form and thus submits data to the server.
  // In each of the below cases, when a user submits form data (a JSON object)
  // ...the JSON is pushed to the appropriate JavaScript array
  // (ex. User fills out user friend survey... this data is then sent to the server...
  // Then the server saves the data to the userData array)
  // ---------------------------------------------------------------------------

  app.post("/api/friends", function(req, res) {

    userData.push(req.body);

    var currentUserScores = req.body.scores;

    console.log("Current User Scores: " + currentUserScores);

    var leastDifference = 0;

    for (var i = 0; i < currentUserScores.length; i++) {
      leastDifference += Math.abs(currentUserScores[i] - userData[0].scores[i]);
    }

    console.log("First value for leastDifference: " + leastDifference);

    if (userData.length <= 2) {
      console.log("We've only got one friend!" + userData[0]);
    } else {
      for (var i = 1; i < userData.length; i++) {
        var comparisonUserScores = userData[i].scores;
        console.log("Comparison User Scores: " + comparisonUserScores);
        var totalDifference = 0;
        for (var i = 0; i < currentUserScores.length; i++) {
          totalDifference+=Math.abs(currentUserScores[i] - comparisonUserScores[i]);
          console.log("Total difference is growing: " + totalDifference);
        }
        if (leastDifference >= totalDifference) {
          leastDifference = totalDifference;
          console.log("Resetting leastDifference: " + leastDifference);
        }
      } 
    }

    //console.log(userData);
    // Determine the user's most compatible friend.
    // Convert each user's results into a simple array of numbers.
    // Compare difference between current user's score and each of the other users' scores.
    // Comparison done question by question, adding up differences to determine total Difference.
    // Remember to use absolute value for differences (no negative values).
    // Once you've found the current user's most compatible friend, display in pop-up modal.
    // The modal should display both the name and picture of the closest match.
  });
};
