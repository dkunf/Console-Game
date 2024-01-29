const readline = require("readline");

// Set up readline interface for user input
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

// Function to handle user input
function handleInput(input) {
  console.log("User input:", input);
}

// Game loop function
function gameLoop() {
  console.log(iteration++);
  // Ask for user input
  rl.question("Enter your move: ", (input) => {
    // Handle user input
    handleInput(input);

    // Check for game over condition or exit condition
    if (input === "quit" || gameIsOver) {
      // Close the readline interface
      rl.close();
      // Exit the game loop
      return;
    }

    // Repeat the game loop
    gameLoop();
  });
}
gameIsOver = false;
let iteration = 0;
// Start the game loop
gameLoop();
