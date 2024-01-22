//listens and reacts to left,right,down,up as asked in provided object details, and also q for exit
// details example: {
//     left: () => spaceShip.move(-3, 0),
//     right: () => spaceShip.move(3, 0),
//     up: () => spaceShip.move(0, -3),
//     down: () => spaceShip.move(0, 3),
//   }
import keypress from "keypress";

export async function gameControls(details) {
  // Enable keypress events on the standard input
  keypress(process.stdin);

  // Set raw mode to capture individual key presses
  process.stdin.setRawMode(true);
  process.stdin.resume();

  //   let lastPressed = null;
  // Listen for keypress events
  process.stdin.on("keypress", function (ch, key) {
    if (key) {
      // Arrow key pressed
      switch (key.name) {
        case "up":
          //   lastPressed = "up";
          details.up();
          // console.log("Up arrow pressed");
          break;
        case "down":
          details.down();
          // console.log("Down arrow pressed");
          break;
        case "left":
          details.left();
          // console.log("Left arrow pressed");
          break;
        case "right":
          details.right();
          // console.log("Right arrow pressed");
          break;
        case "q":
          console.log("exiting");
          process.exit();
        default:
        // Handle other key presses
        // console.log(`Key pressed: ${key.sequence}`);
      }
      // console.log("value of  lastPressedKey = ", lastPressedKey);
    }
  });

  // Close the stdin stream on exit
  process.on("SIGINT", function () {
    //   process.stdin.pause();
    process.exit();
  });

  //   return lastPressed;
}
