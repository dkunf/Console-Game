const keypress = require("keypress");

console.log(keypress.toString());

// Enable keypress events on the standard input
keypress(process.stdin);

// Set raw mode to capture individual key presses
process.stdin.setRawMode(true);
process.stdin.resume();

console.log("Press an arrow key (or q to exit):");

let lastPressedKey = null;

// Listen for keypress events
process.stdin.on("keypress", function (ch, key) {
  if (key) {
    // Arrow key pressed
    switch (key.name) {
      case "up":
        console.log("Up arrow pressed");
        lastPressedKey = "up";
        break;
      case "down":
        lastPressedKey = "down";
        console.log("Down arrow pressed");
        break;
      case "left":
        lastPressedKey = "left";
        console.log("Left arrow pressed");
        break;
      case "right":
        console.log("Right arrow pressed");
        lastPressedKey = "right";
        break;
      case "q":
        console.log("exiting");
        process.exit();
      default:
        // Handle other key presses
        console.log(`Key pressed: ${key.sequence}`);
    }
    return lastPressedKey;
    // console.log("value of  lastPressedKey = ", lastPressedKey);
  }
});

// Close the stdin stream on exit
process.on("SIGINT", function () {
  //   process.stdin.pause();
  process.exit();
});
